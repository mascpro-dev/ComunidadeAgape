export type Periodo = "manha" | "tarde" | "noite";

export type StatusEscala = "nao_notificado" | "aguardando" | "confirmado" | "troca" | "presente";

export type Departamento = {
  id: string;
  nome: string;
  confirmacaoAutomatica: boolean;
};

export type FuncaoServir = {
  id: string;
  departamentoId: string;
  nome: string;
  descritivo: string;
};

export type TagServir = {
  id: string;
  nome: string;
  tipo: "voluntario" | "musica";
};

export type Bloqueio = {
  id: string;
  inicio: string;
  fim: string;
  motivo: string;
};

export type Voluntario = {
  id: string;
  nome: string;
  telefone: string;
  ddi: string;
  funcoes: string[];
  funcoesPendentes: string[];
  tags: string[];
  disponibilidade: Record<string, Record<Periodo, boolean>>;
  bloqueios: Bloqueio[];
};

export type Equipe = {
  id: string;
  nome: string;
  departamentoId: string;
  membros: { funcaoId: string; voluntarioId: string }[];
};

export type Evento = {
  id: string;
  serieId: string | null;
  nome: string;
  data: string;
  hora: string;
  descricao: string;
  departamentoIds: string[];
};

export type Vaga = {
  id: string;
  eventoId: string;
  funcaoId: string;
  rotulo: string;
  voluntarioId: string | null;
  status: StatusEscala | null;
};

export type Frequencia = "semanal" | "quinzenal" | "mensal";

export type ServirConfig = {
  umaPorDia: boolean;
  validarFuncao: boolean;
  saudeAtiva: boolean;
  limiteDias: number;
  bloquearAcima: boolean;
  tourVisto: boolean;
  euVoluntarioId: string | null;
};

export type ServirState = {
  departamentos: Departamento[];
  funcoes: FuncaoServir[];
  voluntarios: Voluntario[];
  tags: TagServir[];
  equipes: Equipe[];
  eventos: Evento[];
  vagas: Vaga[];
  config: ServirConfig;
};

export const STORAGE_KEY = "agape-servir-v1";

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function disponibilidadeCheia(): Voluntario["disponibilidade"] {
  const o: Voluntario["disponibilidade"] = {};
  for (let i = 0; i < 7; i++) {
    o[String(i)] = { manha: true, tarde: true, noite: true };
  }
  return o;
}

function dep(id: string, nome: string): Departamento {
  return { id, nome, confirmacaoAutomatica: true };
}

function fun(id: string, departamentoId: string, nome: string): FuncaoServir {
  return { id, departamentoId, nome, descritivo: "" };
}

export function estadoInicial(): ServirState {
  const departamentos = [
    dep("dep-comunicacao", "Comunicação"),
    dep("dep-kids", "Kids"),
    dep("dep-louvor", "Louvor"),
    dep("dep-geral", "Voluntariado geral"),
  ];
  const funcoes = [
    fun("fn-foto", "dep-comunicacao", "Fotógrafo"),
    fun("fn-som", "dep-comunicacao", "Operador de Som"),
    fun("fn-proj", "dep-comunicacao", "Projeção"),
    fun("fn-story", "dep-comunicacao", "Story"),
    fun("fn-trans", "dep-comunicacao", "Transmissão"),
    fun("fn-video", "dep-comunicacao", "Videomaker"),
    fun("fn-vol-midia", "dep-comunicacao", "Voluntário"),
    fun("fn-prof", "dep-kids", "Professor"),
    fun("fn-rec-kids", "dep-kids", "Recepção"),
    fun("fn-aux", "dep-kids", "Auxiliar"),
    fun("fn-ministro", "dep-louvor", "Ministro"),
    fun("fn-vocal", "dep-louvor", "Vocal"),
    fun("fn-guitarra", "dep-louvor", "Guitarra"),
    fun("fn-teclado", "dep-louvor", "Teclado"),
    fun("fn-bateria", "dep-louvor", "Bateria"),
    fun("fn-baixo", "dep-louvor", "Baixo"),
    fun("fn-recepcao", "dep-geral", "Recepção"),
    fun("fn-estacionamento", "dep-geral", "Estacionamento"),
    fun("fn-intercessao", "dep-geral", "Intercessão"),
  ];
  return {
    departamentos,
    funcoes,
    voluntarios: [],
    tags: [],
    equipes: [],
    eventos: [],
    vagas: [],
    config: {
      umaPorDia: false,
      validarFuncao: false,
      saudeAtiva: true,
      limiteDias: 2,
      bloquearAcima: false,
      tourVisto: false,
      euVoluntarioId: null,
    },
  };
}

export function hidratar(raw: Partial<ServirState> | null): ServirState {
  const base = estadoInicial();
  if (!raw || !Array.isArray(raw.departamentos) || raw.departamentos.length === 0) return base;
  return {
    ...base,
    ...raw,
    departamentos: raw.departamentos?.length ? raw.departamentos : base.departamentos,
    funcoes: raw.funcoes?.length ? raw.funcoes : base.funcoes,
    voluntarios: raw.voluntarios || [],
    tags: raw.tags || [],
    equipes: raw.equipes || [],
    eventos: (raw.eventos || []).map((e) => ({ ...e, departamentoIds: e.departamentoIds || [] })),
    vagas: raw.vagas || [],
    config: { ...base.config, ...(raw.config || {}) },
  };
}

export function isoHoje() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dia}`;
}

export function somaDias(iso: string, dias: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + dias);
  return dataIso(d);
}

export function somaMeses(iso: string, meses: number) {
  const d = new Date(`${iso}T12:00:00`);
  const dia = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + meses);
  const ultimo = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(dia, ultimo));
  return dataIso(d);
}

function dataIso(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dia}`;
}

export function datasRecorrencia(inicio: string, ate: string, frequencia: Frequencia) {
  const datas: string[] = [];
  let cursor = inicio;
  let guarda = 0;
  while (cursor <= ate && guarda < 80) {
    datas.push(cursor);
    guarda += 1;
    if (frequencia === "semanal") cursor = somaDias(cursor, 7);
    else if (frequencia === "quinzenal") cursor = somaDias(cursor, 14);
    else cursor = somaMeses(cursor, 1);
  }
  return datas;
}

export function fmtData(iso: string) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export function fmtQuando(iso: string, hora: string) {
  const d = new Date(`${iso}T12:00:00`);
  const longa = d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  const titulo = longa.charAt(0).toUpperCase() + longa.slice(1);
  return `${titulo} · ${hora}`;
}

export function periodoDaHora(hora: string): Periodo {
  const h = Number(hora.slice(0, 2));
  if (h < 12) return "manha";
  if (h < 18) return "tarde";
  return "noite";
}

export function semanaDe(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start: dataIso(start), end: dataIso(end) };
}

export function nomeFuncao(state: ServirState, id: string) {
  return state.funcoes.find((f) => f.id === id)?.nome || "Função";
}

export function nomeDepartamento(state: ServirState, id: string) {
  return state.departamentos.find((d) => d.id === id)?.nome || "Departamento";
}

function vagaVazia(eventoId: string, funcao: FuncaoServir): Vaga {
  return {
    id: uid(),
    eventoId,
    funcaoId: funcao.id,
    rotulo: funcao.nome,
    voluntarioId: null,
    status: null,
  };
}

export function sincronizarVagas(state: ServirState, eventoId: string): ServirState {
  const evento = state.eventos.find((e) => e.id === eventoId);
  if (!evento) return state;
  const deps = new Set(evento.departamentoIds);
  const wanted = state.funcoes.filter((f) => deps.has(f.departamentoId));
  let vagas = state.vagas.filter((v) => {
    if (v.eventoId !== eventoId) return true;
    const f = state.funcoes.find((x) => x.id === v.funcaoId);
    return Boolean(f && deps.has(f.departamentoId));
  });
  for (const f of wanted) {
    if (!vagas.some((v) => v.eventoId === eventoId && v.funcaoId === f.id)) {
      vagas = [...vagas, vagaVazia(eventoId, f)];
    }
  }
  return { ...state, vagas };
}

export type NovoEvento = {
  nome: string;
  data: string;
  hora: string;
  descricao: string;
  departamentoIds: string[];
  recorrencia?: { frequencia: Frequencia; ate: string };
};

export function criarEventos(state: ServirState, input: NovoEvento): { state: ServirState; id: string } {
  const datas = input.recorrencia
    ? datasRecorrencia(input.data, input.recorrencia.ate, input.recorrencia.frequencia)
    : [input.data];
  const serieId = datas.length > 1 ? uid() : null;
  const eventos: Evento[] = datas.map((data) => ({
    id: uid(),
    serieId,
    nome: input.nome.trim() || "Culto",
    data,
    hora: input.hora || "19:00",
    descricao: input.descricao.slice(0, 2000),
    departamentoIds: input.departamentoIds,
  }));
  let next: ServirState = {
    ...state,
    eventos: [...state.eventos, ...eventos],
  };
  const novas: Vaga[] = [];
  for (const evento of eventos) {
    for (const f of next.funcoes) {
      if (input.departamentoIds.includes(f.departamentoId)) novas.push(vagaVazia(evento.id, f));
    }
  }
  next = { ...next, vagas: [...next.vagas, ...novas] };
  return { state: next, id: eventos[0]?.id || "" };
}

export function atualizarEvento(
  state: ServirState,
  eventoId: string,
  patch: Partial<Pick<Evento, "nome" | "data" | "hora" | "descricao">>,
  departamentoIds: string[],
  serie: boolean,
): ServirState {
  const alvo = state.eventos.find((e) => e.id === eventoId);
  if (!alvo) return state;
  const ids = new Set(
    serie && alvo.serieId ? state.eventos.filter((e) => e.serieId === alvo.serieId).map((e) => e.id) : [eventoId],
  );
  let next: ServirState = {
    ...state,
    eventos: state.eventos.map((e) => {
      if (!ids.has(e.id)) return e;
      return {
        ...e,
        nome: patch.nome !== undefined ? patch.nome : e.nome,
        hora: patch.hora !== undefined ? patch.hora : e.hora,
        descricao: patch.descricao !== undefined ? patch.descricao.slice(0, 2000) : e.descricao,
        data: e.id === eventoId && patch.data ? patch.data : e.data,
        departamentoIds,
      };
    }),
  };
  for (const id of ids) next = sincronizarVagas(next, id);
  return next;
}

export function removerEvento(state: ServirState, eventoId: string, serie: boolean): ServirState {
  const alvo = state.eventos.find((e) => e.id === eventoId);
  if (!alvo) return state;
  const ids = new Set(
    serie && alvo.serieId ? state.eventos.filter((e) => e.serieId === alvo.serieId).map((e) => e.id) : [eventoId],
  );
  return {
    ...state,
    eventos: state.eventos.filter((e) => !ids.has(e.id)),
    vagas: state.vagas.filter((v) => !ids.has(v.eventoId)),
  };
}

export function duplicarVaga(state: ServirState, vagaId: string): ServirState {
  const vaga = state.vagas.find((v) => v.id === vagaId);
  if (!vaga) return state;
  const copia: Vaga = { ...vaga, id: uid(), voluntarioId: null, status: null };
  const idx = state.vagas.findIndex((v) => v.id === vagaId);
  const vagas = state.vagas.slice();
  vagas.splice(idx + 1, 0, copia);
  return { ...state, vagas };
}

export function renomearVaga(state: ServirState, vagaId: string, rotulo: string): ServirState {
  const nome = rotulo.trim();
  if (!nome) return state;
  return { ...state, vagas: state.vagas.map((v) => (v.id === vagaId ? { ...v, rotulo: nome } : v)) };
}

export function atribuir(state: ServirState, vagaId: string, voluntarioId: string | null): ServirState {
  return {
    ...state,
    vagas: state.vagas.map((v) =>
      v.id === vagaId ? { ...v, voluntarioId, status: voluntarioId ? "nao_notificado" : null } : v,
    ),
  };
}

export function definirStatus(state: ServirState, vagaId: string, status: StatusEscala): ServirState {
  return {
    ...state,
    vagas: state.vagas.map((v) => (v.id === vagaId && v.voluntarioId ? { ...v, status } : v)),
  };
}

export function notificarEvento(state: ServirState, eventoId: string): ServirState {
  return {
    ...state,
    vagas: state.vagas.map((v) => {
      if (v.eventoId !== eventoId || !v.voluntarioId) return v;
      if (v.status !== "nao_notificado" && v.status !== null) return v;
      const fun = state.funcoes.find((f) => f.id === v.funcaoId);
      const dep = state.departamentos.find((d) => d.id === fun?.departamentoId);
      return { ...v, status: dep?.confirmacaoAutomatica ? "confirmado" : "aguardando" };
    }),
  };
}

export function diasNaSemana(state: ServirState, voluntarioId: string, dataIso: string) {
  const { start, end } = semanaDe(dataIso);
  const datas = new Set<string>();
  for (const vaga of state.vagas) {
    if (vaga.voluntarioId !== voluntarioId) continue;
    const evento = state.eventos.find((e) => e.id === vaga.eventoId);
    if (!evento || evento.data < start || evento.data > end) continue;
    datas.add(evento.data);
  }
  return datas.size;
}

export function motivoBloqueio(
  state: ServirState,
  voluntarioId: string,
  evento: Evento,
  funcaoId: string,
  ignorarVagaId?: string,
) {
  const vol = state.voluntarios.find((v) => v.id === voluntarioId);
  if (!vol) return "Pessoa não encontrada.";
  if (state.config.validarFuncao && vol.funcoesPendentes.includes(funcaoId) && !vol.funcoes.includes(funcaoId)) {
    return "Função ainda não validada.";
  }
  const dia = String(new Date(`${evento.data}T12:00:00`).getDay());
  const periodo = periodoDaHora(evento.hora);
  if (vol.disponibilidade[dia] && !vol.disponibilidade[dia][periodo]) return "Sem disponibilidade neste horário.";
  const bloco = vol.bloqueios.find((b) => evento.data >= b.inicio && evento.data <= b.fim);
  if (bloco) return bloco.motivo ? `Data bloqueada: ${bloco.motivo}` : "Data bloqueada.";
  const noEvento = state.vagas.some(
    (v) => v.id !== ignorarVagaId && v.eventoId === evento.id && v.voluntarioId === voluntarioId,
  );
  if (noEvento) return "Já está neste culto.";
  if (state.config.umaPorDia) {
    const outro = state.vagas.some((v) => {
      if (v.voluntarioId !== voluntarioId) return false;
      const ev = state.eventos.find((e) => e.id === v.eventoId);
      return Boolean(ev && ev.id !== evento.id && ev.data === evento.data);
    });
    if (outro) return "Já está em outro evento neste dia.";
  }
  if (state.config.saudeAtiva && state.config.bloquearAcima) {
    const jaNoDia = state.eventos.some(
      (e) => e.data === evento.data && state.vagas.some((v) => v.eventoId === e.id && v.voluntarioId === voluntarioId),
    );
    const dias = diasNaSemana(state, voluntarioId, evento.data);
    if (!jaNoDia && dias >= state.config.limiteDias) return `Limite de ${state.config.limiteDias} dias nesta semana.`;
  }
  return "";
}

export function gerarAutomatica(state: ServirState, eventoId: string): ServirState {
  const evento = state.eventos.find((e) => e.id === eventoId);
  if (!evento) return state;
  let next = state;
  const vazias = next.vagas.filter((v) => v.eventoId === eventoId && !v.voluntarioId);
  for (const vaga of vazias) {
    const ranking = next.voluntarios
      .filter((vol) => vol.funcoes.includes(vaga.funcaoId))
      .filter((vol) => !motivoBloqueio(next, vol.id, evento, vaga.funcaoId))
      .map((vol) => ({
        vol,
        dias: diasNaSemana(next, vol.id, evento.data),
        total: next.vagas.filter((v) => v.voluntarioId === vol.id).length,
      }))
      .sort((a, b) => a.dias - b.dias || a.total - b.total || a.vol.nome.localeCompare(b.vol.nome, "pt-BR"));
    const escolhido = ranking[0];
    if (!escolhido) continue;
    const folga =
      next.config.saudeAtiva && !next.config.bloquearAcima
        ? ranking.find((r) => r.dias < next.config.limiteDias) || escolhido
        : escolhido;
    next = atribuir(next, vaga.id, folga.vol.id);
  }
  return next;
}

export function aplicarEquipe(state: ServirState, eventoId: string, equipeId: string): ServirState {
  const equipe = state.equipes.find((e) => e.id === equipeId);
  const evento = state.eventos.find((e) => e.id === eventoId);
  if (!equipe || !evento) return state;
  let next = state;
  for (const membro of equipe.membros) {
    const vaga = next.vagas.find((v) => v.eventoId === eventoId && v.funcaoId === membro.funcaoId && !v.voluntarioId);
    if (!vaga) continue;
    next = atribuir(next, vaga.id, membro.voluntarioId);
  }
  return next;
}

export type NovoVoluntario = {
  nome: string;
  telefone: string;
  ddi: string;
  funcaoId: string;
};

export function adicionarVoluntarios(state: ServirState, lista: NovoVoluntario[]): { state: ServirState; ids: string[] } {
  const ids: string[] = [];
  const voluntarios = state.voluntarios.slice();
  for (const item of lista) {
    const nome = item.nome.trim();
    if (!nome || !item.funcaoId) continue;
    const id = uid();
    ids.push(id);
    const pendente = state.config.validarFuncao;
    voluntarios.push({
      id,
      nome,
      telefone: item.telefone.trim(),
      ddi: item.ddi.trim() || "55",
      funcoes: pendente ? [] : [item.funcaoId],
      funcoesPendentes: pendente ? [item.funcaoId] : [],
      tags: [],
      disponibilidade: disponibilidadeCheia(),
      bloqueios: [],
    });
  }
  return { state: { ...state, voluntarios }, ids };
}

export function atualizarVoluntario(state: ServirState, id: string, patch: Partial<Voluntario>): ServirState {
  return {
    ...state,
    voluntarios: state.voluntarios.map((v) => (v.id === id ? { ...v, ...patch, id: v.id } : v)),
  };
}

export function removerVoluntario(state: ServirState, id: string): ServirState {
  return {
    ...state,
    voluntarios: state.voluntarios.filter((v) => v.id !== id),
    equipes: state.equipes.map((e) => ({ ...e, membros: e.membros.filter((m) => m.voluntarioId !== id) })),
    vagas: state.vagas.map((v) => (v.voluntarioId === id ? { ...v, voluntarioId: null, status: null } : v)),
    config: { ...state.config, euVoluntarioId: state.config.euVoluntarioId === id ? null : state.config.euVoluntarioId },
  };
}

export function validarFuncaoVoluntario(state: ServirState, voluntarioId: string, funcaoId: string): ServirState {
  return {
    ...state,
    voluntarios: state.voluntarios.map((v) => {
      if (v.id !== voluntarioId) return v;
      return {
        ...v,
        funcoesPendentes: v.funcoesPendentes.filter((f) => f !== funcaoId),
        funcoes: v.funcoes.includes(funcaoId) ? v.funcoes : [...v.funcoes, funcaoId],
      };
    }),
  };
}

export function adicionarDepartamento(state: ServirState, nome: string): ServirState {
  const limpo = nome.trim();
  if (!limpo) return state;
  return { ...state, departamentos: [...state.departamentos, dep(uid(), limpo)] };
}

export function renomearDepartamento(state: ServirState, id: string, nome: string): ServirState {
  const limpo = nome.trim();
  if (!limpo) return state;
  return { ...state, departamentos: state.departamentos.map((d) => (d.id === id ? { ...d, nome: limpo } : d)) };
}

export function definirConfirmacao(state: ServirState, id: string, confirmacaoAutomatica: boolean): ServirState {
  return {
    ...state,
    departamentos: state.departamentos.map((d) => (d.id === id ? { ...d, confirmacaoAutomatica } : d)),
  };
}

export function removerDepartamento(state: ServirState, id: string): ServirState {
  const funIds = new Set(state.funcoes.filter((f) => f.departamentoId === id).map((f) => f.id));
  return {
    ...state,
    departamentos: state.departamentos.filter((d) => d.id !== id),
    funcoes: state.funcoes.filter((f) => f.departamentoId !== id),
    equipes: state.equipes.filter((e) => e.departamentoId !== id),
    vagas: state.vagas.filter((v) => !funIds.has(v.funcaoId)),
    eventos: state.eventos.map((e) => ({ ...e, departamentoIds: e.departamentoIds.filter((d) => d !== id) })),
    voluntarios: state.voluntarios.map((v) => ({
      ...v,
      funcoes: v.funcoes.filter((f) => !funIds.has(f)),
      funcoesPendentes: v.funcoesPendentes.filter((f) => !funIds.has(f)),
    })),
  };
}

export function adicionarFuncao(state: ServirState, departamentoId: string, nome: string): ServirState {
  const limpo = nome.trim();
  if (!limpo) return state;
  return { ...state, funcoes: [...state.funcoes, fun(uid(), departamentoId, limpo)] };
}

export function renomearFuncao(state: ServirState, id: string, nome: string): ServirState {
  const limpo = nome.trim();
  if (!limpo) return state;
  return { ...state, funcoes: state.funcoes.map((f) => (f.id === id ? { ...f, nome: limpo } : f)) };
}

export function definirDescritivo(state: ServirState, id: string, descritivo: string): ServirState {
  return { ...state, funcoes: state.funcoes.map((f) => (f.id === id ? { ...f, descritivo } : f)) };
}

export function removerFuncao(state: ServirState, id: string): ServirState {
  return {
    ...state,
    funcoes: state.funcoes.filter((f) => f.id !== id),
    vagas: state.vagas.filter((v) => v.funcaoId !== id),
    equipes: state.equipes.map((e) => ({ ...e, membros: e.membros.filter((m) => m.funcaoId !== id) })),
    voluntarios: state.voluntarios.map((v) => ({
      ...v,
      funcoes: v.funcoes.filter((f) => f !== id),
      funcoesPendentes: v.funcoesPendentes.filter((f) => f !== id),
    })),
  };
}

export function adicionarTag(state: ServirState, nome: string, tipo: TagServir["tipo"]): ServirState {
  const limpo = nome.trim();
  if (!limpo) return state;
  return { ...state, tags: [...state.tags, { id: uid(), nome: limpo, tipo }] };
}

export function removerTag(state: ServirState, id: string): ServirState {
  return {
    ...state,
    tags: state.tags.filter((t) => t.id !== id),
    voluntarios: state.voluntarios.map((v) => ({ ...v, tags: v.tags.filter((t) => t !== id) })),
  };
}

export function salvarEquipe(state: ServirState, equipe: Equipe): ServirState {
  const existe = state.equipes.some((e) => e.id === equipe.id);
  return {
    ...state,
    equipes: existe ? state.equipes.map((e) => (e.id === equipe.id ? equipe : e)) : [...state.equipes, equipe],
  };
}

export function removerEquipe(state: ServirState, id: string): ServirState {
  return { ...state, equipes: state.equipes.filter((e) => e.id !== id) };
}

export function patchConfig(state: ServirState, patch: Partial<ServirConfig>): ServirState {
  return { ...state, config: { ...state.config, ...patch } };
}

export function situacaoEvento(state: ServirState, eventoId: string) {
  const comPessoa = state.vagas.filter((v) => v.eventoId === eventoId && v.voluntarioId);
  if (!comPessoa.length) return "vazia" as const;
  const pendente = comPessoa.some((v) => v.status === "nao_notificado" || v.status === null);
  return pendente ? ("pre" as const) : ("concluida" as const);
}

export function digitosWhatsapp(ddi: string, telefone: string) {
  const d = (ddi || "55").replace(/\D/g, "") || "55";
  let t = telefone.replace(/\D/g, "");
  if (!t) return "";
  if (t.startsWith(d) && t.length >= 12) return t;
  return `${d}${t}`;
}

export function linkWhatsapp(ddi: string, telefone: string, texto: string) {
  const n = digitosWhatsapp(ddi, telefone);
  if (n.length < 12) return "";
  return `https://wa.me/${n}?text=${encodeURIComponent(texto)}`;
}

export function textoEscala(nome: string, evento: Evento, funcao: string) {
  return `Olá, ${nome}! Você está escalado na Comunidade Ágape.\n${evento.nome}\n${fmtQuando(evento.data, evento.hora)}\nFunção: ${funcao}\nSe não puder, avise o líder para pedirmos a troca.`;
}

export function textoCadastro(nome: string, funcao: string) {
  return `Olá, ${nome}! A Comunidade Ágape te cadastrou para servir.\nFunção: ${funcao}\nQuando houver escala, você recebe por aqui a data, o horário e a função.`;
}

export function saudeDaEscala(state: ServirState, dataIso: string) {
  const { start, end } = semanaDe(dataIso);
  return state.voluntarios
    .map((v) => ({ id: v.id, nome: v.nome, dias: diasNaSemana(state, v.id, dataIso) }))
    .filter((v) => v.dias > 0)
    .filter((v) => {
      const atendeSemana = state.eventos.some((e) => e.data >= start && e.data <= end);
      return atendeSemana;
    })
    .sort((a, b) => b.dias - a.dias || a.nome.localeCompare(b.nome, "pt-BR"));
}

export const DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
export const PERIODO_LABEL: Record<Periodo, string> = { manha: "Manhã", tarde: "Tarde", noite: "Noite" };
export const STATUS_LABEL: Record<StatusEscala, string> = {
  nao_notificado: "Não notificado",
  aguardando: "Aguardando confirmação",
  confirmado: "Confirmado",
  troca: "Troca solicitada",
  presente: "Presente",
};
