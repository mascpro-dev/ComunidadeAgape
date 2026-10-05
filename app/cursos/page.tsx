import { PosterRow } from "@/components/PosterRow";
import { cursos } from "@/lib/content";
import { fotoCapa } from "@/lib/fotos";
import { PageHeader } from "@/components/PageHeader";

const destaques = ["cr1", "hb1", "ig1", "mw1", "hm1", "hm5", "ff1", "gf4", "gf6", "cr6"];

export default function CursosPage() {
  const emCartaz = destaques
    .map((id) => cursos.find((c) => c.id === id))
    .filter((c): c is (typeof cursos)[number] => Boolean(c));

  return (
    <div className="pb-28 md:pb-8">
      <PageHeader
        backHref="/formacao"
        backLabel="formação"
        kicker="Escola"
        title="Trilhas"
        lead="Toque no curso da sua geração. Cada card abre a landing daquela turma — não uma lista misturada."
      />
      <PosterRow
        title="Em cartaz"
        size="lg"
        items={emCartaz.map((c) => ({
          href: `/cursos/${c.id}`,
          src: fotoCapa(c.capa),
          title: c.nome,
          kicker: c.semanas >= 2 ? `${c.semanas} semanas` : "Fim de semana",
        }))}
      />
    </div>
  );
}
