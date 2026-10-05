import { agendaEventos } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { PosterRow } from "@/components/PosterRow";
import { loadBannerOverrides } from "@/lib/banners";
import { fotoCapa } from "@/lib/fotos";

export default async function EventosPage() {
  const extras = await loadBannerOverrides();
  const eventos = agendaEventos();
  return (
    <div>
      <PageHeader backHref="/" backLabel="início" kicker="Comunidade" title="Agenda" lead="Cultos, células e missões da semana." />
      <PosterRow
        title="Em cartaz"
        items={eventos.map((e) => ({
          href: "/culto",
          src: fotoCapa(e.foto, extras),
          title: e.titulo,
          kicker: e.quando,
        }))}
      />
    </div>
  );
}
