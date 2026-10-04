import { eventos } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { PosterRow } from "@/components/PosterRow";
import { fotos } from "@/lib/fotos";

export default function EventosPage() {
  return (
    <div>
      <PageHeader backHref="/" backLabel="início" kicker="Comunidade" title="Agenda" lead="Cultos, células e missões da semana." />
      <PosterRow
        title="Em cartaz"
        items={eventos.map((e) => ({
          href: "/culto",
          src: fotos[e.foto as keyof typeof fotos],
          title: e.titulo,
          kicker: e.quando,
        }))}
      />
    </div>
  );
}
