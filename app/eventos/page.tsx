import { eventos } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { CardPhoto } from "@/components/CardPhoto";
import { fotos } from "@/lib/fotos";

export default function EventosPage() {
  return (
    <div>
      <PageHeader backHref="/" backLabel="início" kicker="Casa" title="Agenda" lead="Cultos, células e missões da semana." />
      <div className="grid gap-3 md:grid-cols-2">
        {eventos.map((e) => (
          <article key={e.titulo} className="card overflow-hidden p-0">
            <CardPhoto src={fotos[e.foto as keyof typeof fotos]} alt={e.titulo} className="h-40" />
            <div className="p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{e.tag}</p>
              <h3 className="mt-1 font-display text-2xl">{e.titulo}</h3>
              <p className="meta">{e.quando}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
