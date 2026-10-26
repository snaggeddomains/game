create table if not exists so_recent_sales (
  id                text primary key,
  address           text not null,
  sale_price        integer not null,
  list_price        integer,
  sale_date         date not null,
  listed_date       date,
  beds              integer,
  baths             numeric(3, 1),
  sqft              integer,
  description       text,
  property_type     text,
  property_class    text,
  neighborhood      text,
  offers            integer,
  source            text default 'nj-treasury',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

create index if not exists so_recent_sales_sale_date_idx on so_recent_sales (sale_date desc);

comment on table so_recent_sales is 'Recent home sales in South Orange NJ, populated from NJ Treasury SR1A records';
