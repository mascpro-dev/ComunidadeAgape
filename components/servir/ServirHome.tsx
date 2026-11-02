"use client";

import Link from "next/link";
import { fmtData, fmtQuando, patchConfig, situacaoEvento } from "@/lib/servir";
import { Modal } from "./Modal";
import { useServir } from "./ServirProvider";
import { usePodeEscalas } from "./usePodeEscalas";

const SITUACAO = {
  vazia: "Sem escala",
  pre: "Pré-escala",
  concluida: "Concluída",
};

export function ServirHome() {
  const { state, commit } = useServir();
  const { ready, pode } = usePodeEscalas();
  const eu = state.voluntarios.find((v) => v.id === state.config.euVoluntarioId);
  const minhas = state.vagas
    .filter((v) => eu && v.voluntarioId === eu.id)
    .map((v) => ({ vaga: v, evento: state.eventos.find((e) => e.id === v.eventoId) }))
    .filter((item) => item.evento)
    .sort((a, b) => a.evento!.data.localeCompare(b.evento!.data) || a.evento!.hora.localeCompare(b.evento!.hora));
  const proximos = state.eventos
    .slice()
    .sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora))
    .slice(0, 6);

  return (
    <div>
      {ready && pode && !state.config.tourVisto ? (
        <Modal title="Bem-vindo ao Servir" onClose={() => commit((s) => patchConfig(s, { tourVisto: true }))}>
          <p className="text-sm leading-relaxed text-muted">
            Este canto organiza quem serve nos cultos. O caminho é organização, depois as pessoas, depois a escala.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/servir/organizacao" className="btn-gold" onClick={() => commit((s) => patchConfig(s, { tourVisto: true }))}>
              Vamos lá
            </Link>
            <button type="button" className="btn-ghost" onClick={() => commit((s) => patchConfig(s, { tourVisto: true }))}>
              Já conheço
            </button>
          </div>
        </Modal>
      ) : null}

      <header className="mb-6">
        <h1 className="font-display text-4xl leading-none">Servir</h1>
        <p className="page-lead">Quem está no culto, em qual função, e o aviso que sai no WhatsApp.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="grid gap-3">
          <div className="flex items-end justify-between gap-3">
            <h2 className="section-label mb-0">Próximos cultos</h2>
            {pode ? (
              <Link href="/servir/escalas" className="text-sm text-gold">
                Escala rápida →
              </Link>
            ) : null}
          </div>
          {proximos.length === 0 ? (
            <article className="card">
              <p className="font-display text-2xl">Nenhum culto criado</p>
              <p className="meta">
                {pode
                  ? "A escala começa por um evento. Departamentos e funções já estão prontos."
                  : "Quando alguém com a função Fazer escalas criar um culto, ele aparece aqui."}
              </p>
              {pode ? (
                <Link href="/servir/escalas" className="btn-gold mt-4">
                  Criar evento
                </Link>
              ) : null}
            </article>
          ) : (
            proximos.map((evento) => {
              const corpo = (
                <>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{SITUACAO[situacaoEvento(state, evento.id)]}</p>
                  <p className="mt-1 font-display text-2xl leading-tight">{evento.nome}</p>
                  <p className="meta">{fmtQuando(evento.data, evento.hora)}</p>
                </>
              );
              return pode ? (
                <Link key={evento.id} href={`/servir/escalas/${evento.id}`} className="card block hover:border-gold/30">
                  {corpo}
                </Link>
              ) : (
                <article key={evento.id} className="card">
                  {corpo}
                </article>
              );
            })
          )}
        </section>

        <aside className="card h-fit">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Sua escala</p>
          {!eu ? (
            <>
              <p className="mt-3 font-display text-2xl leading-tight">Você ainda não está escalado</p>
              <p className="meta">Quando uma pessoa for marcada como “este sou eu”, os cultos dela aparecem aqui.</p>
            </>
          ) : minhas.length === 0 ? (
            <>
              <p className="mt-3 font-display text-2xl leading-tight">{eu.nome}</p>
              <p className="meta">Nenhuma escala neste nome ainda.</p>
            </>
          ) : (
            <ul className="mt-3 grid gap-3">
              {minhas.map(({ vaga, evento }) => {
                const corpo = (
                  <>
                    <p className="text-sm font-medium">{evento!.nome}</p>
                    <p className="text-[13px] text-muted">
                      {fmtData(evento!.data)} · {vaga.rotulo}
                    </p>
                  </>
                );
                return (
                  <li key={vaga.id}>
                    {pode ? (
                      <Link href={`/servir/escalas/${evento!.id}`} className="block">
                        {corpo}
                      </Link>
                    ) : (
                      corpo
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
