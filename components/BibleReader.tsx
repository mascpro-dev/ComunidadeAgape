"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BibliaDesenho } from "@/components/BibliaDesenhos";
import { bibleBooks } from "@/lib/bible-books";
import { temasBiblia, type GrupoBiblia } from "@/lib/biblia-temas";
import { bibleVersions, type BibleVersionId } from "@/lib/bible-versions";
import { loadJson, saveJson } from "@/lib/client-store";
import { devocionais, gruposDevocional } from "@/lib/devocionais";

type Verse = { n: number; texto: string };
const PROG_KEY = "agape-biblia-caps";

export function BibleReader() {
  const [book, setBook] = useState(43);
  const [chapter, setChapter] = useState(1);
  const [versao, setVersao] = useState<BibleVersionId>("almeida");
  const [grupo, setGrupo] = useState<GrupoBiblia>("jovens");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [status, setStatus] = useState("Carregando…");
  const [progresso, setProgresso] = useState<Record<string, number>>({});
  const [agora, setAgora] = useState<Date | null>(null);
  const current = bibleBooks.find((b) => b.n === book)!;
  const versionNome = bibleVersions.find((v) => v.id === versao)?.nome || "Almeida";
  const lista = useMemo(() => devocionais.filter((d) => d.grupo === grupo), [grupo]);
  const tema = temasBiblia[grupo];

  useEffect(() => {
    setAgora(new Date());
    setProgresso(loadJson(PROG_KEY, {} as Record<string, number>));
    const t = setInterval(() => setAgora(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let alive = true;
    setStatus("Carregando…");
    setVerses([]);
    fetch(`/api/biblia?book=${book}&chapter=${chapter}&versao=${versao}`)
      .then(async (r) => {
        const data = await r.json();
        if (!alive) return;
        if (!r.ok) throw new Error(data.error);
        setVerses(data.versiculos);
        setStatus("");
        const next = { ...loadJson(PROG_KEY, {} as Record<string, number>), [String(book)]: chapter };
        saveJson(PROG_KEY, next);
        setProgresso(next);
      })
      .catch(() => {
        if (alive) setStatus("Não foi possível abrir este capítulo nesta versão agora.");
      });
    return () => {
      alive = false;
    };
  }, [book, chapter, versao]);

  function goBook(n: number) {
    setBook(n);
    setChapter(1);
  }

  function abrirLeitura(livro: number, capitulo: number) {
    setBook(livro);
    setChapter(capitulo);
    document.getElementById("leitura")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function pct(n: number, caps: number) {
    const lido = progresso[String(n)] || 0;
    return Math.min(100, Math.round((lido / caps) * 100));
  }

  const ot = bibleBooks.filter((b) => !b.nt).slice(0, 12);
  const nt = bibleBooks.filter((b) => b.nt).slice(0, 12);

  return (
    <div
      className="overflow-hidden rounded-[24px] p-4 text-[15px] md:p-6"
      style={{ background: tema.canvas, color: tema.ink }}
    >
      <div className="grid gap-4 md:grid-cols-[210px_minmax(0,1fr)]">
        <aside className="grid h-fit gap-3">
          <div className="rounded-2xl p-4 text-white" style={{ background: tema.accent }}>
            <p className="font-display text-3xl leading-none">
              {agora ? agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "--:--"}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] opacity-80">
              {agora ? agora.toLocaleDateString("pt-BR", { weekday: "long" }) : "Bíblia"}
            </p>
            <nav className="mt-5 grid gap-1.5 text-[13px]">
              {[
                ["Versículos", "#memorizar"],
                ["Diário", "#diario"],
                ["Antigo Testamento", "#at"],
                ["Novo Testamento", "#nt"],
                ["Leitura", "#leitura"],
              ].map(([t, h]) => (
                <a key={t} href={h} className="opacity-90 hover:opacity-100">
                  {t}
                </a>
              ))}
            </nav>
          </div>

          <div className="rounded-2xl p-4" style={{ background: tema.card }}>
            <p className="text-[12px] font-semibold">Estudo do grupo</p>
            <p className="mt-2 font-display text-xl leading-tight">{tema.estudo}</p>
            <p className="mt-1 text-[12px]" style={{ color: tema.muted }}>
              {tema.quando}
            </p>
          </div>

          <div className="rounded-2xl p-4" style={{ background: tema.card }}>
            <p className="text-[12px] font-semibold">Palavra em áudio</p>
            <p className="mt-1 text-[12px]" style={{ color: tema.muted }}>
              Playlist dos líderes
            </p>
            <Link href="/palavra" className="mt-3 inline-block text-[13px] font-semibold" style={{ color: tema.accent }}>
              Ouvir →
            </Link>
          </div>

          <div className="rounded-2xl p-3" style={{ background: tema.card }}>
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: tema.muted }}>
              Versão
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bibleVersions.map((v) => (
                <button
                  key={v.id}
                  className="rounded-full px-3 py-1.5 text-[12px] font-semibold"
                  style={
                    versao === v.id
                      ? { background: tema.accent, color: "#fff" }
                      : { background: tema.canvas, color: tema.ink }
                  }
                  onClick={() => setVersao(v.id)}
                >
                  {v.nome}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {gruposDevocional.map((g) => {
              const t = temasBiblia[g.id as GrupoBiblia];
              const on = grupo === g.id;
              return (
                <button
                  key={g.id}
                  className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium"
                  style={
                    on
                      ? { background: t.accent, color: "#fff" }
                      : { background: tema.card, color: tema.ink }
                  }
                  onClick={() => setGrupo(g.id as GrupoBiblia)}
                >
                  <BibliaDesenho tipo={t.desenho} color={on ? "#fff" : t.accent} className="h-5 w-5" />
                  {g.nome}
                </button>
              );
            })}
          </div>

          <section id="memorizar" className="rounded-2xl p-4" style={{ background: tema.card }}>
            <p className="mb-3 text-[13px] font-semibold">Memorizar a Palavra</p>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {tema.versiculos.map((v) => (
                <button
                  key={v.ref}
                  onClick={() => abrirLeitura(v.livro, v.cap)}
                  className="rounded-2xl border p-3 text-center"
                  style={{ borderColor: `${tema.accent}33`, background: tema.canvas }}
                >
                  <BibliaDesenho tipo={tema.desenho} color={tema.accent} className="mx-auto h-12 w-12 md:h-16 md:w-16" />
                  <p className="mt-2 font-display text-[15px] md:text-lg">{v.ref}</p>
                  <p className="mt-0.5 text-[11px]" style={{ color: tema.muted }}>
                    {v.linha}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section id="diario" className="rounded-2xl p-4" style={{ background: tema.card }}>
            <p className="mb-3 text-[13px] font-semibold">Diário · {tema.nome}</p>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {lista.slice(0, 3).map((d) => (
                <button
                  key={d.id}
                  onClick={() => abrirLeitura(d.livro, d.capitulo)}
                  className="rounded-2xl border p-3"
                  style={{ borderColor: `${tema.accent}33`, background: tema.canvas }}
                >
                  <BibliaDesenho tipo={tema.desenho} color={tema.accent} className="mx-auto h-14 w-14" />
                  <p className="mt-2 text-center font-display text-sm leading-tight">{d.titulo}</p>
                </button>
              ))}
            </div>
            {lista.map((d) => (
              <article key={d.id} className="mt-3 rounded-2xl p-4" style={{ background: tema.canvas }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: tema.accent }}>
                  {d.referencia}
                </p>
                <h3 className="mt-1 font-display text-2xl">{d.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed">{d.ideia}</p>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-[13px]">
                  {d.pontos.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ol>
                <p className="mt-3 text-sm" style={{ color: tema.accent }}>
                  Para pensar: {d.pergunta}
                </p>
                <p className="mt-1 text-[13px]" style={{ color: tema.muted }}>
                  Oração: {d.oracao}
                </p>
                <button
                  className="mt-3 rounded-full px-4 py-2 text-[13px] font-semibold text-white"
                  style={{ background: tema.accent }}
                  onClick={() => abrirLeitura(d.livro, d.capitulo)}
                >
                  Ler em {versionNome}
                </button>
              </article>
            ))}
          </section>

          <Tracker id="at" titulo="Antigo Testamento" livros={ot} pct={pct} goBook={goBook} tema={tema} />
          <Tracker id="nt" titulo="Novo Testamento" livros={nt} pct={pct} goBook={goBook} tema={tema} />

          <div id="leitura" className="grid gap-3 md:grid-cols-[200px_minmax(0,1fr)]">
            <aside className="max-h-[240px] overflow-y-auto rounded-2xl p-3 md:max-h-[70vh]" style={{ background: tema.card }}>
              {bibleBooks.map((b) => (
                <button
                  key={b.n}
                  onClick={() => goBook(b.n)}
                  className="block w-full rounded-lg px-2 py-1.5 text-left text-[13px]"
                  style={book === b.n ? { background: tema.canvas, color: tema.accent, fontWeight: 600 } : undefined}
                >
                  {b.nome}
                </button>
              ))}
            </aside>
            <section className="rounded-2xl px-5 py-6 md:px-10" style={{ background: tema.card }}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-display text-3xl">
                  {current.nome} {chapter}
                </h2>
                <div className="flex gap-2">
                  <button
                    className="rounded-full px-3 py-2 text-sm"
                    style={{ background: tema.canvas }}
                    disabled={chapter <= 1}
                    onClick={() => setChapter((c) => Math.max(1, c - 1))}
                  >
                    ←
                  </button>
                  <button
                    className="rounded-full px-3 py-2 text-sm"
                    style={{ background: tema.canvas }}
                    disabled={chapter >= current.caps}
                    onClick={() => setChapter((c) => Math.min(current.caps, c + 1))}
                  >
                    →
                  </button>
                </div>
              </div>
              <p className="mb-4 text-[12px]" style={{ color: tema.muted }}>
                {versionNome} · {tema.nome} · Comunidade Cristã Ágape
              </p>
              {status ? (
                <p className="text-sm" style={{ color: tema.muted }}>
                  {status}
                </p>
              ) : null}
              <div className="space-y-3.5">
                {verses.map((v) => (
                  <p key={v.n} className="text-[16px] leading-[1.75]">
                    <sup className="mr-2 text-[11px]" style={{ color: tema.accent }}>
                      {v.n}
                    </sup>
                    {v.texto}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tracker({
  id,
  titulo,
  livros,
  pct,
  goBook,
  tema,
}: {
  id: string;
  titulo: string;
  livros: { n: number; nome: string; caps: number }[];
  pct: (n: number, caps: number) => number;
  goBook: (n: number) => void;
  tema: (typeof temasBiblia)[GrupoBiblia];
}) {
  return (
    <section id={id} className="rounded-2xl p-4" style={{ background: tema.card }}>
      <p className="mb-3 text-[13px] font-semibold">{titulo} · leitura</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {livros.map((b) => {
          const p = pct(b.n, b.caps);
          return (
            <button
              key={b.n}
              onClick={() => goBook(b.n)}
              className="flex flex-col items-center rounded-2xl p-2"
              style={{ background: tema.canvas }}
            >
              <MiniRing pct={p} color={tema.accent} />
              <p className="mt-1 text-center text-[11px] leading-tight">{b.nome}</p>
              <p className="text-[10px]" style={{ color: tema.muted }}>
                {p}%
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MiniRing({ pct, color }: { pct: number; color: string }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90">
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
      />
    </svg>
  );
}
