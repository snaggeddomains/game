-- Snagged Auctions schema
-- Run after 001_create_domains.sql

-- ─── Bid increment schedule ──────────────────────────────────────────────────
-- Rows with auction_id = NULL are the global default schedule.
-- Rows with a specific auction_id override for that auction.
create table if not exists public.auction_increment_schedules (
  id           uuid primary key default gen_random_uuid(),
  auction_id   uuid,                    -- NULL = global default
  min_price    numeric(12,2) not null,
  max_price    numeric(12,2),           -- NULL = no upper limit
  increment_amount numeric(12,2) not null,
  created_at   timestamptz not null default now()
);

-- Default bid increment schedule (GoDaddy-style bands)
insert into public.auction_increment_schedules (auction_id, min_price, max_price, increment_amount) values
  (null,    0,       999.99,   50),
  (null, 1000,      4999.99,  100),
  (null, 5000,      9999.99,  250),
  (null,10000,     24999.99,  500),
  (null,25000,     49999.99, 1000),
  (null,50000,     99999.99, 2500),
  (null,100000,    null,     5000);

-- ─── Auctions ─────────────────────────────────────────────────────────────────
create table if not exists public.auctions (
  id                             uuid primary key default gen_random_uuid(),
  slug                           text unique not null,
  title                          text not null,
  domain                         text not null,
  tagline                        text,
  description                    text,
  status                         text not null default 'preview'
                                   check (status in ('preview','open','closed','cancelled')),
  start_time                     timestamptz,
  end_time                       timestamptz,
  reserve_price                  numeric(12,2),
  reserve_met                    boolean not null default false,
  starting_bid                   numeric(12,2) not null default 1000,
  current_bid                    numeric(12,2),
  current_bid_user_id            uuid references auth.users(id),
  soft_close_minutes             integer not null default 5,
  soft_close_extension_minutes   integer not null default 5,
  bid_count                      integer not null default 0,
  -- Amount in cents used for the Stripe authorization hold
  verification_hold_cents        integer not null default 50000,
  created_at                     timestamptz not null default now(),
  updated_at                     timestamptz not null default now()
);

create index if not exists auctions_slug_idx on public.auctions (slug);
create index if not exists auctions_status_idx on public.auctions (status);

-- ─── Bidder profiles ──────────────────────────────────────────────────────────
create table if not exists public.bidder_profiles (
  id                        uuid primary key default gen_random_uuid(),
  user_id                   uuid unique not null references auth.users(id) on delete cascade,
  full_name                 text not null,
  email                     text not null,
  company                   text,
  phone                     text,
  country                   text not null,
  status                    text not null default 'pending'
                              check (status in ('pending','approved','rejected','suspended')),
  terms_agreed_at           timestamptz not null,
  binding_bids_agreed_at    timestamptz not null,
  -- Stripe data
  stripe_customer_id        text,
  stripe_payment_method_id  text,
  card_last4                text,
  card_brand                text,
  card_verified_at          timestamptz,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index if not exists bidder_profiles_user_id_idx on public.bidder_profiles (user_id);
create index if not exists bidder_profiles_status_idx on public.bidder_profiles (status);

-- ─── Payment verifications ────────────────────────────────────────────────────
-- Tracks Stripe authorization holds per bidder per auction.
-- We use a manual-capture PaymentIntent as a $500 hold to verify bidder intent.
-- The hold is released after the auction unless the bidder wins and defaults.
create table if not exists public.payment_verifications (
  id                        uuid primary key default gen_random_uuid(),
  user_id                   uuid not null references auth.users(id),
  auction_id                uuid not null references public.auctions(id),
  stripe_setup_intent_id    text,
  stripe_payment_intent_id  text unique,
  amount_cents              integer not null,
  status                    text not null default 'pending'
                              check (status in ('pending','setup_complete','authorized','released','failed')),
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now(),
  unique(user_id, auction_id)
);

-- ─── Standing bids ────────────────────────────────────────────────────────────
-- One row per (auction, bidder) — holds their confidential max bid.
-- is_leader = true on the current high bidder only.
-- NEVER exposed publicly; only used server-side and by admins.
create table if not exists public.standing_bids (
  id          uuid primary key default gen_random_uuid(),
  auction_id  uuid not null references public.auctions(id),
  user_id     uuid not null references auth.users(id),
  max_bid     numeric(12,2) not null,
  is_leader   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique(auction_id, user_id)
);

create index if not exists standing_bids_auction_leader_idx
  on public.standing_bids (auction_id, is_leader);

-- ─── Bid events ───────────────────────────────────────────────────────────────
-- Append-only audit log. Never updated after insert.
create table if not exists public.bid_events (
  id                        uuid primary key default gen_random_uuid(),
  auction_id                uuid not null references public.auctions(id),
  user_id                   uuid not null references auth.users(id),
  event_type                text not null
                              check (event_type in (
                                'manual_bid',
                                'proxy_bid',
                                'max_bid_updated',
                                'outbid_notification'
                              )),
  bid_amount                numeric(12,2) not null,
  max_bid_amount            numeric(12,2),   -- confidential; null on proxy/outbid events
  resulting_standing_price  numeric(12,2) not null,
  ip_address                text,
  user_agent                text,
  created_at                timestamptz not null default now()
);

create index if not exists bid_events_auction_idx on public.bid_events (auction_id, created_at desc);

-- ─── Notification events ──────────────────────────────────────────────────────
create table if not exists public.notification_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id),
  email       text not null,
  event_type  text not null,
  auction_id  uuid references public.auctions(id),
  payload     jsonb not null default '{}',
  sent_at     timestamptz,
  error       text,
  created_at  timestamptz not null default now()
);

-- ─── Admin actions audit log ──────────────────────────────────────────────────
create table if not exists public.admin_actions (
  id             uuid primary key default gen_random_uuid(),
  admin_user_id  uuid not null references auth.users(id),
  action_type    text not null,
  target_type    text,
  target_id      uuid,
  notes          text,
  payload        jsonb not null default '{}',
  created_at     timestamptz not null default now()
);

-- ─── Auto-update triggers ─────────────────────────────────────────────────────
-- Reuse touch_updated_at from migration 001 if it exists.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'auctions_updated_at') then
    create trigger auctions_updated_at
      before update on public.auctions
      for each row execute procedure public.touch_updated_at();
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'bidder_profiles_updated_at') then
    create trigger bidder_profiles_updated_at
      before update on public.bidder_profiles
      for each row execute procedure public.touch_updated_at();
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'payment_verifications_updated_at') then
    create trigger payment_verifications_updated_at
      before update on public.payment_verifications
      for each row execute procedure public.touch_updated_at();
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'standing_bids_updated_at') then
    create trigger standing_bids_updated_at
      before update on public.standing_bids
      for each row execute procedure public.touch_updated_at();
  end if;
end $$;

-- ─── Bid increment helper ─────────────────────────────────────────────────────
create or replace function public.get_bid_increment(
  p_auction_id uuid,
  p_current_price numeric
) returns numeric language plpgsql as $$
declare
  v_increment numeric;
begin
  -- Prefer auction-specific schedule; fall back to global default (auction_id IS NULL)
  select increment_amount into v_increment
  from public.auction_increment_schedules
  where (auction_id = p_auction_id or auction_id is null)
    and min_price <= p_current_price
    and (max_price is null or max_price > p_current_price)
  order by
    (case when auction_id = p_auction_id then 0 else 1 end),
    min_price desc
  limit 1;

  return coalesce(v_increment, 100);
end;
$$;

-- ─── Soft-close helper ────────────────────────────────────────────────────────
create or replace function public.maybe_extend_auction(p_auction_id uuid)
returns void language plpgsql as $$
declare
  v_auction public.auctions%rowtype;
  v_remaining_seconds numeric;
begin
  select * into v_auction from public.auctions where id = p_auction_id;

  if v_auction.status != 'open' or v_auction.end_time is null then
    return;
  end if;

  v_remaining_seconds := extract(epoch from (v_auction.end_time - now()));

  if v_remaining_seconds > 0 and v_remaining_seconds < (v_auction.soft_close_minutes * 60) then
    update public.auctions
    set end_time = end_time + (v_auction.soft_close_extension_minutes * interval '1 minute'),
        updated_at = now()
    where id = p_auction_id;
  end if;
end;
$$;

-- ─── Core atomic bid processing function ─────────────────────────────────────
-- All bid logic runs inside a single DB transaction with row-level locking
-- to prevent race conditions. Called via Supabase RPC from the API route.
create or replace function public.process_bid(
  p_auction_id  uuid,
  p_user_id     uuid,
  p_bid_amount  numeric,
  p_max_bid     numeric default null,   -- optional confidential max
  p_ip_address  text    default null,
  p_user_agent  text    default null
) returns jsonb language plpgsql security definer as $$
declare
  v_auction         public.auctions%rowtype;
  v_leader          public.standing_bids%rowtype;
  v_effective_max   numeric;
  v_min_required    numeric;
  v_new_standing    numeric;
  v_leader_incr     numeric;
begin
  -- Lock auction row for duration of transaction
  select * into v_auction
  from public.auctions
  where id = p_auction_id
  for update;

  if not found then
    return jsonb_build_object('success', false, 'error', 'Auction not found');
  end if;

  if v_auction.status != 'open' then
    return jsonb_build_object('success', false, 'error', 'Auction is not open for bidding');
  end if;

  if now() < v_auction.start_time then
    return jsonb_build_object('success', false, 'error', 'Auction has not started yet');
  end if;

  if now() > v_auction.end_time then
    return jsonb_build_object('success', false, 'error', 'Auction has ended');
  end if;

  -- Effective max: if no max supplied, treat bid amount as the max
  v_effective_max := coalesce(p_max_bid, p_bid_amount);

  if v_effective_max < p_bid_amount then
    return jsonb_build_object('success', false, 'error', 'Maximum bid cannot be less than bid amount');
  end if;

  -- Get current leader
  select * into v_leader
  from public.standing_bids
  where auction_id = p_auction_id and is_leader = true;

  -- ── Case 1: No current leader (first bid) ──────────────────────────────────
  if not found then
    if p_bid_amount < v_auction.starting_bid then
      return jsonb_build_object(
        'success', false,
        'error', format('Minimum opening bid is $%s', to_char(v_auction.starting_bid, 'FM999,999,999'))
      );
    end if;

    insert into public.standing_bids (auction_id, user_id, max_bid, is_leader)
    values (p_auction_id, p_user_id, v_effective_max, true)
    on conflict (auction_id, user_id) do update
      set max_bid = v_effective_max, is_leader = true, updated_at = now();

    update public.auctions
    set current_bid         = p_bid_amount,
        current_bid_user_id = p_user_id,
        bid_count           = bid_count + 1,
        reserve_met         = (v_effective_max >= coalesce(reserve_price, 0)),
        updated_at          = now()
    where id = p_auction_id;

    insert into public.bid_events
      (auction_id, user_id, event_type, bid_amount, max_bid_amount, resulting_standing_price, ip_address, user_agent)
    values
      (p_auction_id, p_user_id, 'manual_bid', p_bid_amount, v_effective_max, p_bid_amount, p_ip_address, p_user_agent);

    perform public.maybe_extend_auction(p_auction_id);

    return jsonb_build_object(
      'success',      true,
      'is_leader',    true,
      'standing_bid', p_bid_amount,
      'message',      'You are the leading bidder'
    );
  end if;

  -- ── Case 2: Bidder IS the current leader — raise max ──────────────────────
  if v_leader.user_id = p_user_id then
    if v_effective_max <= v_leader.max_bid then
      return jsonb_build_object(
        'success', false,
        'error',   'Your new maximum bid must exceed your current maximum bid'
      );
    end if;

    update public.standing_bids
    set max_bid = v_effective_max, updated_at = now()
    where auction_id = p_auction_id and user_id = p_user_id;

    update public.auctions
    set reserve_met = (v_effective_max >= coalesce(reserve_price, 0)),
        updated_at  = now()
    where id = p_auction_id;

    insert into public.bid_events
      (auction_id, user_id, event_type, bid_amount, max_bid_amount, resulting_standing_price, ip_address, user_agent)
    values
      (p_auction_id, p_user_id, 'max_bid_updated', p_bid_amount, v_effective_max,
       v_auction.current_bid, p_ip_address, p_user_agent);

    return jsonb_build_object(
      'success',      true,
      'is_leader',    true,
      'standing_bid', v_auction.current_bid,
      'message',      'Your maximum bid has been updated'
    );
  end if;

  -- ── Case 3: Competing bid from a different user ────────────────────────────
  v_min_required := v_auction.current_bid + public.get_bid_increment(p_auction_id, v_auction.current_bid);

  if p_bid_amount < v_min_required then
    return jsonb_build_object(
      'success', false,
      'error',   format('Minimum next bid is $%s', to_char(v_min_required, 'FM999,999,999'))
    );
  end if;

  if v_effective_max > v_leader.max_bid then
    -- New bidder wins — proxy standing to just one increment above old leader's max
    v_leader_incr  := public.get_bid_increment(p_auction_id, v_leader.max_bid);
    v_new_standing := least(v_effective_max, v_leader.max_bid + v_leader_incr);
    v_new_standing := greatest(v_new_standing, p_bid_amount);

    update public.standing_bids
    set is_leader = false, updated_at = now()
    where auction_id = p_auction_id and user_id = v_leader.user_id;

    insert into public.standing_bids (auction_id, user_id, max_bid, is_leader)
    values (p_auction_id, p_user_id, v_effective_max, true)
    on conflict (auction_id, user_id) do update
      set max_bid = v_effective_max, is_leader = true, updated_at = now();

    update public.auctions
    set current_bid         = v_new_standing,
        current_bid_user_id = p_user_id,
        bid_count           = bid_count + 1,
        reserve_met         = (v_effective_max >= coalesce(reserve_price, 0)),
        updated_at          = now()
    where id = p_auction_id;

    insert into public.bid_events
      (auction_id, user_id, event_type, bid_amount, max_bid_amount, resulting_standing_price, ip_address, user_agent)
    values
      (p_auction_id, p_user_id, 'manual_bid', p_bid_amount, v_effective_max, v_new_standing, p_ip_address, p_user_agent),
      (p_auction_id, v_leader.user_id, 'outbid_notification', v_leader.max_bid, null, v_new_standing, null, null);

    perform public.maybe_extend_auction(p_auction_id);

    return jsonb_build_object(
      'success',         true,
      'is_leader',       true,
      'standing_bid',    v_new_standing,
      'outbid_user_id',  v_leader.user_id,
      'message',         'You are the leading bidder'
    );

  elsif v_effective_max = v_leader.max_bid then
    -- Tie: first max bid wins — current leader retains the lead
    v_new_standing := v_leader.max_bid;

    update public.auctions
    set current_bid = v_new_standing,
        bid_count   = bid_count + 1,
        reserve_met = (v_leader.max_bid >= coalesce(reserve_price, 0)),
        updated_at  = now()
    where id = p_auction_id;

    insert into public.bid_events
      (auction_id, user_id, event_type, bid_amount, max_bid_amount, resulting_standing_price, ip_address, user_agent)
    values
      (p_auction_id, p_user_id, 'manual_bid', p_bid_amount, v_effective_max, v_new_standing, p_ip_address, p_user_agent),
      (p_auction_id, v_leader.user_id, 'proxy_bid', v_leader.max_bid, null, v_new_standing, null, null);

    perform public.maybe_extend_auction(p_auction_id);

    return jsonb_build_object(
      'success',      false,
      'is_leader',    false,
      'standing_bid', v_new_standing,
      'error',        'Another bidder placed the same maximum bid earlier. Bid higher to take the lead.'
    );

  else
    -- Current leader''s max exceeds new bid — proxy leader up
    v_new_standing := least(
      v_leader.max_bid,
      p_bid_amount + public.get_bid_increment(p_auction_id, p_bid_amount)
    );

    update public.auctions
    set current_bid = v_new_standing,
        bid_count   = bid_count + 1,
        updated_at  = now()
    where id = p_auction_id;

    insert into public.bid_events
      (auction_id, user_id, event_type, bid_amount, max_bid_amount, resulting_standing_price, ip_address, user_agent)
    values
      (p_auction_id, p_user_id, 'manual_bid', p_bid_amount, v_effective_max, v_new_standing, p_ip_address, p_user_agent),
      (p_auction_id, v_leader.user_id, 'proxy_bid', v_new_standing, null, v_new_standing, null, null);

    perform public.maybe_extend_auction(p_auction_id);

    return jsonb_build_object(
      'success',      false,
      'is_leader',    false,
      'standing_bid', v_new_standing,
      'error',        format('You have been outbid. Current bid is $%s', to_char(v_new_standing, 'FM999,999,999'))
    );
  end if;
end;
$$;

-- ─── Seed the first auction: Seis.com ─────────────────────────────────────────
insert into public.auctions (
  slug, title, domain, tagline, description,
  status, start_time, end_time,
  starting_bid, verification_hold_cents
) values (
  'seis',
  'Seis.com',
  'Seis.com',
  'A rare, short, globally resonant .com — ready for its next chapter.',
  'Seis (six in Spanish and Portuguese) is a clean, memorable, one-word .com with universal appeal across Latin America, Europe, and global markets. Short, pronounceable in any language, and completely on-brand for a modern product, platform, or company.',
  'preview',
  now() + interval '24 hours',
  now() + interval '7 days',
  5000,
  50000
) on conflict (slug) do nothing;

-- ─── Row-level security ───────────────────────────────────────────────────────
alter table public.auctions enable row level security;
alter table public.auction_increment_schedules enable row level security;
alter table public.bidder_profiles enable row level security;
alter table public.payment_verifications enable row level security;
alter table public.standing_bids enable row level security;
alter table public.bid_events enable row level security;
alter table public.notification_events enable row level security;
alter table public.admin_actions enable row level security;

-- Auctions: public read, service-role write
create policy "auctions_public_read" on public.auctions
  for select using (true);

-- Increment schedules: public read
create policy "increment_schedules_public_read" on public.auction_increment_schedules
  for select using (true);

-- Bidder profiles: users see their own row only (admins use service role)
create policy "bidder_profiles_own_read" on public.bidder_profiles
  for select using (auth.uid() = user_id);

create policy "bidder_profiles_own_insert" on public.bidder_profiles
  for insert with check (auth.uid() = user_id);

create policy "bidder_profiles_own_update" on public.bidder_profiles
  for update using (auth.uid() = user_id);

-- Payment verifications: own rows only
create policy "payment_verifications_own" on public.payment_verifications
  for select using (auth.uid() = user_id);

-- Standing bids: own rows only (max_bid is confidential)
create policy "standing_bids_own" on public.standing_bids
  for select using (auth.uid() = user_id);

-- Bid events: authenticated users can read all (public bid history minus max_bid)
create policy "bid_events_auth_read" on public.bid_events
  for select using (auth.uid() is not null);

comment on table public.auctions is 'Snagged Auctions — one row per auction event';
comment on table public.standing_bids is 'Confidential max bids per bidder; never exposed in public API';
comment on table public.bid_events is 'Append-only bid audit trail';
