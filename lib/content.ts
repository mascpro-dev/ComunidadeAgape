export const church = {
  name: "Comunidade Cristã Ágape",
  shortName: "Ágape",
  tagline:
    "Pessoas formadas por Jesus em uma comunidade viva, para amar, servir e transformar a cidade.",
  pastorShift: "De fazer tudo, para formar pessoas que fazem juntas, com propósito.",
  youtubeUrl: "https://www.youtube.com",
  youtubeChannelId: "",
  youtubeVideoId: "",
};

export const pilares = [
  { n: "01", nome: "Culto", extra: "Encontro com Deus", tone: "from-[#2a5bb8] to-[#0a2460]" },
  { n: "02", nome: "Discipulado", extra: "Formação contínua", tone: "from-[#3d6fd4] to-[#12245a]" },
  { n: "03", nome: "Comunidade", extra: "Vida compartilhada", tone: "from-[#7eb6ff] to-[#1a4a8c]" },
  { n: "04", nome: "Liderança", extra: "Multiplicadores", tone: "from-[#16305f] to-[#071433]" },
  { n: "05", nome: "Famílias", extra: "Todas as gerações", tone: "from-[#e4d3a2] to-[#8a7340] text-[#1a1408]" },
  { n: "06", nome: "Tecnologia", extra: "Ferramentas da missão", tone: "from-[#2a5bb8] to-[#0a2460]" },
];

export type Ministerio = {
  id: string;
  nome: string;
  emoji: string;
  tag: string;
  quando: string;
  local: string;
  texto: string;
  lider: string;
  tone: string;
  proximos: { titulo: string; data: string; extra: string }[];
  checkin?: boolean;
  cursos?: boolean;
};

export const ministerios: Ministerio[] = [
  {
    id: "jovens",
    nome: "Jovens",
    emoji: "🔥",
    tag: "18–35",
    quando: "Sábados · 19h",
    local: "Salão principal",
    texto: "Formação, comunidade, propósito e missão para uma geração relevante na igreja e na sociedade.",
    lider: "Time Jovens",
    tone: "from-[#2a5bb8] to-[#0a2460]",
    proximos: [
      { titulo: "Encontro de jovens", data: "Sáb 19h", extra: "Louvor + palavra" },
      { titulo: "Missão na cidade", data: "Dom 15h", extra: "Ágape Serve" },
    ],
  },
  {
    id: "adolescentes",
    nome: "Adolescentes",
    emoji: "⚡",
    tag: "12–17",
    quando: "Sextas · 19h30",
    local: "Sala Geração",
    texto: "Formação, comunidade e discipulado com linguagem de hoje — sem perder o pertencimento quando crescerem.",
    lider: "Time Adolescentes",
    tone: "from-[#3d6fd4] to-[#12245a]",
    proximos: [
      { titulo: "Sexta da geração", data: "Sex 19h30", extra: "Identidade em Cristo" },
      { titulo: "Retiro", data: "Em breve", extra: "Inscrições abertas" },
    ],
  },
  {
    id: "infantil",
    nome: "Infantil",
    emoji: "🌈",
    tag: "0–11",
    quando: "Domingos no culto",
    local: "Kids Hall",
    texto: "Aprendizado bíblico criativo e interativo, formando uma base sólida desde cedo. Pais fazem o check-in no app.",
    lider: "Time Kids",
    checkin: true,
    tone: "from-[#e4d3a2] to-[#8a7340] text-[#1a1408]",
    proximos: [
      { titulo: "Kids no culto", data: "Dom 10h e 18h", extra: "Turmas por idade" },
      { titulo: "Família no parque", data: "Sáb 16h", extra: "Pais + kids" },
    ],
  },
  {
    id: "homens",
    nome: "Homens",
    emoji: "🛠",
    tag: "Irmãos",
    quando: "1º sáb. do mês · 8h",
    local: "Auditório 2",
    texto: "Irmandade, palavra e propósito: fé, casa e serviço à cidade.",
    lider: "Time Homens",
    tone: "from-[#16305f] to-[#071433]",
    proximos: [{ titulo: "Café & Palavra", data: "Sáb 8h", extra: "Café da manhã" }],
  },
  {
    id: "mulheres",
    nome: "Mulheres",
    emoji: "🌸",
    tag: "Irmãs",
    quando: "Terças · 20h",
    local: "Salão",
    texto: "Comunidade, oração e formação — um espaço para crescer juntas com propósito.",
    lider: "Time Mulheres",
    tone: "from-[#2a5bb8] to-[#0a2460]",
    proximos: [{ titulo: "Círculo de irmãs", data: "Ter 20h", extra: "Louvor + partilha" }],
  },
  {
    id: "familia",
    nome: "Famílias",
    emoji: "🏠",
    tag: "Gerações",
    quando: "Turmas contínuas",
    local: "Salas de formação",
    texto: "Apoio em todas as fases: namoro, noivos, casais, pais, adolescentes e idosos — com mentoria e convivência entre gerações.",
    lider: "Escola da Família",
    cursos: true,
    tone: "from-[#7eb6ff] to-[#1a4a8c] text-[#041218]",
    proximos: [{ titulo: "Nova turma Casais", data: "Início 12 out", extra: "8 semanas" }],
  },
];

export const celulas = [
  { id: "c1", nome: "Célula Norte", dia: "Seg", hora: "20h", bairro: "Centro", host: "Ana e Pedro", vagas: 3 },
  { id: "c2", nome: "Célula Jovens", dia: "Ter", hora: "19h30", bairro: "Jardins", host: "Lucas", vagas: 5 },
  { id: "c3", nome: "Célula Famílias", dia: "Qua", hora: "20h", bairro: "Vila Nova", host: "Carla", vagas: 2 },
  { id: "c4", nome: "Célula Mulheres", dia: "Qui", hora: "19h", bairro: "Centro", host: "Bia", vagas: 4 },
  { id: "c5", nome: "Célula Homens", dia: "Sáb", hora: "7h30", bairro: "Parque", host: "Rafa", vagas: 6 },
  { id: "c6", nome: "Célula Geração", dia: "Sex", hora: "18h", bairro: "Jardins", host: "Mari", vagas: 8 },
];

export const cursos = [
  { id: "n1", nome: "Namoro com propósito", semanas: 6, publico: "Jovens", vagas: 18 },
  { id: "n2", nome: "Noivos Ágape", semanas: 8, publico: "Noivos", vagas: 12 },
  { id: "n3", nome: "Casais em missão", semanas: 8, publico: "Casais", vagas: 20 },
  { id: "n4", nome: "Pais que discipulam", semanas: 5, publico: "Famílias", vagas: 16 },
  { id: "n5", nome: "Finanças com visão bíblica", semanas: 6, publico: "Famílias e jovens", vagas: 24 },
];

export const eventos = [
  { titulo: "Culto da família", quando: "Dom 10h · templo", tag: "Culto" },
  { titulo: "Culto da noite", quando: "Dom 18h · templo + online", tag: "Ao vivo" },
  { titulo: "Células em casas", quando: "Durante a semana", tag: "Comunidade" },
  { titulo: "Ágape Serve", quando: "Ações na cidade", tag: "Missão" },
];

export const valores = [
  { t: "A Palavra", d: "Guarda com fidelidade" },
  { t: "A Comunhão", d: "Cuida de pessoas com presença" },
  { t: "A Oração", d: "Vive em humildade e dependência" },
  { t: "O Amor", d: "Forma e multiplica líderes" },
  { t: "A Missão", d: "Mobiliza a igreja na cidade" },
];

export const visoes = [
  { titulo: "Protótipo 2033", texto: "Seis eixos: culto, discipulado, comunidade, liderança, famílias e tecnologia." },
  { titulo: "A casa em 2033", texto: "Culto, células, gerações, serviço à cidade e tecnologia a serviço das pessoas." },
  { titulo: "O papel do pastor", texto: "De fazer tudo, para formar pessoas que fazem juntas, com propósito." },
  { titulo: "Novas formas de aprender", texto: "Formação digital, híbrida, interativa e personalizada." },
  { titulo: "Famílias e gerações", texto: "Pertencimento, cuidado ao longo da vida e diálogo com a sociedade." },
  { titulo: "Finanças e propósito", texto: "Educação financeira e empreendedora com visão bíblica." },
];

export const dias = ["Todos", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;

export function youtubeSrc() {
  if (church.youtubeChannelId) {
    return `https://www.youtube.com/embed/live_stream?channel=${church.youtubeChannelId}`;
  }
  if (church.youtubeVideoId) {
    return `https://www.youtube.com/embed/${church.youtubeVideoId}`;
  }
  return "";
}
