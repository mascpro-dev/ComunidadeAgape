-- Primeira onda: pessoas, papéis e relatórios.
-- Sem foto. Sem seeds de membros de demonstração.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null,
  email text unique,
  cpf text unique,
  endereco text not null default '',
  bairro text not null default '',
  cep text not null default '',
  cidade text not null default '',
  celula text not null default 'Não frequento',
  quer_indicacao boolean not null default false,
  convertido boolean not null default false,
  cursos text not null default '',
  tem_filhos boolean not null default false,
  qtd_filhos integer not null default 0 check (qtd_filhos >= 0),
  estado_civil text not null default 'solteiro'
    check (estado_civil in ('solteiro', 'casado', 'uniao', 'separado', 'viuvo')),
  tempo_casado text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.funcoes (
  id text primary key,
  label text not null
);

insert into public.funcoes (id, label) values
  ('admin', 'Administrador'),
  ('painel', 'Painel de métricas'),
  ('relatorios', 'Enviar relatórios'),
  ('pessoas', 'Ver cadastros'),
  ('liberar', 'Liberar funções'),
  ('audios', 'Publicar áudios')
on conflict (id) do nothing;

create table if not exists public.profile_funcoes (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  funcao_id text not null references public.funcoes (id) on delete cascade,
  primary key (profile_id, funcao_id)
);

create table if not exists public.relatorios (
  id uuid primary key default gen_random_uuid(),
  ministerio text not null,
  lider text not null,
  periodo text not null,
  presentes integer not null default 0 check (presentes >= 0),
  visitantes integer not null default 0 check (visitantes >= 0),
  decisoes integer not null default 0 check (decisoes >= 0),
  observacao text not null default '',
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome, email)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'nome', ''), split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.has_funcao(fid text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profile_funcoes pf
    where pf.profile_id = auth.uid()
      and (pf.funcao_id = fid or pf.funcao_id = 'admin')
  );
$$;

alter table public.profiles enable row level security;
alter table public.funcoes enable row level security;
alter table public.profile_funcoes enable row level security;
alter table public.relatorios enable row level security;

drop policy if exists "funcoes_leitura" on public.funcoes;
create policy "funcoes_leitura"
on public.funcoes for select
to authenticated
using (true);

drop policy if exists "profiles_ler_proprio_ou_lider" on public.profiles;
create policy "profiles_ler_proprio_ou_lider"
on public.profiles for select
to authenticated
using (
  id = auth.uid()
  or public.has_funcao('pessoas')
  or public.has_funcao('admin')
);

drop policy if exists "profiles_atualizar_proprio_ou_lider" on public.profiles;
create policy "profiles_atualizar_proprio_ou_lider"
on public.profiles for update
to authenticated
using (
  id = auth.uid()
  or public.has_funcao('pessoas')
  or public.has_funcao('admin')
)
with check (
  id = auth.uid()
  or public.has_funcao('pessoas')
  or public.has_funcao('admin')
);

drop policy if exists "profile_funcoes_ler" on public.profile_funcoes;
create policy "profile_funcoes_ler"
on public.profile_funcoes for select
to authenticated
using (
  profile_id = auth.uid()
  or public.has_funcao('liberar')
  or public.has_funcao('admin')
);

drop policy if exists "profile_funcoes_admin" on public.profile_funcoes;
create policy "profile_funcoes_admin"
on public.profile_funcoes for all
to authenticated
using (public.has_funcao('liberar') or public.has_funcao('admin'))
with check (public.has_funcao('liberar') or public.has_funcao('admin'));

drop policy if exists "relatorios_ler" on public.relatorios;
create policy "relatorios_ler"
on public.relatorios for select
to authenticated
using (
  public.has_funcao('painel')
  or public.has_funcao('relatorios')
  or public.has_funcao('admin')
);

drop policy if exists "relatorios_inserir" on public.relatorios;
create policy "relatorios_inserir"
on public.relatorios for insert
to authenticated
with check (
  public.has_funcao('relatorios')
  or public.has_funcao('admin')
);
