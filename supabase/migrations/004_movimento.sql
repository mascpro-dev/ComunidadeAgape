-- Movimento do membro: célula + curso + culto.
-- Rode no SQL Editor depois das migrations 001–003.

insert into public.funcoes (id, label) values
  ('gestao', 'Gestão do movimento')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Células
-- ---------------------------------------------------------------------------
create table if not exists public.celulas_db (
  id text primary key,
  nome text not null,
  dia text not null default '',
  hora text not null default '',
  bairro text not null default '',
  cep text not null default '',
  host_nome text not null default '',
  geracao text not null default '',
  vagas integer not null default 12,
  ativa boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.celulas_db (id, nome, dia, hora, bairro, cep, host_nome, geracao, vagas) values
  ('c1', 'Célula Norte', 'Seg', '20h', 'Centro', '17500-001', 'Ana e Pedro', 'adultos', 12),
  ('c2', 'Célula Universitários', 'Sex', '23h', 'Jardins', '17514-010', 'Lucas', 'jovens', 16),
  ('c3', 'Célula Famílias', 'Qua', '20h', 'Vila Nova', '17511-000', 'Carla', 'familias', 12),
  ('c4', 'Célula Mulheres', 'Qui', '19h', 'Centro', '17500-100', 'Bia', 'mulheres', 12),
  ('c5', 'Célula Homens', 'Sáb', '7h30', 'Parque', '17512-000', 'Rafa', 'homens', 12),
  ('c6', 'Célula de Adolescentes', 'Sex', '20h', 'Flamingo', '17514-100', 'Mari', 'adolescentes', 16)
on conflict (id) do update set
  nome = excluded.nome,
  dia = excluded.dia,
  hora = excluded.hora,
  bairro = excluded.bairro,
  cep = excluded.cep,
  host_nome = excluded.host_nome,
  geracao = excluded.geracao;

create table if not exists public.celula_membros (
  id uuid primary key default gen_random_uuid(),
  celula_id text not null references public.celulas_db (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  papel text not null default 'membro'
    check (papel in ('lider', 'anfitriao', 'membro', 'visitante')),
  status text not null default 'pedido'
    check (status in ('pedido', 'ativo', 'afastado')),
  desde date not null default current_date,
  ate date,
  created_at timestamptz not null default now(),
  unique (celula_id, profile_id)
);

create unique index if not exists celula_membros_um_ativo
  on public.celula_membros (profile_id)
  where status = 'ativo';

-- ---------------------------------------------------------------------------
-- Cursos (catálogo alinhado ao app) + inscrição
-- ---------------------------------------------------------------------------
create table if not exists public.cursos_catalogo (
  id text primary key,
  nome text not null,
  linha text not null default 'escola'
    check (linha in ('crown', 'habitudes', 'ignicao', 'cole', 'ffi', 'gfi', 'escola')),
  semanas integer not null default 1,
  publico text not null default '',
  geracoes text not null default ''
);

insert into public.cursos_catalogo (id, nome, linha, semanas, publico, geracoes) values
  ('cr1', 'Estudo Financeiro Bíblico — Crown', 'crown', 10, '18+', 'Jovens · Homens · Mulheres · Famílias'),
  ('cr2', 'Dinheiro e Casamento', 'crown', 6, 'Casais', 'Famílias'),
  ('cr3', 'Como Chegar ao Fim do Mês', 'crown', 4, '18+', 'Jovens · Homens · Mulheres · Famílias'),
  ('cr4', 'ABC do Dinheiro', 'crown', 10, '5–7 anos', 'Infantil'),
  ('cr5', 'O Segredo', 'crown', 12, '8–12 anos', 'Infantil'),
  ('cr6', 'Crown Teens', 'crown', 12, '13–17', 'Adolescentes'),
  ('hb1', 'Habitudes: Autoliderança', 'habitudes', 13, '12–24', 'Adolescentes · Jovens'),
  ('hb2', 'Habitudes: Conectar-se', 'habitudes', 13, '12–24', 'Adolescentes · Jovens'),
  ('hb3', 'Habitudes: Liderar os outros', 'habitudes', 13, '12–24', 'Adolescentes · Jovens'),
  ('hb4', 'Habitudes: Transformar a cultura', 'habitudes', 13, '12–24', 'Adolescentes · Jovens'),
  ('hb5', 'Habitudes: Liderança espiritual', 'habitudes', 13, '12–24', 'Adolescentes · Jovens'),
  ('ig1', 'Ignição', 'ignicao', 6, 'A partir de 12', 'Adolescentes · Jovens'),
  ('n1', 'Namoro com propósito', 'escola', 6, 'Jovens', 'Jovens · Famílias'),
  ('n2', 'Noivos Ágape', 'escola', 8, 'Noivos', 'Famílias'),
  ('n3', 'Casais em missão', 'escola', 8, 'Casais', 'Famílias'),
  ('n4', 'Pais que discipulam', 'escola', 5, 'Famílias', 'Famílias'),
  ('mw1', 'A Mulher Que Prospera', 'escola', 10, 'Mulheres 18+', 'Mulheres'),
  ('mw2', 'Mulher Única', 'cole', 13, 'Público geral', 'Mulheres · Jovens · Adolescentes'),
  ('mw3', 'Ser Mulher', 'escola', 11, 'Público geral', 'Mulheres · Jovens · Adolescentes'),
  ('hm1', 'Homem ao Máximo', 'cole', 13, 'Homens 18+', 'Homens · Jovens'),
  ('hm2', 'Vencedores Nunca Desistem', 'cole', 13, 'Todas as gerações', 'Mulheres · Homens · Adolescentes · Jovens'),
  ('hm3', 'Coragem', 'cole', 13, 'Homens 13+', 'Adolescentes · Jovens · Homens'),
  ('hm4', 'Homem de Verdade', 'cole', 13, 'Homens 18+', 'Homens · Jovens'),
  ('hm5', 'O Poder do Potencial', 'cole', 13, 'Todas as gerações', 'Mulheres · Homens · Adolescentes · Jovens'),
  ('hm6', 'Comunicação, Sexo e Dinheiro', 'cole', 13, 'Todas as gerações', 'Mulheres · Homens · Adolescentes · Jovens'),
  ('hm7', 'Homens Fortes em Tempos Difíceis', 'cole', 13, 'Homens 15+', 'Adolescentes · Jovens · Homens'),
  ('hm8', 'Integridade Sexual', 'cole', 7, 'Todas as gerações', 'Mulheres · Homens · Adolescentes · Jovens'),
  ('hm9', 'Tesouro', 'cole', 7, 'Todas as gerações', 'Mulheres · Homens · Adolescentes · Jovens'),
  ('hm10', 'Minha Mulher Única', 'cole', 13, 'Homens 18+', 'Homens · Jovens'),
  ('hm11', 'Marido Irresistível', 'cole', 13, 'Homens 18+', 'Homens · Jovens'),
  ('ff1', 'Aliança', 'ffi', 10, 'Casais e noivos', 'Famílias · Jovens'),
  ('ff2', 'Romance à Maneira de Deus', 'ffi', 10, 'Pais + filho', 'Famílias · Adolescentes · Jovens'),
  ('ff3', 'Treinamento para Ministração', 'ffi', 1, 'A partir de 13', 'Famílias · Adolescentes · Jovens · Homens · Mulheres'),
  ('ff4', 'Fortalecendo Relacionamentos', 'ffi', 1, 'A partir de 13', 'Famílias · Adolescentes · Jovens · Homens · Mulheres'),
  ('ff5', 'Transformando Corações', 'ffi', 1, 'A partir de 13', 'Famílias · Adolescentes · Jovens · Homens · Mulheres'),
  ('ff6', 'Abençoando Gerações', 'ffi', 1, 'A partir de 13', 'Famílias · Adolescentes · Jovens · Homens · Mulheres'),
  ('ff7', 'A Pergunta', 'ffi', 1, 'A partir de 13', 'Famílias · Adolescentes · Jovens · Homens · Mulheres'),
  ('ff8', 'Vencendo a Ira', 'ffi', 1, 'A partir de 13', 'Famílias · Adolescentes · Jovens · Homens · Mulheres'),
  ('gf1', 'Preparação para a Chegada do Bebê', 'gfi', 5, 'Grávidas 4º mês', 'Famílias · Infantil · Mulheres'),
  ('gf2', 'A Transição do Infante', 'gfi', 9, 'Pais 1–3 anos', 'Famílias · Infantil'),
  ('gf3', 'Como Criar Seus Filhos', 'gfi', 10, 'Pais e educadores', 'Famílias · Infantil'),
  ('gf4', 'Educação de Filhos à Maneira de Deus', 'gfi', 17, 'Pais e educadores', 'Famílias · Infantil'),
  ('gf5', 'Como Proteger a Pureza de Seus Filhos', 'gfi', 9, 'Pais e educadores', 'Famílias · Infantil · Adolescentes'),
  ('gf6', 'Alcançando o Coração do Seu Adolescente', 'gfi', 12, 'Pais e educadores', 'Famílias · Adolescentes · Homens · Mulheres'),
  ('gf7', 'Um Convite Para Voar', 'gfi', 7, 'Pais · criança com deficiência', 'Famílias · Infantil')
on conflict (id) do update set
  nome = excluded.nome,
  linha = excluded.linha,
  semanas = excluded.semanas,
  publico = excluded.publico,
  geracoes = excluded.geracoes;

create table if not exists public.turmas (
  id uuid primary key default gen_random_uuid(),
  curso_id text not null references public.cursos_catalogo (id) on delete cascade,
  nome text not null default '',
  inicia_em date,
  status text not null default 'aberta'
    check (status in ('aberta', 'andamento', 'encerrada')),
  vagas integer not null default 16,
  modalidade text not null default 'Presencial e online',
  created_at timestamptz not null default now()
);

create table if not exists public.inscricoes (
  id uuid primary key default gen_random_uuid(),
  curso_id text not null references public.cursos_catalogo (id) on delete cascade,
  turma_id uuid references public.turmas (id) on delete set null,
  profile_id uuid references public.profiles (id) on delete set null,
  nome text not null default '',
  status text not null default 'inscrito'
    check (status in ('inscrito', 'confirmado', 'cursando', 'concluido', 'desistiu')),
  created_at timestamptz not null default now()
);

create unique index if not exists inscricoes_ativas_uid
  on public.inscricoes (profile_id, curso_id)
  where profile_id is not null and status in ('inscrito', 'confirmado', 'cursando');

-- ---------------------------------------------------------------------------
-- Culto + presença
-- ---------------------------------------------------------------------------
create table if not exists public.cultos (
  id uuid primary key default gen_random_uuid(),
  tipo text not null
    check (tipo in ('familia', 'noite', 'jovens', 'pre', 'infantil', 'encontro_homens')),
  titulo text not null,
  inicia_em timestamptz not null,
  local text not null default 'Templo',
  online boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists cultos_quando on public.cultos (inicia_em desc);

create table if not exists public.presencas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  contexto text not null check (contexto in ('culto', 'celula', 'turma', 'checkin_kids')),
  profile_id uuid references public.profiles (id) on delete set null,
  nome text not null default '',
  culto_id uuid references public.cultos (id) on delete cascade,
  celula_id text references public.celulas_db (id) on delete set null,
  turma_id uuid references public.turmas (id) on delete set null,
  visitante boolean not null default false
);

-- ---------------------------------------------------------------------------
-- Log de movimento (o que o membro fez, mesmo sem login)
-- ---------------------------------------------------------------------------
create table if not exists public.movimentos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tipo text not null check (tipo in (
    'culto', 'celula_pedido', 'celula_membro', 'curso_inscricao',
    'curso_conclusao', 'checkin_kids', 'oracao', 'quero_ir'
  )),
  profile_id uuid references public.profiles (id) on delete set null,
  nome text not null default '',
  celula_id text references public.celulas_db (id) on delete set null,
  curso_id text references public.cursos_catalogo (id) on delete set null,
  extra text not null default '',
  detalhe text not null default ''
);

create index if not exists movimentos_quando on public.movimentos (created_at desc);
create index if not exists movimentos_pessoa on public.movimentos (profile_id, created_at desc);

create table if not exists public.kids_checkin (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  codigo text not null unique,
  crianca text not null,
  sala text not null,
  profile_id uuid references public.profiles (id) on delete set null,
  culto_id uuid references public.cultos (id) on delete set null
);

-- ---------------------------------------------------------------------------
-- Visão da gestão: uma linha por membro
-- ---------------------------------------------------------------------------
create or replace view public.v_membro_movimento
with (security_invoker = true) as
select
  p.id,
  p.nome,
  p.email,
  p.convertido,
  p.bairro,
  p.cidade,
  p.quer_indicacao,
  coalesce(c.nome, nullif(p.celula, 'Não frequento'), p.celula) as celula_nome,
  cm.papel as celula_papel,
  cm.status as celula_status,
  (
    select count(*)::int
    from public.inscricoes i
    where i.profile_id = p.id
      and i.status in ('inscrito', 'confirmado', 'cursando')
  ) as cursos_ativos,
  (
    select count(*)::int
    from public.inscricoes i
    where i.profile_id = p.id
      and i.status = 'concluido'
  ) as cursos_concluidos,
  (
    select count(*)::int
    from public.presencas pr
    where pr.profile_id = p.id
      and pr.contexto = 'culto'
      and pr.created_at > now() - interval '90 days'
  ) as cultos_90d,
  (
    select count(*)::int
    from public.presencas pr
    where pr.profile_id = p.id
      and pr.contexto = 'celula'
      and pr.created_at > now() - interval '90 days'
  ) as celulas_90d,
  (
    select max(pr.created_at)
    from public.presencas pr
    where pr.profile_id = p.id
      and pr.contexto = 'culto'
  ) as ultimo_culto,
  (
    select max(m.created_at)
    from public.movimentos m
    where m.profile_id = p.id
  ) as ultimo_movimento
from public.profiles p
left join lateral (
  select cm0.papel, cm0.status, cm0.celula_id
  from public.celula_membros cm0
  where cm0.profile_id = p.id
  order by case cm0.status when 'ativo' then 0 when 'pedido' then 1 else 2 end, cm0.created_at desc
  limit 1
) cm on true
left join public.celulas_db c on c.id = cm.celula_id;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.celulas_db enable row level security;
alter table public.celula_membros enable row level security;
alter table public.cursos_catalogo enable row level security;
alter table public.turmas enable row level security;
alter table public.inscricoes enable row level security;
alter table public.cultos enable row level security;
alter table public.presencas enable row level security;
alter table public.movimentos enable row level security;
alter table public.kids_checkin enable row level security;

drop policy if exists "celulas_ler" on public.celulas_db;
create policy "celulas_ler" on public.celulas_db for select to authenticated using (true);

drop policy if exists "cursos_ler" on public.cursos_catalogo;
create policy "cursos_ler" on public.cursos_catalogo for select to authenticated using (true);

drop policy if exists "turmas_ler" on public.turmas;
create policy "turmas_ler" on public.turmas for select to authenticated using (true);

drop policy if exists "cultos_ler" on public.cultos;
create policy "cultos_ler" on public.cultos for select to authenticated using (true);

drop policy if exists "celula_membros_ler" on public.celula_membros;
create policy "celula_membros_ler" on public.celula_membros for select to authenticated
using (
  profile_id = auth.uid()
  or public.has_funcao('pessoas')
  or public.has_funcao('gestao')
  or public.has_funcao('admin')
);

drop policy if exists "celula_membros_escrever" on public.celula_membros;
create policy "celula_membros_escrever" on public.celula_membros for insert to authenticated
with check (profile_id = auth.uid() or public.has_funcao('gestao') or public.has_funcao('admin'));

drop policy if exists "celula_membros_gestao" on public.celula_membros;
create policy "celula_membros_gestao" on public.celula_membros for update to authenticated
using (public.has_funcao('gestao') or public.has_funcao('pessoas') or public.has_funcao('admin'))
with check (public.has_funcao('gestao') or public.has_funcao('pessoas') or public.has_funcao('admin'));

drop policy if exists "inscricoes_ler" on public.inscricoes;
create policy "inscricoes_ler" on public.inscricoes for select to authenticated
using (
  profile_id = auth.uid()
  or public.has_funcao('pessoas')
  or public.has_funcao('gestao')
  or public.has_funcao('admin')
);

drop policy if exists "inscricoes_inserir" on public.inscricoes;
create policy "inscricoes_inserir" on public.inscricoes for insert to authenticated
with check (profile_id = auth.uid() or profile_id is null or public.has_funcao('gestao') or public.has_funcao('admin'));

drop policy if exists "inscricoes_gestao" on public.inscricoes;
create policy "inscricoes_gestao" on public.inscricoes for update to authenticated
using (public.has_funcao('gestao') or public.has_funcao('admin'))
with check (public.has_funcao('gestao') or public.has_funcao('admin'));

drop policy if exists "presencas_ler" on public.presencas;
create policy "presencas_ler" on public.presencas for select to authenticated
using (
  profile_id = auth.uid()
  or public.has_funcao('painel')
  or public.has_funcao('gestao')
  or public.has_funcao('admin')
);

drop policy if exists "presencas_inserir" on public.presencas;
create policy "presencas_inserir" on public.presencas for insert to authenticated
with check (profile_id = auth.uid() or profile_id is null or public.has_funcao('gestao') or public.has_funcao('admin'));

drop policy if exists "movimentos_ler" on public.movimentos;
create policy "movimentos_ler" on public.movimentos for select to authenticated
using (
  profile_id = auth.uid()
  or public.has_funcao('painel')
  or public.has_funcao('pessoas')
  or public.has_funcao('gestao')
  or public.has_funcao('admin')
);

drop policy if exists "movimentos_inserir" on public.movimentos;
create policy "movimentos_inserir" on public.movimentos for insert
to anon, authenticated
with check (profile_id is null or profile_id = auth.uid() or public.has_funcao('gestao') or public.has_funcao('admin'));

drop policy if exists "kids_ler" on public.kids_checkin;
create policy "kids_ler" on public.kids_checkin for select to authenticated
using (
  profile_id = auth.uid()
  or public.has_funcao('gestao')
  or public.has_funcao('admin')
);

drop policy if exists "kids_inserir" on public.kids_checkin;
create policy "kids_inserir" on public.kids_checkin for insert
to anon, authenticated
with check (true);

insert into public.profile_funcoes (profile_id, funcao_id)
select p.id, 'gestao'
from public.profiles p
where lower(p.email) = 'conelheiros@gmail.com'
on conflict do nothing;
