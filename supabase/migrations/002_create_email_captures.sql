create table if not exists public.game_email_captures (
  id uuid not null default gen_random_uuid(),
  email text not null,
  mode text null,
  score integer null,
  created_at timestamp with time zone not null default now(),
  constraint game_email_captures_pkey primary key (id),
  constraint game_email_captures_email_key unique (email)
) tablespace pg_default;
