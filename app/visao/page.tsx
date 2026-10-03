import Link from "next/link";
import { pilares, valores, visoes } from "@/lib/content";

export default function VisaoPage() {
  return (
    <div>
      <Link href="/mais" className="mb-2.5 inline-block text-sm font-bold text-gold">
        ← mais
      </Link>
      <h1 className="text-lg font-extrabold uppercase tracking-wider">Visão 2033</h1>
      <p className="mb-3.5 mt-1.5 text-xs text-muted">
        Uma igreja bíblica, relacional, intergeracional e conectada — tecnologia a favor da missão.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-2.5">
        {pilares.map((p) => (
          <article key={p.n} className={`tile ${p.tone}`}>
            <span className="text-sm opacity-90">
              {p.n} · {p.extra}
            </span>
            <b>{p.nome}</b>
          </article>
        ))}
      </div>
      <section className="mt-6">
        <h2 className="section-label">Princípios que continuam</h2>
        <div className="grid grid-cols-2 gap-2">
          {valores.map((v) => (
            <article key={v.t} className="rounded-[14px] border border-white/10 p-2.5 text-xs text-muted">
              <b className="mb-1 block text-[13px] text-ink">{v.t}</b>
              {v.d}
            </article>
          ))}
        </div>
      </section>
      <section className="mt-6">
        <h2 className="section-label">Materiais</h2>
        <div className="grid gap-2.5">
          {visoes.map((v) => (
            <article key={v.titulo} className="card">
              <h3 className="font-semibold">{v.titulo}</h3>
              <p className="meta">{v.texto}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
