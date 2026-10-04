export const mobileTabs = [
  { href: "/", label: "Início" },
  { href: "/biblia", label: "Bíblia" },
  { href: "/formacao", label: "Formação" },
  { href: "/culto", label: "Culto" },
  { href: "/mais", label: "Mais" },
] as const;

export const desktopNav = [
  { href: "/", label: "Início" },
  { href: "/culto", label: "Culto" },
  { href: "/biblia", label: "Bíblia" },
  { href: "/comunidade", label: "Comunidade" },
  { href: "/formacao", label: "Gerações" },
  { href: "/palavra", label: "Áudios" },
  { href: "/celulas", label: "Células" },
  { href: "/perfil", label: "Perfil" },
  { href: "/dashboard", label: "Painel" },
  { href: "/visao", label: "Visão" },
] as const;

const tabHrefs = new Set(["/", "/culto", "/biblia"]);

export const maisMenu = desktopNav.filter((item) => !tabHrefs.has(item.href));
