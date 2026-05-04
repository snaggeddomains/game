alter table public.domains
  add column if not exists whois_created date null;
