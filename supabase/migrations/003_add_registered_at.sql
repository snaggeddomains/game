-- Add domain registration date populated via RDAP lookups
alter table public.domains add column if not exists registered_at timestamptz;
