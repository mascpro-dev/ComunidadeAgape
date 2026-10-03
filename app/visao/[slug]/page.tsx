import { notFound } from "next/navigation";
import { rodas } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";

export default async function RodaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roda = rodas.find((r) => r.slug === slug);
  if (!roda) notFound();

  return (
    <div>
      <PageHeader
        backHref="/visao"
        backLabel="visão"
        kicker={`Roda do futuro ${roda.numero} · ${roda.area}`}
        title={roda.centro}
        lead={roda.resumo}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {roda.itens.map((item) => (
          <article key={item.n} className="card">
            <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{item.n}</p>
            <h2 className="mt-2 font-display text-2xl leading-tight">{item.titulo}</h2>
            <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-[#d7e2f8]">
              {item.notas.map((n) => (
                <li key={n} className="border-l border-gold/40 pl-3">
                  {n}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
