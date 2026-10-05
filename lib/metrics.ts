export const LEADER_PIN = "agape2033";
export const MEMBROS_KEY = "agape-membros";
export const RELATORIOS_KEY = "agape-relatorios";
export const MEU_PERFIL_KEY = "agape-meu-id";

export const estadosCivis = [
  { id: "solteiro", label: "Solteiro(a)" },
  { id: "casado", label: "Casado(a)" },
  { id: "uniao", label: "Morando junto" },
  { id: "separado", label: "Separado(a)" },
  { id: "viuvo", label: "Viúvo(a)" },
] as const;

export type EstadoCivil = (typeof estadosCivis)[number]["id"];

export type FuncaoId = "painel" | "relatorios" | "pessoas" | "liberar" | "audios";

export const FUNCOES: { id: FuncaoId; label: string }[] = [
  { id: "painel", label: "Painel de métricas" },
  { id: "relatorios", label: "Enviar relatórios" },
  { id: "pessoas", label: "Ver cadastros" },
  { id: "liberar", label: "Liberar funções" },
  { id: "audios", label: "Publicar áudios" },
];

export type Membro = {
  id: string;
  nome: string;
  cpf: string;
  endereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  email?: string;
  senhaHash?: string;
  principal?: boolean;
  funcoes?: FuncaoId[];
  celula: string;
  querIndicacao: boolean;
  convertido: boolean;
  cursos: string;
  temFilhos: boolean;
  qtdFilhos: number;
  estadoCivil: EstadoCivil;
  tempoCasado: string;
  atualizado: string;
  foto?: string;
};

export const ADMIN_PRINCIPAL: Membro = {
  id: "adm-marcelo",
  nome: "Marcelo Conelheiros",
  cpf: "313.527.834-84",
  endereco: "Rua Presidente Vargas, 67 - apto 102",
  bairro: "Salgado Filho",
  cep: "17501-550",
  cidade: "Marília-SP",
  email: "conelheiros@gmail.com",
  senhaHash: "b747bc6099dbdf7b1ad799a25856627f61e9b883806844e020192b0a2f46ebb5",
  principal: true,
  funcoes: FUNCOES.map((f) => f.id),
  celula: "Não frequento",
  querIndicacao: false,
  convertido: true,
  cursos: "",
  temFilhos: false,
  qtdFilhos: 0,
  estadoCivil: "solteiro",
  tempoCasado: "",
  atualizado: "02/10/2026",
};

export function temFuncao(m: Membro | undefined, fn: FuncaoId) {
  if (!m) return false;
  if (m.principal) return true;
  return (m.funcoes || []).includes(fn);
}

export function garantirAdmin(lista: Membro[]) {
  const salvo = lista.find((m) => m.id === ADMIN_PRINCIPAL.id || m.email === ADMIN_PRINCIPAL.email);
  const outros = lista.filter((m) => m.id !== ADMIN_PRINCIPAL.id && m.email !== ADMIN_PRINCIPAL.email);
  return [
    {
      ...ADMIN_PRINCIPAL,
      ...salvo,
      id: ADMIN_PRINCIPAL.id,
      email: ADMIN_PRINCIPAL.email,
      principal: true,
      funcoes: ADMIN_PRINCIPAL.funcoes,
      senhaHash: salvo?.senhaHash || ADMIN_PRINCIPAL.senhaHash,
    },
    ...outros,
  ];
}

export type Relatorio = {
  id: string;
  ministerio: string;
  lider: string;
  periodo: string;
  presentes: number;
  visitantes: number;
  decisoes: number;
  observacao: string;
  quando: string;
};

export const ministeriosPainel = [
  "Culto",
  "Células",
  "Jovens",
  "Adolescentes",
  "Infantil",
  "Homens",
  "Mulheres",
  "Famílias",
  "Ágape Serve",
  "Universidade da Família",
];

export const seedMembros: Membro[] = [
  {
    id: "m1",
    nome: "Ana Souza",
    cpf: "529.982.247-25",
    endereco: "Rua das Palmeiras, 120",
    bairro: "Centro",
    cep: "87010-000",
    cidade: "Maringá",
    celula: "Célula Norte",
    querIndicacao: false,
    convertido: true,
    cursos: "Namoro com propósito; Casais em missão",
    temFilhos: true,
    qtdFilhos: 2,
    estadoCivil: "casado",
    tempoCasado: "8 anos",
    atualizado: "01/10/2026",
  },
  {
    id: "m2",
    nome: "Lucas Ferreira",
    cpf: "390.533.447-05",
    endereco: "Av. Brasil, 890",
    bairro: "Jardins",
    cep: "87020-120",
    cidade: "Maringá",
    celula: "Célula Universitários",
    querIndicacao: false,
    convertido: true,
    cursos: "Namoro com propósito",
    temFilhos: false,
    qtdFilhos: 0,
    estadoCivil: "solteiro",
    tempoCasado: "",
    atualizado: "28/09/2026",
  },
  {
    id: "m3",
    nome: "Carla Mendes",
    cpf: "153.509.460-56",
    endereco: "Rua XV, 45",
    bairro: "Vila Nova",
    cep: "87030-200",
    cidade: "Maringá",
    celula: "Não frequento",
    querIndicacao: true,
    convertido: false,
    cursos: "",
    temFilhos: true,
    qtdFilhos: 1,
    estadoCivil: "separado",
    tempoCasado: "",
    atualizado: "30/09/2026",
  },
  {
    id: "m4",
    nome: "Rafael Lima",
    cpf: "073.581.050-01",
    endereco: "Rua do Parque, 12",
    bairro: "Parque",
    cep: "87040-010",
    cidade: "Maringá",
    celula: "Célula Homens",
    querIndicacao: false,
    convertido: true,
    cursos: "Finanças com visão bíblica; Pais que discipulam",
    temFilhos: true,
    qtdFilhos: 3,
    estadoCivil: "casado",
    tempoCasado: "12 anos",
    atualizado: "02/10/2026",
  },
  {
    id: "m5",
    nome: "Bia Oliveira",
    cpf: "864.215.790-03",
    endereco: "Alameda Santos, 300",
    bairro: "Centro",
    cep: "87010-310",
    cidade: "Maringá",
    celula: "Célula Mulheres",
    querIndicacao: false,
    convertido: true,
    cursos: "Noivos Ágape; Casais em missão",
    temFilhos: false,
    qtdFilhos: 0,
    estadoCivil: "uniao",
    tempoCasado: "2 anos",
    atualizado: "25/09/2026",
  },
];

export const seedRelatorios: Relatorio[] = [
  {
    id: "r1",
    ministerio: "Culto",
    lider: "Equipe de culto",
    periodo: "Setembro 2026",
    presentes: 420,
    visitantes: 38,
    decisoes: 7,
    observacao: "Culto da família com transmissão; noite no templo às 19h.",
    quando: "01/10/2026",
  },
  {
    id: "r2",
    ministerio: "Células",
    lider: "Rede de hosts",
    periodo: "Setembro 2026",
    presentes: 186,
    visitantes: 22,
    decisoes: 4,
    observacao: "Três células pediram indicação de novos membros.",
    quando: "01/10/2026",
  },
  {
    id: "r3",
    ministerio: "Infantil",
    lider: "Time Kids",
    periodo: "Setembro 2026",
    presentes: 64,
    visitantes: 9,
    decisoes: 0,
    observacao: "Check-in no app acelerou a entrada no Kids Hall.",
    quando: "30/09/2026",
  },
  {
    id: "r4",
    ministerio: "Jovens",
    lider: "Time Jovens",
    periodo: "Setembro 2026",
    presentes: 91,
    visitantes: 14,
    decisoes: 3,
    observacao: "Missão na cidade no domingo à tarde.",
    quando: "29/09/2026",
  },
  {
    id: "r5",
    ministerio: "Universidade da Família",
    lider: "Escola da Família",
    periodo: "Setembro 2026",
    presentes: 48,
    visitantes: 6,
    decisoes: 0,
    observacao: "Turma de casais e finanças em andamento.",
    quando: "28/09/2026",
  },
];

export function parseCursos(cursos: string) {
  return cursos
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
}

export function maskCpf(cpf: string) {
  const d = cpf.replace(/\D/g, "");
  if (d.length < 4) return cpf;
  return `***.***.***-${d.slice(-2)}`;
}

export function summarize(membros: Membro[], relatorios: Relatorio[]) {
  const total = membros.length;
  const convertidos = membros.filter((m) => m.convertido).length;
  const semCelula = membros.filter((m) => m.celula === "Não frequento");
  const querem = semCelula.filter((m) => m.querIndicacao);
  const comFilhos = membros.filter((m) => m.temFilhos);
  const filhos = comFilhos.reduce((n, m) => n + m.qtdFilhos, 0);
  const porCelula: Record<string, number> = {};
  const porCivil: Record<string, number> = {};
  const porCurso: Record<string, number> = {};
  for (const m of membros) {
    porCelula[m.celula] = (porCelula[m.celula] || 0) + 1;
    porCivil[m.estadoCivil] = (porCivil[m.estadoCivil] || 0) + 1;
    for (const c of parseCursos(m.cursos)) porCurso[c] = (porCurso[c] || 0) + 1;
  }
  const porMinisterio = ministeriosPainel.map((nome) => {
    const rs = relatorios.filter((r) => r.ministerio === nome);
    return {
      nome,
      presentes: rs.reduce((n, r) => n + r.presentes, 0),
      visitantes: rs.reduce((n, r) => n + r.visitantes, 0),
      decisoes: rs.reduce((n, r) => n + r.decisoes, 0),
      relatorios: rs.length,
    };
  });
  return {
    total,
    convertidos,
    naoConvertidos: total - convertidos,
    semCelula: semCelula.length,
    queremIndicacao: querem.length,
    comFilhos: comFilhos.length,
    filhos,
    porCelula,
    porCivil,
    porCurso,
    porMinisterio,
  };
}
