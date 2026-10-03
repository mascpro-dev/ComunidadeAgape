"use client";

import { useState } from "react";
import { ActionForm } from "./ActionForm";
import { celulas, dias } from "@/lib/content";

export function CelulasList() {
  const [dia, setDia] = useState<(typeof dias)[number]>("Todos");
  const lista = dia === "Todos" ? celulas : celulas.filter((c) => c.dia === dia);

  return (
    <>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {dias.map((d) => (
          <button
            key={d}
            onClick={() => setDia(d)}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-sm ${
              dia === d ? "border-transparent bg-gold font-bold text-[#1a1408]" : "border-white/10 bg-white/5"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="grid gap-2.5">
        {lista.length ? (
          lista.map((c) => (
            <article key={c.id} className="card">
              <h4 className="text-base font-semibold">{c.nome}</h4>
              <p className="meta">
                {c.dia} {c.hora} · {c.bairro} · host {c.host}
              </p>
              <p className="meta">{c.vagas} vagas</p>
              <ActionForm kind="celula" extra={c.nome} button="Quero essa célula" ghost />
            </article>
          ))
        ) : (
          <p className="text-sm text-muted">Nenhuma célula nesse dia ainda.</p>
        )}
      </div>
    </>
  );
}
