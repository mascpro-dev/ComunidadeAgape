-- Banners do app (Início, cultos, gerações, capas de curso).
-- Rode no SQL Editor depois das 001–004.
-- Storage → crie o bucket público "banners" se o insert abaixo não criar.

create table if not exists public.banners (
  chave text primary key,
  url text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id) on delete set null
);

alter table public.banners enable row level security;

drop policy if exists "banners_ler" on public.banners;
create policy "banners_ler"
on public.banners for select
to anon, authenticated
using (true);

drop policy if exists "banners_escrever" on public.banners;
create policy "banners_escrever"
on public.banners for all
to authenticated
using (public.has_funcao('painel') or public.has_funcao('admin'))
with check (public.has_funcao('painel') or public.has_funcao('admin'));

insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do update set public = true;

drop policy if exists "banners_storage_ler" on storage.objects;
create policy "banners_storage_ler"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'banners');

drop policy if exists "banners_storage_escrever" on storage.objects;
create policy "banners_storage_escrever"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'banners'
  and (public.has_funcao('painel') or public.has_funcao('admin'))
);

drop policy if exists "banners_storage_atualizar" on storage.objects;
create policy "banners_storage_atualizar"
on storage.objects for update
to authenticated
using (
  bucket_id = 'banners'
  and (public.has_funcao('painel') or public.has_funcao('admin'))
)
with check (
  bucket_id = 'banners'
  and (public.has_funcao('painel') or public.has_funcao('admin'))
);

drop policy if exists "banners_storage_apagar" on storage.objects;
create policy "banners_storage_apagar"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'banners'
  and (public.has_funcao('painel') or public.has_funcao('admin'))
);
