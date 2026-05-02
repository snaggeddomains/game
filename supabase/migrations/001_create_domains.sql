-- Is it Snagged? — Domain pool table
-- Run this against your Supabase project via the SQL editor or Supabase CLI

create extension if not exists "pgcrypto";

create table if not exists public.domains (
  id                 uuid primary key default gen_random_uuid(),
  domain             text not null,
  tld                text not null,
  mode               text not null check (mode in ('regular', 'kid_friendly', 'founder', 'adult')),
  category           text,
  difficulty         text not null default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
  availability_status text not null default 'unknown' check (availability_status in ('available', 'taken', 'unknown')),
  last_checked_at    timestamptz,
  source             text,
  times_shown        integer not null default 0,
  correct_guess_rate numeric(5,2),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- Unique constraint: one record per full domain string per mode
create unique index if not exists domains_domain_mode_idx on public.domains (domain, mode);

-- Indexes for game queries
create index if not exists domains_mode_status_idx on public.domains (mode, availability_status);
create index if not exists domains_difficulty_idx on public.domains (difficulty);

-- Auto-update updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists domains_updated_at on public.domains;
create trigger domains_updated_at
  before update on public.domains
  for each row execute procedure public.touch_updated_at();

-- Row-level security: read is public, writes require service role
alter table public.domains enable row level security;

create policy "Allow public read" on public.domains
  for select using (true);

-- Email captures table
create table if not exists public.game_email_captures (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  mode       text,
  score      integer,
  created_at timestamptz not null default now()
);

alter table public.game_email_captures enable row level security;

-- Game results table (analytics)
create table if not exists public.game_results (
  id         uuid primary key default gen_random_uuid(),
  mode       text not null,
  score      integer not null,
  max_streak integer not null,
  accuracy   numeric(5,2) not null,
  created_at timestamptz not null default now()
);

alter table public.game_results enable row level security;

comment on table public.domains is 'Domain pool for the Is it Snagged? game';
comment on table public.game_email_captures is 'Optional email captures at end of game';
comment on table public.game_results is 'Anonymised game result analytics';
