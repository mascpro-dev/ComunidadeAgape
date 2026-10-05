"use client";

import { useEffect, useMemo, useState } from "react";
import { ActionForm } from "./ActionForm";
import { PosterRow } from "./PosterRow";
import { loadMe } from "@/lib/agape-db";
import { celulaMaisPerto } from "@/lib/celula-proxima";
import { celulas, dias } from "@/lib/content";
import { fotos } from "@/lib/fotos";

function capaDe(capa: string) {
  return fotos[capa as keyof typeof fotos] || fotos.celulas;
}

export function CelulasList() {
  const [dia, setDia] = useState<(typeof dias)[number]>("Todos");
  const [sel, setSel] = useState(celulas[0].id);
  const [perto, setPerto] = useState("");
  const lista = dia === "Todos" ? celulas : celulas.filter((c) => c.dia === dia);
  const atual = useMemo(() => lista.find((c) => c.id === sel) || lista[0], [lista, sel]);

  useEffect(() => {
    let alive = true;
    loadMe()
      .then((me) => celulaMaisPerto(me))
      .then((id) => {
        if (!alive || !id) return;
        setPerto(id);
        setSel(id);
      })
      .catch(() => {
        if (alive) setSel(celulas[0].id);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {dias.map((d) => (
          <button
            key={d}
            onClick={() => {
              setDia(d);
              const next = d === "Todos" ? celulas : celulas.filter((c) => c.dia === d);
              if (next[0] && !next.some((c) => c.id === sel)) setSel(next[0].id);
            }}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-sm ${
              dia === d ? "border-transparent bg-gold font-bold text-[#1a1408]" : "border-white/10 bg-white/5"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {atual ? (
        <article className="relative min-h-[240px] overflow-hidden rounded-[24px] md:min-h-[380px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={capaDe(atual.capa)} alt={atual.nome} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030b1f] via-[#030b1f]/60 to-black/20" />
          <div className="relative z-10 flex min-h-[240px] flex-col justify-end p-5 md:min-h-[380px] md:max-w-xl md:p-10">
            <span className="pill">
              {atual.id === perto ? "Mais perto do seu endereço · " : ""}
              {atual.dia} {atual.hora} · {atual.bairro}
            </span>
            <h2 className="font-display mt-3 text-[34px] font-semibold leading-tight md:text-5xl">{atual.nome}</h2>
            <p className="mt-2 text-sm text-[#d7e2f8] md:text-base">
              Host {atual.host} · {atual.vagas} vagas
            </p>
            <div className="mt-4 max-w-sm">
              <ActionForm kind="celula" extra={atual.nome} celulaId={atual.id} button="Quero essa célula" />
            </div>
          </div>
        </article>
      ) : (
        <p className="text-sm text-muted">Nenhuma célula nesse dia ainda.</p>
      )}

      {lista.length ? (
        <PosterRow
          title={dia === "Todos" ? "Todas as células" : `Células de ${dia}`}
          items={lista.map((c) => ({
            src: capaDe(c.capa),
            title: c.nome,
            kicker: c.id === perto ? "Mais perto" : `${c.dia} ${c.hora}`,
            selected: atual?.id === c.id,
            onSelect: () => setSel(c.id),
          }))}
        />
      ) : null}
    </>
  );
}
