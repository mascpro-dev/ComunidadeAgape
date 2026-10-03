import { church, pastor2033, pastorHoje, pastorMudancas, pastorValores } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";

export default function LiderancaPage() {
  return (
    <div>
      <PageHeader
        backHref="/visao"
        backLabel="visão"
        kicker="O papel do pastor / líder"
        title="Em 2033"
        lead={church.pastorShift}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <article className="card">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Hoje · modelo atual</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pastorHoje.map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-[13px] text-muted">
                {t}
              </span>
            ))}
          </div>
        </article>
        <article className="card">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">2033 · novo papel</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pastor2033.map((t) => (
              <span key={t} className="rounded-full border border-gold/40 px-3 py-1 text-[13px] text-gold">
                {t}
              </span>
            ))}
          </div>
        </article>
      </div>

      <section className="mt-10">
        <h2 className="section-label">As seis mudanças</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pastorMudancas.map((m) => (
            <article key={m.de} className="card">
              <h3 className="font-display text-2xl leading-tight">{m.de}</h3>
              <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-muted">Hoje</p>
              <p className="mt-1 text-sm text-[#d7e2f8]">{m.hoje}</p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-gold">Em 2033</p>
              <p className="mt-1 text-sm text-ink">{m.futuro}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="section-label">O que não muda</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {pastorValores.map((v) => (
            <p key={v} className="rounded-2xl border border-white/10 px-4 py-3 text-sm">
              {v}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
