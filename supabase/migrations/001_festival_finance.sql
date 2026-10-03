-- Themalikkara festival collection dashboard
-- Apply via Supabase SQL Editor or MCP apply_migration

create table if not exists public.festival_settings (
  id smallint primary key default 1 check (id = 1),
  target_inr bigint not null default 600000,
  updated_at timestamptz not null default now()
);

create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  contributor_name text not null,
  amount_inr integer not null check (amount_inr > 0),
  unit_id text not null check (
    unit_id in ('st-stephen', 'st-john', 'st-sebastian', 'st-thomas')
  ),
  contributed_on date not null,
  created_at timestamptz not null default now()
);

create index if not exists contributions_contributed_on_idx
  on public.contributions (contributed_on desc);

insert into public.festival_settings (id, target_inr)
values (1, 600000)
on conflict (id) do nothing;

alter table public.festival_settings enable row level security;
alter table public.contributions enable row level security;

drop policy if exists "Public read festival settings" on public.festival_settings;
create policy "Public read festival settings"
  on public.festival_settings for select
  using (true);

drop policy if exists "Public read contributions" on public.contributions;
create policy "Public read contributions"
  on public.contributions for select
  using (true);

drop policy if exists "Authenticated update festival settings" on public.festival_settings;
create policy "Authenticated update festival settings"
  on public.festival_settings for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated insert contributions" on public.contributions;
create policy "Authenticated insert contributions"
  on public.contributions for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated delete contributions" on public.contributions;
create policy "Authenticated delete contributions"
  on public.contributions for delete
  to authenticated
  using (true);

drop policy if exists "Authenticated update contributions" on public.contributions;
create policy "Authenticated update contributions"
  on public.contributions for update
  to authenticated
  using (true)
  with check (true);
