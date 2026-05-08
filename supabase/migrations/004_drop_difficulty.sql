alter table public.domains drop column if exists difficulty;
drop index if exists domains_difficulty_idx;
