create table if not exists south_orange_emails (
  id          bigint generated always as identity primary key,
  email       text    not null,
  created_at  timestamptz not null default now(),
  constraint south_orange_emails_email_unique unique (email)
);

-- index for dedup lookups
create index if not exists south_orange_emails_email_idx on south_orange_emails (email);
