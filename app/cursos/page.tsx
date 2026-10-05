import { PosterRow } from "@/components/PosterRow";
import { cursos } from "@/lib/content";
import { fotoCapa } from "@/lib/fotos";
import { PageHeader } from "@/components/PageHeader";

export default function CursosPage() {
  return (
    <div>
      <PageHeader
        backHref="/formacao"
        backLabel="formação"
        kicker="Escola"
        title="Trilhas"
        lead="Toque no curso da sua geração. Cada card abre a landing daquela turma — não uma lista misturada."
      />
      <PosterRow
        title="Em cartaz"
        items={cursos.map((c) => ({
          href: `/cursos/${c.id}`,
          src: fotoCapa(c.capa),
          title: c.nome,
          kicker: `${c.semanas} sem`,
        }))}
      />
    </div>
  );
}
