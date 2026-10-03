"use client";

import { useEffect, useState } from "react";
import { bibleBooks } from "@/lib/bible-books";

type Verse = { n: number; texto: string };

export function BibleReader() {
  const [book, setBook] = useState(43);
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [status, setStatus] = useState("Carregando…");
  const current = bibleBooks.find((b) => b.n === book)!;

  useEffect(() => {
    let alive = true;
    setStatus("Carregando…");
    setVerses([]);
    fetch(`/api/biblia?book=${book}&chapter=${chapter}`)
      .then(async (r) => {
        const data = await r.json();
        if (!alive) return;
        if (!r.ok) throw new Error(data.error);
        setVerses(data.versiculos);
        setStatus("");
      })
      .catch(() => {
        if (alive) setStatus("Não foi possível abrir este capítulo agora.");
      });
    return () => {
      alive = false;
    };
  }, [book, chapter]);

  function goBook(n: number) {
    setBook(n);
    setChapter(1);
  }

  return (
    <div className="md:grid md:grid-cols-[220px_1fr] md:gap-8">
      <aside className="mb-6 max-h-[240px] overflow-y-auto rounded-2xl border border-white/10 p-3 md:mb-0 md:max-h-[70vh]">
        <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-muted">Antigo Testamento</p>
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
        <p className="mb-2 mt-4 text-[11px] uppercase tracking-[0.16em] text-muted">Novo Testamento</p>
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

      <section>
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="font-display text-3xl">
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
        <p className="mb-4 text-[12px] text-muted">Almeida · leitura online da Comunidade Ágape</p>
        {status ? <p className="text-sm text-muted">{status}</p> : null}
        <div className="space-y-3">
          {verses.map((v) => (
            <p key={v.n} className="text-[16px] leading-relaxed">
              <sup className="mr-2 text-[11px] text-gold">{v.n}</sup>
              {v.texto}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
