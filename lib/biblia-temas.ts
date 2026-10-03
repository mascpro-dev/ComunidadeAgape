export type GrupoBiblia = "jovens" | "adolescentes" | "infantil" | "homens" | "mulheres" | "familia" | "empresario";

export type TemaBiblia = {
  id: GrupoBiblia;
  nome: string;
  canvas: string;
  ink: string;
  muted: string;
  accent: string;
  card: string;
  desenho: "fogo" | "estrela" | "pomba" | "escudo" | "rosa" | "casa" | "bussola";
  estudo: string;
  quando: string;
  versiculos: { ref: string; livro: number; cap: number; linha: string }[];
};

export const temasBiblia: Record<GrupoBiblia, TemaBiblia> = {
  jovens: {
    id: "jovens",
    nome: "Jovens",
    canvas: "#eef0ff",
    ink: "#1c1840",
    muted: "#5c5878",
    accent: "#6b5bff",
    card: "#ffffff",
    desenho: "fogo",
    estudo: "Grupo de jovens — Palavra e missão",
    quando: "Sexta · 20h · templo",
    versiculos: [
      { ref: "Jr 29.11", livro: 24, cap: 29, linha: "Planos de paz e futuro" },
      { ref: "Fp 4.6", livro: 50, cap: 4, linha: "Não andeis ansiosos" },
      { ref: "Rm 12.1", livro: 45, cap: 12, linha: "Culto racional" },
    ],
  },
  adolescentes: {
    id: "adolescentes",
    nome: "Adolescentes",
    canvas: "#fff1ea",
    ink: "#3a1c12",
    muted: "#8a5a48",
    accent: "#ff6b3d",
    card: "#ffffff",
    desenho: "estrela",
    estudo: "Geração Ágape — identidade em Cristo",
    quando: "Sábado · 16h · templo",
    versiculos: [
      { ref: "1 Tm 4.12", livro: 54, cap: 4, linha: "Sê o exemplo" },
      { ref: "Sl 119.9", livro: 19, cap: 119, linha: "Como guardar o caminho" },
      { ref: "Pv 3.5", livro: 20, cap: 3, linha: "Confia de todo o coração" },
    ],
  },
  infantil: {
    id: "infantil",
    nome: "Infantil",
    canvas: "#eaf6ff",
    ink: "#12324a",
    muted: "#4d738c",
    accent: "#3d9adf",
    card: "#ffffff",
    desenho: "pomba",
    estudo: "Kids Hall — Jesus, o bom amigo",
    quando: "Domingo · 10h · Kids Hall",
    versiculos: [
      { ref: "Mc 10.14", livro: 41, cap: 10, linha: "Deixai as crianças" },
      { ref: "Sl 23.1", livro: 19, cap: 23, linha: "O Senhor é o meu pastor" },
      { ref: "Jo 3.16", livro: 43, cap: 3, linha: "Deus amou o mundo" },
    ],
  },
  homens: {
    id: "homens",
    nome: "Homens",
    canvas: "#e8eef6",
    ink: "#142033",
    muted: "#5a6a80",
    accent: "#2f5f9a",
    card: "#ffffff",
    desenho: "escudo",
    estudo: "Homens Ágape — caráter e liderança",
    quando: "Sábado · 8h · templo",
    versiculos: [
      { ref: "Js 1.9", livro: 6, cap: 1, linha: "Sê forte e corajoso" },
      { ref: "Mq 6.8", livro: 33, cap: 6, linha: "Agir com justiça" },
      { ref: "1 Co 16.13", livro: 46, cap: 16, linha: "Portai-vos varonilmente" },
    ],
  },
  mulheres: {
    id: "mulheres",
    nome: "Mulheres",
    canvas: "#f8eef2",
    ink: "#3a1824",
    muted: "#8a5a68",
    accent: "#c45c7a",
    card: "#ffffff",
    desenho: "rosa",
    estudo: "Mulheres Ágape — presença e cuidado",
    quando: "Terça · 19h30 · templo",
    versiculos: [
      { ref: "Pv 31.25", livro: 20, cap: 31, linha: "Força e dignidade" },
      { ref: "Lc 10.42", livro: 42, cap: 10, linha: "A boa parte" },
      { ref: "Is 40.31", livro: 23, cap: 40, linha: "Renovar as forças" },
    ],
  },
  familia: {
    id: "familia",
    nome: "Família",
    canvas: "#f6f0e2",
    ink: "#2c2414",
    muted: "#7a6a48",
    accent: "#c4a35a",
    card: "#ffffff",
    desenho: "casa",
    estudo: "Famílias — altar em casa",
    quando: "Domingo · 10h · culto da família",
    versiculos: [
      { ref: "Js 24.15", livro: 6, cap: 24, linha: "Eu e a minha casa" },
      { ref: "Dt 6.7", livro: 5, cap: 6, linha: "Ensina-os a teus filhos" },
      { ref: "Ef 5.25", livro: 49, cap: 5, linha: "Amai as vossas mulheres" },
    ],
  },
  empresario: {
    id: "empresario",
    nome: "Empresário",
    canvas: "#e6f4f1",
    ink: "#12332e",
    muted: "#4d736c",
    accent: "#2a9d8f",
    card: "#ffffff",
    desenho: "bussola",
    estudo: "Marketplace — fé no trabalho",
    quando: "Mensal · café da manhã",
    versiculos: [
      { ref: "Pv 16.3", livro: 20, cap: 16, linha: "Confia ao Senhor as obras" },
      { ref: "Cl 3.23", livro: 51, cap: 3, linha: "Fazei de todo o coração" },
      { ref: "Mt 6.33", livro: 40, cap: 6, linha: "Buscai primeiro o Reino" },
    ],
  },
};
