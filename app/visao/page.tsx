import { pilares, valores, visoes } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";

export default function VisaoPage() {
  return (
    <div>
      <PageHeader
        backHref="/mais"
        backLabel="mais"
        kicker="2033"
        title="Visão"
        lead="Uma igreja bíblica, relacional, intergeracional e conectada — tecnologia a favor da missão."
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {pilares.map((p) => (
          <article key={p.n} className="card min-h-[120px]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-gold">
              {p.n} · {p.extra}
            </p>
            <h2 className="mt-6 font-display text-[28px] leading-none">{p.nome}</h2>
          </article>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="section-label">Princípios que continuam</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {valores.map((v) => (
            <article key={v.t} className="rounded-2xl border border-white/10 p-4">
              <b className="mb-2 block font-display text-xl text-ink">{v.t}</b>
              <p className="text-[13px] text-muted">{v.d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="section-label">Materiais</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {visoes.map((v) => (
            <article key={v.titulo} className="card">
              <h3 className="font-display text-2xl">{v.titulo}</h3>
              <p className="meta">{v.texto}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
