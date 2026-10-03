const CONFIG = {
  igreja: "Comunidade Cristã Ágape",
  tagline: "Pessoas formadas por Jesus em uma comunidade viva, para amar, servir e transformar a cidade.",
  youtube: {
    channelId: "",
    videoId: "",
    canalUrl: "https://www.youtube.com",
  },
};

const PILARES = [
  { id: "culto", n: "01", nome: "Culto", extra: "Encontro com Deus", tile: "t-violet" },
  { id: "formacao", n: "02", nome: "Discipulado", extra: "Formação contínua", tile: "t-pink" },
  { id: "celulas", n: "03", nome: "Comunidade", extra: "Vida compartilhada", tile: "t-cyan" },
  { id: "lideranca", n: "04", nome: "Liderança", extra: "Multiplicadores", tile: "t-night" },
  { id: "familias", n: "05", nome: "Famílias", extra: "Todas as gerações", tile: "t-lime" },
  { id: "tecnologia", n: "06", nome: "Tecnologia", extra: "Ferramentas da missão", tile: "t-violet" },
];

const MINISTERIOS = [
  {
    id: "jovens",
    nome: "Jovens",
    emoji: "🔥",
    tile: "t-pink",
    tag: "18–35",
    quando: "Sábados · 19h",
    local: "Salão principal",
    texto: "Formação, comunidade, propósito e missão para uma geração relevante na igreja e na sociedade.",
    lider: "Time Jovens",
    proximos: [
      { titulo: "Encontro de jovens", data: "Sáb 19h", extra: "Louvor + palavra" },
      { titulo: "Missão na cidade", data: "Dom 15h", extra: "Ágape Serve" },
    ],
  },
  {
    id: "adolescentes",
    nome: "Adolescentes",
    emoji: "⚡",
    tile: "t-violet",
    tag: "12–17",
    quando: "Sextas · 19h30",
    local: "Sala Geração",
    texto: "Formação, comunidade e discipulado com linguagem de hoje — sem perder o pertencimento quando crescerem.",
    lider: "Time Adolescentes",
    proximos: [
      { titulo: "Sexta da geração", data: "Sex 19h30", extra: "Identidade em Cristo" },
      { titulo: "Retiro", data: "Em breve", extra: "Inscrições abertas" },
    ],
  },
  {
    id: "infantil",
    nome: "Infantil",
    emoji: "🌈",
    tile: "t-lime",
    tag: "0–11",
    quando: "Domingos no culto",
    local: "Kids Hall",
    texto: "Aprendizado bíblico criativo e interativo, formando uma base sólida desde cedo. Pais fazem o check-in no app.",
    lider: "Time Kids",
    checkin: true,
    proximos: [
      { titulo: "Kids no culto", data: "Dom 10h e 18h", extra: "Turmas por idade" },
      { titulo: "Família no parque", data: "Sáb 16h", extra: "Pais + kids" },
    ],
  },
  {
    id: "homens",
    nome: "Homens",
    emoji: "🛠",
    tile: "t-night",
    tag: "Irmãos",
    quando: "1º sáb. do mês · 8h",
    local: "Auditório 2",
    texto: "Irmandade, palavra e propósito: fé, casa e serviço à cidade.",
    lider: "Time Homens",
    proximos: [{ titulo: "Café & Palavra", data: "Sáb 8h", extra: "Café da manhã" }],
  },
  {
    id: "mulheres",
    nome: "Mulheres",
    emoji: "🌸",
    tile: "t-pink",
    tag: "Irmãs",
    quando: "Terças · 20h",
    local: "Salão",
    texto: "Comunidade, oração e formação — um espaço para crescer juntas com propósito.",
    lider: "Time Mulheres",
    proximos: [{ titulo: "Círculo de irmãs", data: "Ter 20h", extra: "Louvor + partilha" }],
  },
  {
    id: "familia",
    nome: "Famílias",
    emoji: "🏠",
    tile: "t-cyan",
    tag: "Gerações",
    quando: "Turmas contínuas",
    local: "Salas de formação",
    texto: "Apoio em todas as fases: namoro, noivos, casais, pais, adolescentes e idosos — com mentoria e convivência entre gerações.",
    lider: "Escola da Família",
    cursos: true,
    proximos: [{ titulo: "Nova turma Casais", data: "Início 12 out", extra: "8 semanas" }],
  },
];

const CELULAS = [
  { id: "c1", nome: "Célula Norte", dia: "Seg", hora: "20h", bairro: "Centro", host: "Ana e Pedro", vagas: 3 },
  { id: "c2", nome: "Célula Jovens", dia: "Ter", hora: "19h30", bairro: "Jardins", host: "Lucas", vagas: 5 },
  { id: "c3", nome: "Célula Famílias", dia: "Qua", hora: "20h", bairro: "Vila Nova", host: "Carla", vagas: 2 },
  { id: "c4", nome: "Célula Mulheres", dia: "Qui", hora: "19h", bairro: "Centro", host: "Bia", vagas: 4 },
  { id: "c5", nome: "Célula Homens", dia: "Sáb", hora: "7h30", bairro: "Parque", host: "Rafa", vagas: 6 },
  { id: "c6", nome: "Célula Geração", dia: "Sex", hora: "18h", bairro: "Jardins", host: "Mari", vagas: 8 },
];

const CURSOS = [
  { id: "n1", nome: "Namoro com propósito", semanas: 6, publico: "Jovens", vagas: 18 },
  { id: "n2", nome: "Noivos Ágape", semanas: 8, publico: "Noivos", vagas: 12 },
  { id: "n3", nome: "Casais em missão", semanas: 8, publico: "Casais", vagas: 20 },
  { id: "n4", nome: "Pais que discipulam", semanas: 5, publico: "Famílias", vagas: 16 },
  { id: "n5", nome: "Finanças com visão bíblica", semanas: 6, publico: "Famílias e jovens", vagas: 24 },
];

const EVENTOS = [
  { titulo: "Culto da família", quando: "Dom 10h · templo", tag: "Culto" },
  { titulo: "Culto da noite", quando: "Dom 18h · templo + online", tag: "Ao vivo" },
  { titulo: "Células em casas", quando: "Durante a semana", tag: "Comunidade" },
  { titulo: "Ágape Serve", quando: "Ações na cidade", tag: "Missão" },
];

const VALORES = [
  { t: "A Palavra", d: "Guarda com fidelidade" },
  { t: "A Comunhão", d: "Cuida de pessoas com presença" },
  { t: "A Oração", d: "Vive em humildade e dependência" },
  { t: "O Amor", d: "Forma e multiplica líderes" },
  { t: "A Missão", d: "Mobiliza a igreja na cidade" },
];

const VISOES = [
  { titulo: "Protótipo 2033", texto: "Seis eixos: culto, discipulado, comunidade, liderança, famílias e tecnologia." },
  { titulo: "A casa em 2033", texto: "Culto, células, gerações, serviço à cidade e tecnologia a serviço das pessoas." },
  { titulo: "O papel do pastor", texto: "De fazer tudo, para formar pessoas que fazem juntas, com propósito." },
  { titulo: "Novas formas de aprender", texto: "Formação digital, híbrida, interativa e personalizada." },
  { titulo: "Famílias e gerações", texto: "Pertencimento, cuidado ao longo da vida e diálogo com a sociedade." },
  { titulo: "Finanças e propósito", texto: "Educação financeira e empreendedora com visão bíblica." },
];

const DIAS = ["Todos", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const state = {
  route: "inicio",
  celulaDia: "Todos",
  inscricao: "",
  checkin: "",
};

const $ = (sel) => document.querySelector(sel);

function youtubeSrc() {
  if (CONFIG.youtube.channelId) {
    return `https://www.youtube.com/embed/live_stream?channel=${CONFIG.youtube.channelId}`;
  }
  if (CONFIG.youtube.videoId) {
    return `https://www.youtube.com/embed/${CONFIG.youtube.videoId}`;
  }
  return "";
}

function go(route, extra = {}) {
  state.route = route;
  Object.assign(state, extra);
  render();
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function Home() {
  return `
    <article class="hero">
      <span class="pill"><span class="pulse"></span> culto · domingo 18h</span>
      <h2>Jesus para toda a vida.</h2>
      <p>Amar, servir e transformar a cidade — juntos, com propósito.</p>
      <div class="row">
        <button class="btn btn-lime" data-go="ao-vivo">Assistir agora</button>
        <button class="btn btn-ghost" data-go="visao">Visão 2033</button>
      </div>
    </article>

    <section class="section">
      <h3>No app</h3>
      <div class="grid2">
        <button class="tile t-violet" data-go="ao-vivo"><span>Conteúdo</span><b>Culto ao vivo</b></button>
        <button class="tile t-pink" data-go="celulas"><span>Grupos</span><b>Achar célula</b></button>
        <button class="tile t-lime" data-go="eventos"><span>Agenda</span><b>Eventos</b></button>
        <button class="tile t-cyan" data-go="oracao"><span>Oração</span><b>Enviar pedido</b></button>
        <button class="tile t-night" data-go="formacao"><span>Acompanhamento</span><b>Discipulado</b></button>
        <button class="tile t-violet" data-go="ministerio" data-id="infantil"><span>Kids</span><b>Check-in</b></button>
      </div>
    </section>

    <section class="section">
      <h3>Gerações</h3>
      <div class="stories">
        ${MINISTERIOS.map(
          (m) => `
          <button class="story" data-go="ministerio" data-id="${m.id}">
            <div class="story-ring">${m.emoji}</div>
            ${m.nome.split(" ")[0]}
          </button>`
        ).join("")}
      </div>
    </section>

    <section class="section">
      <h3>Essa semana</h3>
      <div class="cards">
        ${EVENTOS.slice(0, 3)
          .map(
            (e) => `
          <button class="card" data-go="eventos">
            <h4>${e.titulo}</h4>
            <p class="meta">${e.quando} · ${e.tag}</p>
          </button>`
          )
          .join("")}
      </div>
    </section>
  `;
}

function Live() {
  const src = youtubeSrc();
  const player = src
    ? `<div class="player">
        <iframe
          src="${src}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title="Transmissão Ágape"></iframe>
      </div>`
    : `<article class="hero hero-plain">
        <span class="pill"><span class="pulse"></span> culto presencial e online</span>
        <h2>A transmissão entra no ar domingo 18h.</h2>
        <p>Adoração, Palavra e comunidade para todas as gerações — com qualidade no templo e no app.</p>
      </article>`;
  return `
    <h2 class="brand" style="font-size:18px;margin-bottom:10px">Culto</h2>
    ${player}
    <p class="live-banner"><span class="pulse"></span> Cultos presenciais e on-line, integrados</p>
    <div class="cards">
      <article class="card">
        <h4>Culto da família</h4>
        <p class="meta">Domingo 10h · templo · ambiente para todas as gerações</p>
      </article>
      <article class="card">
        <h4>Culto da noite</h4>
        <p class="meta">Domingo 18h · templo + live · Palavra aplicada</p>
      </article>
      <a class="btn btn-lime" style="justify-content:center" href="${CONFIG.youtube.canalUrl}" target="_blank" rel="noopener">Abrir canal no YouTube</a>
    </div>
  `;
}

function Formacao() {
  return `
    <h2 class="brand" style="font-size:18px">Formação</h2>
    <p class="meta" style="margin:6px 0 14px">Discipulado contínuo e personalizado — trilhas, células e mentoria.</p>
    <div class="grid2">
      ${MINISTERIOS.map(
        (m) => `
        <button class="tile ${m.tile}" data-go="ministerio" data-id="${m.id}">
          <span>${m.emoji} ${m.tag}</span>
          <b>${m.nome}</b>
        </button>`
      ).join("")}
    </div>
    <section class="section">
      <h3>Trilhas</h3>
      <button class="card" data-go="cursos"><h4>Cursos da família e da fé</h4><p class="meta">Namoro, noivos, casais, pais e finanças</p></button>
    </section>
  `;
}

function Ministerio(id) {
  const m = MINISTERIOS.find((x) => x.id === id) || MINISTERIOS[0];
  return `
    <button class="back" data-go="formacao">← formação</button>
    <article class="hero hero-plain">
      <span class="pill">${m.emoji} ${m.tag}</span>
      <h2>${m.nome}</h2>
      <p>${m.quando} · ${m.local}</p>
    </article>
    <section class="section">
      <p>${m.texto}</p>
    </section>
    <section class="section">
      <h3>Liderança</h3>
      <div class="card leader">
        <div class="dot" style="background:linear-gradient(135deg,#1c4aae,var(--gold))">${m.emoji}</div>
        <div><h4>${m.lider}</h4><p class="meta">Mentoria presencial e on-line</p></div>
      </div>
    </section>
    <section class="section">
      <h3>Próximos</h3>
      <div class="cards">
        ${m.proximos
          .map(
            (p) => `<article class="card"><h4>${p.titulo}</h4><p class="meta">${p.data} · ${p.extra}</p></article>`
          )
          .join("")}
      </div>
    </section>
    ${
      m.checkin
        ? `
      <section class="section">
        <h3>Check-in kids</h3>
        <article class="card">
          <p>Pré-selecione as crianças. No templo, mostre o código.</p>
          <form class="form" data-form="checkin">
            <input name="crianca" placeholder="Nome da criança" required />
            <select name="turma">
              <option>Berçário</option>
              <option>Kids 2–5</option>
              <option>Kids 6–11</option>
            </select>
            <button class="btn btn-lime" type="submit">Gerar código</button>
          </form>
          ${state.checkin ? `<p class="toast">${state.checkin}</p>` : ""}
        </article>
      </section>`
        : ""
    }
    ${
      m.cursos
        ? `<button class="btn btn-lime" style="margin-top:16px" data-go="cursos">Ver trilhas da família</button>`
        : m.checkin
          ? ""
          : `
      <form class="form" data-form="quero-ir" data-min="${m.nome}">
        <input name="nome" placeholder="Seu nome" required />
        <button class="btn btn-lime" type="submit">Quero fazer parte</button>
      </form>
      ${state.inscricao ? `<p class="toast">${state.inscricao}</p>` : ""}`
    }
  `;
}

function Celulas() {
  const lista =
    state.celulaDia === "Todos"
      ? CELULAS
      : CELULAS.filter((c) => c.dia === state.celulaDia);
  return `
    <h2 class="brand" style="font-size:18px">Células</h2>
    <p class="meta" style="margin:6px 0 12px">Comunhão, estudo bíblico e apoio prático em grupos menores, no bairro e na cidade.</p>
    <div class="chip-row">
      ${DIAS.map(
        (d) =>
          `<button class="chip ${state.celulaDia === d ? "is-on" : ""}" data-dia="${d}">${d}</button>`
      ).join("")}
    </div>
    <div class="cards">
      ${
        lista.length
          ? lista
              .map(
                (c) => `
          <article class="card">
            <h4>${c.nome}</h4>
            <p class="meta">${c.dia} ${c.hora} · ${c.bairro} · host ${c.host}</p>
            <p class="meta">${c.vagas} vagas</p>
            <form class="form" data-form="celula" data-cel="${c.nome}">
              <input name="nome" placeholder="Seu nome" required />
              <button class="btn btn-ghost" type="submit">Quero essa célula</button>
            </form>
          </article>`
              )
              .join("")
          : `<p class="empty">Nenhuma célula nesse dia ainda.</p>`
      }
    </div>
    ${state.inscricao ? `<p class="toast">${state.inscricao}</p>` : ""}
  `;
}

function Cursos() {
  return `
    <button class="back" data-go="formacao">← formação</button>
    <h2 class="brand" style="font-size:18px">Trilhas</h2>
    <p class="meta" style="margin:6px 0 14px">Formação personalizada: novos convertidos, membros, líderes, casais, pais, jovens e crianças.</p>
    <div class="cards">
      ${CURSOS.map(
        (c) => `
        <article class="card">
          <h4>${c.nome}</h4>
          <p class="meta">${c.semanas} semanas · ${c.publico} · ${c.vagas} vagas</p>
          <form class="form" data-form="curso" data-curso="${c.nome}">
            <input name="nome" placeholder="Seu nome" required />
            <button class="btn btn-lime" type="submit">Inscrever</button>
          </form>
        </article>`
      ).join("")}
    </div>
    ${state.inscricao ? `<p class="toast">${state.inscricao}</p>` : ""}
  `;
}

function Eventos() {
  return `
    <button class="back" data-go="inicio">← início</button>
    <h2 class="brand" style="font-size:18px">Agenda</h2>
    <div class="cards" style="margin-top:12px">
      ${EVENTOS.map(
        (e) => `<article class="card"><h4>${e.titulo}</h4><p class="meta">${e.quando} · ${e.tag}</p></article>`
      ).join("")}
    </div>
  `;
}

function Oracao() {
  return `
    <button class="back" data-go="mais">← mais</button>
    <h2 class="brand" style="font-size:18px">Pedido de oração</h2>
    <p class="meta" style="margin:6px 0 14px">A equipe de oração recebe e caminha com você.</p>
    <article class="card">
      <form class="form" data-form="oracao">
        <input name="nome" placeholder="Seu nome" />
        <textarea name="pedido" rows="4" placeholder="Escreva o pedido." required></textarea>
        <button class="btn btn-lime" type="submit">Enviar</button>
      </form>
      ${state.inscricao ? `<p class="toast">${state.inscricao}</p>` : ""}
    </article>
  `;
}

function Visao() {
  return `
    <button class="back" data-go="mais">← mais</button>
    <h2 class="brand" style="font-size:18px">Visão 2033</h2>
    <p class="meta" style="margin:6px 0 14px">Uma igreja bíblica, relacional, intergeracional e conectada — tecnologia a favor da missão.</p>
    <div class="grid2" style="margin-bottom:16px">
      ${PILARES.map(
        (p) => `
        <article class="tile ${p.tile}">
          <span>${p.n} · ${p.extra}</span>
          <b>${p.nome}</b>
        </article>`
      ).join("")}
    </div>
    <section class="section">
      <h3>Princípios que continuam</h3>
      <div class="values">
        ${VALORES.map((v) => `<article class="value"><b>${v.t}</b>${v.d}</article>`).join("")}
      </div>
    </section>
    <section class="section">
      <h3>Materiais</h3>
      <div class="cards">
        ${VISOES.map(
          (v) => `
          <article class="card">
            <h4>${v.titulo}</h4>
            <p class="meta">${v.texto}</p>
          </article>`
        ).join("")}
      </div>
    </section>
  `;
}

function Lideranca() {
  return `
    <button class="back" data-go="mais">← mais</button>
    <h2 class="brand" style="font-size:18px">Liderança</h2>
    <p class="meta" style="margin:6px 0 14px">O pastor forma pessoas que fazem juntas, com propósito — não faz tudo sozinho.</p>
    <div class="cards">
      <article class="card"><h4>Formação contínua</h4><p class="meta">Líderes em todas as gerações, com mentoria presencial e on-line.</p></article>
      <article class="card"><h4>Equipes autônomas</h4><p class="meta">Clareza de propósito e responsabilidade.</p></article>
      <article class="card"><h4>Cuidado em rede</h4><p class="meta">Líderes, mentores e grupos de apoio — inclusive com ferramentas digitais.</p></article>
    </div>
  `;
}

function Mais() {
  return `
    <h2 class="brand" style="font-size:18px">Mais</h2>
    <div class="cards" style="margin-top:12px">
      <button class="card" data-go="visao"><h4>Visão 2033</h4><p class="meta">Protótipo, gerações, educação e missão na cidade</p></button>
      <button class="card" data-go="oracao"><h4>Pedido de oração</h4><p class="meta">Acompanhamento pastoral</p></button>
      <button class="card" data-go="eventos"><h4>Agenda</h4><p class="meta">Cultos, células e Ágape Serve</p></button>
      <button class="card" data-go="cursos"><h4>Trilhas de formação</h4><p class="meta">Família, fé e finanças</p></button>
      <button class="card" data-go="lideranca"><h4>Liderança</h4><p class="meta">Formar pessoas que fazem juntas</p></button>
      <button class="card" data-go="ministerio" data-id="infantil"><h4>Check-in infantil</h4><p class="meta">Segurança no Kids Hall</p></button>
      <button class="card" data-go="ao-vivo"><h4>Culto online</h4><p class="meta">Presencial e transmissão</p></button>
    </div>
  `;
}

function view() {
  switch (state.route) {
    case "ao-vivo":
      return Live();
    case "formacao":
    case "ministerios":
      return Formacao();
    case "ministerio":
      return Ministerio(state.ministerioId);
    case "celulas":
      return Celulas();
    case "cursos":
      return Cursos();
    case "eventos":
      return Eventos();
    case "oracao":
      return Oracao();
    case "visao":
      return Visao();
    case "lideranca":
      return Lideranca();
    case "tecnologia":
    case "familias":
      return Visao();
    case "mais":
      return Mais();
    default:
      return Home();
  }
}

function render() {
  $("#greeting").textContent = "Comunidade Cristã";
  $("#screen").innerHTML = view();
  document.querySelectorAll(".dock-btn").forEach((b) => {
    const r = b.dataset.go;
    const on =
      r === state.route ||
      (r === "formacao" && (state.route === "ministerio" || state.route === "cursos" || state.route === "ministerios")) ||
      (r === "inicio" && state.route === "eventos") ||
      (r === "mais" && ["mais", "oracao", "visao", "lideranca", "familias", "tecnologia"].includes(state.route));
    b.classList.toggle("is-on", on);
  });
  $("#screen").scrollTop = 0;
}

document.addEventListener("click", (e) => {
  const dia = e.target.closest("[data-dia]");
  if (dia) {
    state.celulaDia = dia.dataset.dia;
    state.inscricao = "";
    render();
    return;
  }
  const nav = e.target.closest("[data-go]");
  if (!nav) return;
  state.inscricao = "";
  state.checkin = "";
  go(nav.dataset.go, { ministerioId: nav.dataset.id || state.ministerioId });
});

document.addEventListener("submit", (e) => {
  const form = e.target.closest("[data-form]");
  if (!form) return;
  e.preventDefault();
  const tipo = form.dataset.form;
  const nome = form.nome?.value?.trim() || form.crianca?.value?.trim() || "";
  if (tipo === "checkin") {
    const code = "AG-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    state.checkin = `Check-in de ${nome} (${form.turma.value}). Código ${code}`;
  } else if (tipo === "oracao") {
    state.inscricao = "Pedido recebido. A gente ora com você.";
    form.reset();
  } else if (tipo === "curso") {
    state.inscricao = `${nome} inscrito(a) em ${form.dataset.curso}.`;
  } else if (tipo === "celula") {
    state.inscricao = `${nome} na lista da ${form.dataset.cel}. O host chama no zap.`;
  } else {
    state.inscricao = `Fechado, ${nome}. O time de ${form.dataset.min} te encontra.`;
  }
  render();
});

render();
