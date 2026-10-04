-- Foto do perfil (jpeg compactado no app).
alter table public.profiles
  add column if not exists foto text not null default '';
