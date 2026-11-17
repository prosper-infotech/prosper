-- Prosper Infotech online shop: database tables (plan section 3).
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- It is safe to run again: everything uses "if not exists".
--
-- Security: Row Level Security is ON for every table and there are NO policies
-- for the public (anon) key, so nothing can be read or written from a browser.
-- All access goes through the server functions, which use the service role key.

create extension if not exists pgcrypto;

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  sort_order int not null default 0,
  icon text,
  image text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  slug text not null unique,
  name text not null,
  brand text,
  category_id uuid not null references categories(id),
  short_description text not null default '',
  long_description text not null default '',
  specs jsonb not null default '[]',
  images jsonb not null default '[]',
  datasheet_url text,
  price_paise bigint check (price_paise is null or price_paise > 0),   -- null = "Request price"
  mrp_paise bigint check (mrp_paise is null or mrp_paise > 0),
  gst_percent numeric(5,2) not null default 18 check (gst_percent >= 0 and gst_percent <= 40),
  hsn_code text not null default '',
  stock_qty int not null default 0 check (stock_qty >= 0),
  min_order_qty int not null default 1 check (min_order_qty >= 1),
  weight_grams int,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  quote_only boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists products_category_idx on products(category_id);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null default '',
  phone text,
  company text,
  gstin text,
  account_created_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  label text,
  name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  country text not null default 'IN',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists addresses_customer_idx on addresses(customer_id);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  public_token text not null unique,
  customer_id uuid references customers(id) on delete set null,
  status text not null default 'pending_payment'
    check (status in ('pending_payment','paid','processing','shipped','delivered','cancelled','refunded')),
  payment_method text not null check (payment_method in ('razorpay','bank_transfer','upi_manual')),
  subtotal_paise bigint not null,      -- items, including GST
  gst_paise bigint not null,           -- GST contained in the total
  shipping_paise bigint not null,
  total_paise bigint not null,
  contact jsonb not null,
  billing_address jsonb not null,
  shipping_address jsonb not null,
  gstin text,
  notes text,
  utr text,
  invoice_number text unique,
  invoice_date timestamptz,
  paid_at timestamptz,
  stock_deducted boolean not null default false,
  site_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_customer_idx on orders(customer_id);
create index if not exists orders_status_idx on orders(status, created_at desc);
create index if not exists orders_created_idx on orders(created_at desc);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  sku text not null,
  slug text,
  name text not null,
  image text,
  hsn_code text not null default '',
  unit_price_paise bigint not null,
  gst_percent numeric(5,2) not null,
  qty int not null check (qty > 0),
  line_total_paise bigint not null,
  created_at timestamptz not null default now()
);
create index if not exists order_items_order_idx on order_items(order_id);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  provider text not null,
  provider_order_id text,
  provider_payment_id text,
  provider_event_id text unique,       -- makes webhooks idempotent
  amount_paise bigint,
  status text not null,
  raw_event jsonb,
  created_at timestamptz not null default now()
);
create index if not exists payments_order_idx on payments(order_id);
create index if not exists payments_provider_order_idx on payments(provider_order_id);

create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  courier text,
  awb text,
  tracking_url text,
  provider_shipment_id text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists shipments_order_idx on shipments(order_id);
create index if not exists shipments_awb_idx on shipments(awb);

create table if not exists order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  type text not null,
  message text not null default '',
  created_by text not null default 'system',
  created_at timestamptz not null default now()
);
create index if not exists order_events_order_idx on order_events(order_id, created_at);

create table if not exists settings (
  key text primary key,
  value jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  role text not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists login_codes (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  purpose text not null,
  code_hash text not null,
  attempts int not null default 0,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists login_codes_email_idx on login_codes(email, purpose, created_at desc);

create table if not exists counters (
  name text primary key,
  value bigint not null default 0
);

-- Gap-free running numbers for order and invoice numbers.
create or replace function next_counter(p_name text) returns bigint
language sql security definer set search_path = public as $$
  insert into counters(name, value) values (p_name, 1)
  on conflict (name) do update set value = counters.value + 1
  returning value;
$$;

-- p_items: [{"product_id": "...", "qty": 2}], p_sign: -1 to deduct, 1 to put back.
create or replace function adjust_stock(p_items jsonb, p_sign int) returns void
language sql security definer set search_path = public as $$
  update products p
     set stock_qty = greatest(0, p.stock_qty + p_sign * (i->>'qty')::int),
         updated_at = now()
    from jsonb_array_elements(p_items) i
   where p.id = (i->>'product_id')::uuid;
$$;

revoke all on function next_counter(text) from public, anon, authenticated;
revoke all on function adjust_stock(jsonb, int) from public, anon, authenticated;
grant execute on function next_counter(text) to service_role;
grant execute on function adjust_stock(jsonb, int) to service_role;

alter table categories   enable row level security;
alter table products     enable row level security;
alter table customers    enable row level security;
alter table addresses    enable row level security;
alter table orders       enable row level security;
alter table order_items  enable row level security;
alter table payments     enable row level security;
alter table shipments    enable row level security;
alter table order_events enable row level security;
alter table settings     enable row level security;
alter table staff        enable row level security;
alter table login_codes  enable row level security;
alter table counters     enable row level security;

-- The public may read active products and categories (plan section 3). The
-- website itself reads them through the server, so this is only a convenience.
drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select to anon, authenticated using (true);
drop policy if exists "public read active products" on products;
create policy "public read active products" on products for select to anon, authenticated using (is_active);
