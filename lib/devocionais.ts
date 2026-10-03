export type Devocional = {
  id: string;
  grupo: string;
  titulo: string;
  referencia: string;
  livro: number;
  capitulo: number;
  versos: string;
  ideia: string;
  pontos: string[];
  pergunta: string;
  oracao: string;
};

export const gruposDevocional = [
  { id: "jovens", nome: "Jovens" },
  { id: "adolescentes", nome: "Adolescentes" },
  { id: "infantil", nome: "Infantil" },
  { id: "homens", nome: "Homens" },
  { id: "mulheres", nome: "Mulheres" },
  { id: "familia", nome: "Família" },
  { id: "empresario", nome: "Empresário" },
] as const;

export const devocionais: Devocional[] = [
  {
    id: "j1",
    grupo: "jovens",
    titulo: "Chamado com propósito",
    referencia: "Jeremias 29.11-13",
    livro: 24,
    capitulo: 29,
    versos: "11–13",
    ideia: "Deus não improvisa o seu futuro. Ele forma caráter, vocação e missão no meio da cidade.",
    pontos: [
      "O plano de Deus não é só ‘dar certo’: é relacionar-se com Ele.",
      "Buscar a Deus de todo o coração é decisão diária, não só no culto.",
      "Propósito aparece no chamado e no serviço — igreja, estudos, trabalho e amizades.",
      "Sua geração é relevante quando vive santidade com linguagem de hoje.",
    ],
    pergunta: "Onde, nesta semana, você pode buscar a Deus de verdade — e não só pedir um resultado?",
    oracao: "Senhor, ensina-me a te buscar de todo o coração e a viver o propósito que o Senhor já preparou.",
  },
  {
    id: "a1",
    grupo: "adolescentes",
    titulo: "Identidade em Cristo",
    referencia: "1 Timóteo 4.12",
    livro: 54,
    capitulo: 4,
    versos: "12",
    ideia: "Idade não é desculpa. Jesus forma identidade agora: palavra, conduta, amor, fé e pureza.",
    pontos: [
      "Você não precisa ‘esperar crescer’ para ser exemplo.",
      "Redes, escola e casa são palco da fé — não só o culto de sexta.",
      "Amigos influenciam; escolha quem te aproxima de Jesus.",
      "Pertencimento na igreja agora evita distanciamento depois.",
    ],
    pergunta: "Em qual destas áreas (palavra, conduta, amor, fé, pureza) você quer crescer este mês?",
    oracao: "Jesus, forma minha identidade em ti. Que eu seja exemplo na minha idade, com coragem e verdade.",
  },
  {
    id: "i1",
    grupo: "infantil",
    titulo: "Jesus é o bom amigo",
    referencia: "Marcos 10.13-16",
    livro: 41,
    capitulo: 10,
    versos: "13–16",
    ideia: "Jesus gosta das crianças. Ele abençoa, escuta e quer que elas fiquem pertinho Dele.",
    pontos: [
      "Jesus não manda criança embora — Ele chama para perto.",
      "Orar é conversar com Deus, como se fala com um amigo.",
      "Obedecer papai, mamãe e professores também é um jeito de amar a Jesus.",
      "Podemos contar para um amigo que Jesus nos ama.",
    ],
    pergunta: "Hoje, o que você pode falar para Jesus na oração?",
    oracao: "Jesus, obrigado porque tu me amas. Ajuda-me a ser teu amigo e a ser bondoso com as outras crianças. Amém.",
  },
  {
    id: "h1",
    grupo: "homens",
    titulo: "Fé, casa e cidade",
    referencia: "Josué 24.15",
    livro: 6,
    capitulo: 24,
    versos: "15",
    ideia: "Liderar a casa não é mandar: é servir. A decisão de servir ao Senhor começa no homem e abençoa a família.",
    pontos: [
      "Escolher o Senhor é escolha pública e privada — no trabalho e na sala de casa.",
      "Palavra, oração e presença valem mais do que conserto de última hora.",
      "Irmandade fortalece: nenhum homem cresce sozinho.",
      "Integridade no serviço e nas finanças é culto a Deus.",
    ],
    pergunta: "O que precisa mudar esta semana para a sua casa perceber: ‘nós serviremos ao Senhor’?",
    oracao: "Pai, faz de mim um homem que serve. Que minha casa, meu trabalho e minha igreja vejam Jesus em mim.",
  },
  {
    id: "w1",
    grupo: "mulheres",
    titulo: "Força que vem do Senhor",
    referencia: "Provérbios 31.25-26",
    livro: 20,
    capitulo: 31,
    versos: "25–26",
    ideia: "A força da mulher de Deus não é pressa: é caráter, sabedoria e palavra bondosa, com propósito.",
    pontos: [
      "Dignidade e segurança vêm de quem você é em Cristo, não da opinião alheia.",
      "A boca que ensina com sabedoria edifica casa, célula e amizades.",
      "Cuidar de pessoas com presença é ministério — não ‘resto de tempo’.",
      "Comunidade de irmãs é lugar de oração, formação e missão juntas.",
    ],
    pergunta: "A quem você pode falar uma palavra sábia e bondosa hoje?",
    oracao: "Senhor, veste-me de força e dignidade. Que minha boca ensine com amor e minha vida aponte para Jesus.",
  },
  {
    id: "f1",
    grupo: "familia",
    titulo: "Casa que discipula",
    referencia: "Deuteronômio 6.6-7",
    livro: 5,
    capitulo: 6,
    versos: "6–7",
    ideia: "A fé não fica só no templo. Pais e filhos aprendem a Palavra no caminho, à mesa e na hora de dormir.",
    pontos: [
      "Discipulado em casa é conversa contínua, não só um evento.",
      "Gerações diferentes podem aprender umas com as outras.",
      "Casamento, criação dos filhos e cuidado dos mais velhos entram no mesmo propósito.",
      "Célula e Universidade da Família reforçam o que começa no lar.",
    ],
    pergunta: "Qual horário desta semana a família pode reservar para ler um versículo juntos?",
    oracao: "Deus, escreve a tua Palavra no coração da nossa casa. Ensina-nos a amar, servir e crescer juntos.",
  },
  {
    id: "e1",
    grupo: "empresario",
    titulo: "Trabalho com visão bíblica",
    referencia: "Colossenses 3.23-24",
    livro: 51,
    capitulo: 3,
    versos: "23–24",
    ideia: "Empresa, vendas e gestão também são altar. Servimos ao Senhor quando tratamos pessoas e recursos com integridade.",
    pontos: [
      "Trabalho não é ‘vida secular’ separado da fé: é vocação.",
      "Generosidade, contentamento e planejamento honram a Deus.",
      "Mentoria entre empreendedores edifica — sem transformar a igreja em mercado.",
      "Decisões justas no caixa, na equipe e no cliente testemunham Jesus na cidade.",
    ],
    pergunta: "Qual decisão da sua semana de trabalho precisa passar antes pela Palavra e pela oração?",
    oracao: "Senhor, que meu trabalho te sirva. Dá-me sabedoria, mãos limpas e um coração generoso na cidade.",
  },
];
