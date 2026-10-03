export const bibleVersions = [
  { id: "almeida", nome: "Almeida", bolls: "ALM", bibleApi: "almeida" },
  { id: "naa", nome: "NAA", bolls: "NAA" },
  { id: "ntlh", nome: "NTLH", bolls: "NTLH" },
] as const;

export type BibleVersionId = (typeof bibleVersions)[number]["id"];
