import { church, casa2033, frutosCasa, indicadores, pilares, principios, rodas } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";

export default function VisaoPage() {
  return (
    <div>
      <PageHeader kicker="Protótipo 2033" title="Visão" lead={church.visaoIgreja} />

      <p className="mb-8 font-display text-2xl text-gold md:text-3xl">{church.tagline}</p>

      <section>
        <h2 className="section-label">Princípios que continuam</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {principios.map((v) => (
            <article key={v.t} className="rounded-2xl border border-white/10 p-4">
              <b className="mb-2 block font-display text-xl text-ink">{v.t}</b>
              <p className="text-[13px] text-muted">{v.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="section-label">Como funciona em 2033</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pilares.map((p) => (
            <article key={p.n} className="card">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold">
                {p.n} · {p.extra}
              </p>
              <h3 className="mt-2 font-display text-[28px] leading-none">{p.nome}</h3>
              <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-[#d7e2f8]">
                {p.como.map((item) => (
                  <li key={item} className="border-l border-gold/40 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="section-label">A casa em 2033</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {casa2033.map((c) => (
            <article key={c.titulo} className="card">
              <h3 className="font-display text-2xl">{c.titulo}</h3>
              <p className="meta">{c.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="section-label">Rodas do futuro</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {rodas.map((r) => (
            <Link key={r.slug} href={`/visao/${r.slug}`} className="card block">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold">
                Roda {r.numero} · {r.area}
              </p>
              <h3 className="mt-2 font-display text-2xl">{r.centro}</h3>
              <p className="meta line-clamp-3">{r.resumo}</p>
            </Link>
          ))}
        </div>
        <Link href="/lideranca" className="card mt-3 block">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Pastor e líder</p>
          <h3 className="mt-2 font-display text-2xl">O papel em 2033</h3>
          <p className="meta">{church.pastorShift}</p>
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="section-label">Indicadores de saúde</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {indicadores.map((i) => (
            <article key={i} className="rounded-2xl border border-white/10 px-4 py-3 text-sm">
              {i}
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-[50ch] text-sm text-muted">Resultado esperado: {church.resultado}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {frutosCasa.map((f) => (
            <span key={f} className="rounded-full border border-gold/30 px-3 py-1 text-[12px] text-gold">
              {f}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
