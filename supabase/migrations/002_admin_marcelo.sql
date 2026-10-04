-- Rode DEPOIS de criar o usuário no Authentication > Users.
-- Não inclui CPF nem senha.

insert into public.profiles (id, nome, email, cidade, convertido)
select
  u.id,
  'Marcelo Conelheiros',
  u.email,
  'Marília-SP',
  true
from auth.users u
where lower(u.email) = 'conelheiros@gmail.com'
on conflict (id) do update
set
  nome = excluded.nome,
  email = excluded.email,
  cidade = excluded.cidade,
  convertido = excluded.convertido;

insert into public.profile_funcoes (profile_id, funcao_id)
select p.id, f.id
from public.profiles p
cross join public.funcoes f
where lower(p.email) = 'conelheiros@gmail.com'
on conflict do nothing;
