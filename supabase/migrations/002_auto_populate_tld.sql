-- Auto-populate tld from domain name before insert/update
-- This allows CSV imports that omit the tld column to work correctly.

create or replace function public.fill_tld_from_domain()
returns trigger language plpgsql as $$
begin
  if new.tld is null or new.tld = '' then
    new.tld = lower(split_part(new.domain, '.', -1));
  end if;
  return new;
end;
$$;

drop trigger if exists domains_fill_tld on public.domains;
create trigger domains_fill_tld
  before insert or update on public.domains
  for each row execute procedure public.fill_tld_from_domain();
