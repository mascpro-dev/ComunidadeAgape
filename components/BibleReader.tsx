"use client";

import { useEffect, useMemo, useState } from "react";
import { bibleBooks } from "@/lib/bible-books";
import { bibleVersions, type BibleVersionId } from "@/lib/bible-versions";
import { devocionais, gruposDevocional } from "@/lib/devocionais";

type Verse = { n: number; texto: string };

export function BibleReader() {
  const [book, setBook] = useState(43);
  const [chapter, setChapter] = useState(1);
  const [versao, setVersao] = useState<BibleVersionId>("almeida");
  const [grupo, setGrupo] = useState<(typeof gruposDevocional)[number]["id"]>("jovens");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [status, setStatus] = useState("Carregando…");
  const current = bibleBooks.find((b) => b.n === book)!;
  const versionNome = bibleVersions.find((v) => v.id === versao)?.nome || "Almeida";
  const lista = useMemo(() => devocionais.filter((d) => d.grupo === grupo), [grupo]);

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
    if (typeof window !== "undefined") {
      document.getElementById("leitura")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="md:mx-auto md:max-w-6xl">
      <div className="frame mb-6 flex flex-wrap gap-2 p-3 md:p-4">
        {bibleVersions.map((v) => (
          <button key={v.id} className={versao === v.id ? "btn-gold" : "btn-ghost"} onClick={() => setVersao(v.id)}>
            {v.nome}
          </button>
        ))}
      </div>

      <section className="frame mb-8 p-4 md:p-6">
        <h2 className="section-label">Devocional por ministério</h2>
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {gruposDevocional.map((g) => (
            <button
              key={g.id}
              className={`whitespace-nowrap rounded-full border px-3 py-2 text-[13px] ${
                grupo === g.id ? "border-transparent bg-gold font-semibold text-[#1a1408]" : "border-white/10"
              }`}
              onClick={() => setGrupo(g.id)}
            >
              {g.nome}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {lista.map((d) => (
            <article key={d.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{d.referencia}</p>
              <h3 className="mt-1 font-display text-2xl">{d.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#d7e2f8]">{d.ideia}</p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14px] leading-relaxed">
                {d.pontos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-gold">Para pensar: {d.pergunta}</p>
              <p className="meta mt-2">Oração: {d.oracao}</p>
              <button className="btn-gold mt-4" onClick={() => abrirLeitura(d.livro, d.capitulo)}>
                Ler {d.referencia} em {versionNome}
              </button>
            </article>
          ))}
        </div>
      </section>

      <div id="leitura" className="md:grid md:grid-cols-[240px_minmax(0,1fr)] md:items-start md:gap-8">
        <aside className="frame mb-6 max-h-[240px] overflow-y-auto p-3 md:sticky md:top-24 md:mb-0 md:max-h-[calc(100vh-8rem)]">
          <p className="mb-2 px-1 text-[11px] uppercase tracking-[0.16em] text-muted">Antigo Testamento</p>
          {bibleBooks
            .filter((b) => !b.nt)
            .map((b) => (
              <button
                key={b.n}
                onClick={() => goBook(b.n)}
                className={`block w-full rounded-lg px-2 py-1.5 text-left text-[13px] ${
                  book === b.n ? "bg-white/10 text-gold" : "text-[#d7e2f8]"
                }`}
              >
                {b.nome}
              </button>
            ))}
          <p className="mb-2 mt-4 px-1 text-[11px] uppercase tracking-[0.16em] text-muted">Novo Testamento</p>
          {bibleBooks
            .filter((b) => b.nt)
            .map((b) => (
              <button
                key={b.n}
                onClick={() => goBook(b.n)}
                className={`block w-full rounded-lg px-2 py-1.5 text-left text-[13px] ${
                  book === b.n ? "bg-white/10 text-gold" : "text-[#d7e2f8]"
                }`}
              >
                {b.nome}
              </button>
            ))}
        </aside>

        <section className="frame px-5 py-6 md:px-12 md:py-10">
          <div className="mx-auto max-w-[42rem]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-display text-3xl md:text-4xl">
                {current.nome} {chapter}
              </h2>
              <div className="flex gap-2">
                <button
                  className="btn-ghost px-3 py-2"
                  disabled={chapter <= 1}
                  onClick={() => setChapter((c) => Math.max(1, c - 1))}
                >
                  ←
                </button>
                <button
                  className="btn-ghost px-3 py-2"
                  disabled={chapter >= current.caps}
                  onClick={() => setChapter((c) => Math.min(current.caps, c + 1))}
                >
                  →
                </button>
              </div>
            </div>
            <p className="mb-6 text-[12px] text-muted">{versionNome} · Comunidade Cristã Ágape</p>
            {status ? <p className="text-sm text-muted">{status}</p> : null}
            <div className="space-y-3.5">
              {verses.map((v) => (
                <p key={v.n} className="text-[16px] leading-[1.75] md:text-[17px]">
                  <sup className="mr-2 text-[11px] text-gold">{v.n}</sup>
                  {v.texto}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
