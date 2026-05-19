create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'comercial', 'financeiro', 'tecnico');
create type public.member_status as enum ('invited', 'active', 'disabled');
create type public.customer_type as enum ('Residencial', 'Comercial', 'Rural', 'Industrial', 'Condominio');
create type public.ltv_potential as enum ('Nao classificado', 'Baixo', 'Medio', 'Alto', 'Estrategico');
create type public.lead_stage as enum ('Novo lead', 'Contato feito', 'Diagnostico', 'Proposta enviada', 'Negociacao', 'Contrato fechado', 'Perdido');
create type public.commercial_status as enum ('Proposta', 'Fechado', 'Perdido', 'Cancelado');
create type public.financial_status as enum ('Sem financeiro cadastrado', 'Em dia', 'Parcialmente pago', 'Em atraso', 'Quitado', 'Cancelado');
create type public.technical_status as enum ('Nao iniciado', 'Em projeto', 'Aguardando instalacao', 'Instalado', 'Homologado', 'Ativo', 'Precisa revisao');
create type public.installment_status as enum ('Pendente', 'Paga', 'Vencida', 'Cancelada');
create type public.cost_category as enum ('Equipamento', 'Mao de obra', 'Deslocamento', 'Taxas', 'Comissao', 'Outros');

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  document text,
  city text,
  state text,
  plan_key text not null default 'pilot',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  email text unique,
  phone text unique,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (username is null or username ~ '^[a-z0-9_]{3,32}$')
);

create table public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.user_role not null default 'comercial',
  status public.member_status not null default 'invited',
  invited_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create table public.plans (
  key text primary key,
  name text not null,
  monthly_price_cents integer not null default 0,
  description text,
  active boolean not null default true
);

insert into public.plans (key, name, monthly_price_cents, description) values
  ('starter', 'Starter', 19700, 'CRM, clientes, contratos e pipeline'),
  ('pro', 'Pro', 39700, 'Starter + financeiro + LTV + relatorios'),
  ('business', 'Business', 69700, 'Pro + tecnico + permissoes')
on conflict (key) do nothing;

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  customer_type public.customer_type not null,
  phone text not null,
  email text,
  city text not null,
  state text not null,
  origin text not null,
  average_consumption numeric(12,2) not null default 0,
  owner_name text,
  stage public.lead_stage not null default 'Novo lead',
  next_task text,
  notes text,
  lost_reason text,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  document text,
  customer_type public.customer_type not null,
  phone text not null,
  email text,
  address text,
  city text not null,
  state text not null,
  owner_name text,
  ltv_potential public.ltv_potential not null default 'Nao classificado',
  ltv_reason text,
  tags text[] not null default '{}',
  notes text,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete restrict,
  contract_number text not null,
  commercial_owner_name text,
  close_date date,
  total_value numeric(14,2) not null check (total_value >= 0),
  commercial_status public.commercial_status not null default 'Proposta',
  financial_status public.financial_status not null default 'Sem financeiro cadastrado',
  technical_status public.technical_status not null default 'Nao iniciado',
  total_costs numeric(14,2) not null default 0,
  open_amount numeric(14,2) not null default 0,
  notes text,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (company_id, contract_number)
);

create table public.contract_installments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  contract_id uuid not null references public.contracts(id) on delete cascade,
  due_date date not null,
  amount numeric(14,2) not null check (amount >= 0),
  status public.installment_status not null default 'Pendente',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contract_costs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  contract_id uuid not null references public.contracts(id) on delete cascade,
  category public.cost_category not null,
  amount numeric(14,2) not null check (amount >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.technical_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  contract_id uuid not null unique references public.contracts(id) on delete cascade,
  inverter_brand text,
  inverter_model text,
  inverter_power_kw numeric(12,2),
  system_power_kwp numeric(12,2),
  modules_count integer not null default 0,
  module_brand text,
  utility_company text,
  average_consumption numeric(12,2) not null default 0,
  expected_installation_date date,
  actual_installation_date date,
  status public.technical_status not null default 'Nao iniciado',
  needs_review boolean not null default false,
  technical_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete cascade,
  assigned_to uuid references auth.users(id),
  title text not null,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.interactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete cascade,
  kind text not null default 'note',
  body text not null,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index on public.company_members (user_id, status);
create index on public.leads (company_id, stage) where deleted_at is null;
create index on public.customers (company_id, ltv_potential) where deleted_at is null;
create index on public.contracts (company_id, financial_status, technical_status) where deleted_at is null;
create index on public.contract_installments (company_id, due_date, status);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger touch_companies before update on public.companies for each row execute function public.touch_updated_at();
create trigger touch_profiles before update on public.profiles for each row execute function public.touch_updated_at();
create trigger touch_company_members before update on public.company_members for each row execute function public.touch_updated_at();
create trigger touch_leads before update on public.leads for each row execute function public.touch_updated_at();
create trigger touch_customers before update on public.customers for each row execute function public.touch_updated_at();
create trigger touch_contracts before update on public.contracts for each row execute function public.touch_updated_at();
create trigger touch_installments before update on public.contract_installments for each row execute function public.touch_updated_at();
create trigger touch_costs before update on public.contract_costs for each row execute function public.touch_updated_at();
create trigger touch_technical before update on public.technical_records for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, phone, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    new.phone,
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set
    email = excluded.email,
    phone = excluded.phone,
    avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url);
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user_profile();

create or replace function public.resolve_username_login(requested_username text)
returns text language sql security definer set search_path = public as $$
  select email
  from public.profiles
  where username = lower(regexp_replace(requested_username, '^@', ''))
  limit 1;
$$;

revoke all on function public.resolve_username_login(text) from public;
grant execute on function public.resolve_username_login(text) to anon, authenticated;

create or replace function public.current_company_ids()
returns setof uuid language sql stable security definer set search_path = public as $$
  select company_id
  from public.company_members
  where user_id = auth.uid()
    and status = 'active';
$$;

create or replace function public.current_role_for_company(target_company_id uuid)
returns public.user_role language sql stable security definer set search_path = public as $$
  select role
  from public.company_members
  where user_id = auth.uid()
    and company_id = target_company_id
    and status = 'active'
  limit 1;
$$;

create or replace function public.recalculate_contract_financials(target_contract_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  costs_total numeric(14,2);
  open_total numeric(14,2);
  next_status public.financial_status;
begin
  select coalesce(sum(amount), 0) into costs_total from public.contract_costs where contract_id = target_contract_id;
  select coalesce(sum(amount), 0) into open_total from public.contract_installments where contract_id = target_contract_id and status = 'Pendente';

  if open_total = 0 and exists (select 1 from public.contract_installments where contract_id = target_contract_id and status = 'Paga') then
    next_status := 'Quitado';
  elsif exists (select 1 from public.contract_installments where contract_id = target_contract_id and status = 'Pendente' and due_date < current_date) then
    next_status := 'Em atraso';
  elsif open_total > 0 then
    next_status := 'Parcialmente pago';
  else
    next_status := 'Sem financeiro cadastrado';
  end if;

  update public.contracts
  set total_costs = costs_total,
      open_amount = open_total,
      financial_status = next_status,
      updated_at = now()
  where id = target_contract_id;
end;
$$;

create or replace function public.recalculate_contract_financials_trigger()
returns trigger language plpgsql as $$
begin
  perform public.recalculate_contract_financials(coalesce(new.contract_id, old.contract_id));
  return coalesce(new, old);
end;
$$;

create trigger recalc_after_installments after insert or update or delete on public.contract_installments for each row execute function public.recalculate_contract_financials_trigger();
create trigger recalc_after_costs after insert or update or delete on public.contract_costs for each row execute function public.recalculate_contract_financials_trigger();

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.company_members enable row level security;
alter table public.plans enable row level security;
alter table public.leads enable row level security;
alter table public.customers enable row level security;
alter table public.contracts enable row level security;
alter table public.contract_installments enable row level security;
alter table public.contract_costs enable row level security;
alter table public.technical_records enable row level security;
alter table public.tasks enable row level security;
alter table public.interactions enable row level security;

create policy "plans readable" on public.plans for select using (true);
create policy "profiles self read" on public.profiles for select using (id = auth.uid());
create policy "profiles company member read" on public.profiles for select using (
  exists (
    select 1
    from public.company_members viewer
    join public.company_members target on target.company_id = viewer.company_id
    where viewer.user_id = auth.uid()
      and viewer.status = 'active'
      and target.user_id = profiles.id
      and target.status in ('invited', 'active')
  )
);
create policy "profiles self update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "company members can read company" on public.companies for select using (id in (select public.current_company_ids()));
create policy "members read own companies" on public.company_members for select using (company_id in (select public.current_company_ids()));
create policy "admins manage members" on public.company_members for all using (public.current_role_for_company(company_id) = 'admin') with check (public.current_role_for_company(company_id) = 'admin');

create policy "leads company read" on public.leads for select using (company_id in (select public.current_company_ids()));
create policy "leads commercial write" on public.leads for all using (public.current_role_for_company(company_id) in ('admin', 'comercial')) with check (public.current_role_for_company(company_id) in ('admin', 'comercial'));

create policy "customers company read" on public.customers for select using (company_id in (select public.current_company_ids()));
create policy "customers commercial write" on public.customers for all using (public.current_role_for_company(company_id) in ('admin', 'comercial')) with check (public.current_role_for_company(company_id) in ('admin', 'comercial'));

create policy "contracts company read" on public.contracts for select using (company_id in (select public.current_company_ids()));
create policy "contracts commercial write" on public.contracts for all using (public.current_role_for_company(company_id) in ('admin', 'comercial')) with check (public.current_role_for_company(company_id) in ('admin', 'comercial'));

create policy "installments finance read" on public.contract_installments for select using (public.current_role_for_company(company_id) in ('admin', 'financeiro'));
create policy "installments finance write" on public.contract_installments for all using (public.current_role_for_company(company_id) in ('admin', 'financeiro')) with check (public.current_role_for_company(company_id) in ('admin', 'financeiro'));

create policy "costs finance read" on public.contract_costs for select using (public.current_role_for_company(company_id) in ('admin', 'financeiro'));
create policy "costs finance write" on public.contract_costs for all using (public.current_role_for_company(company_id) in ('admin', 'financeiro')) with check (public.current_role_for_company(company_id) in ('admin', 'financeiro'));

create policy "technical read" on public.technical_records for select using (company_id in (select public.current_company_ids()));
create policy "technical write" on public.technical_records for all using (public.current_role_for_company(company_id) in ('admin', 'tecnico')) with check (public.current_role_for_company(company_id) in ('admin', 'tecnico'));

create policy "tasks company access" on public.tasks for all using (company_id in (select public.current_company_ids())) with check (company_id in (select public.current_company_ids()));
create policy "interactions company access" on public.interactions for all using (company_id in (select public.current_company_ids())) with check (company_id in (select public.current_company_ids()));
