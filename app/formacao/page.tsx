import Link from "next/link";
import { ministerios } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { CardPhoto } from "@/components/CardPhoto";
import { fotos } from "@/lib/fotos";

export default function FormacaoPage() {
  return (
    <div>
      <PageHeader
        kicker="Discipulado"
        title="Formação"
        lead="Trilhas, células e mentoria — contínuas e personalizadas para cada geração."
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {ministerios.map((m) => (
          <Link key={m.id} href={`/formacao/${m.id}`} className="card min-h-[120px] overflow-hidden p-0">
            <CardPhoto src={fotos[m.id as keyof typeof fotos] || fotos.familia} alt={m.nome} className="h-28" />
            <div className="p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{m.tag}</p>
              <h2 className="font-display text-[28px] leading-none">{m.nome}</h2>
              <p className="meta">{m.quando}</p>
            </div>
          </Link>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="section-label">Trilhas</h2>
        <Link href="/cursos" className="card block md:max-w-xl">
          <h3 className="font-display text-2xl">Cursos da família e da fé</h3>
          <p className="meta">Namoro, noivos, casais, pais e finanças</p>
        </Link>
      </section>
    </div>
  );
}
