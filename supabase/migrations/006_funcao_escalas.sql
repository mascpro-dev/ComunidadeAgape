-- Rode no SQL Editor depois das migrations 001–005.
-- Sem esta linha, o checkbox "Fazer escalas" não grava: profile_funcoes exige a função no catálogo.

insert into public.funcoes (id, label) values
  ('escalas', 'Fazer escalas')
on conflict (id) do update set label = excluded.label;

insert into public.profile_funcoes (profile_id, funcao_id)
select p.id, 'escalas'
from public.profiles p
where lower(p.email) = 'conelheiros@gmail.com'
on conflict do nothing;
