import { ActionForm } from "@/components/ActionForm";
import { PosterRow } from "@/components/PosterRow";
import { cursos } from "@/lib/content";
import { fotos } from "@/lib/fotos";
import { PageHeader } from "@/components/PageHeader";

const capa: Record<string, keyof typeof fotos> = {
  n1: "jovens",
  n2: "familia",
  n3: "familia",
  n4: "mulheres",
  n5: "homens",
};

export default function CursosPage() {
  return (
    <div>
      <PageHeader
        backHref="/formacao"
        backLabel="formação"
        kicker="Escola"
        title="Trilhas"
        lead="Formação personalizada: novos convertidos, membros, líderes, casais, pais, jovens e crianças."
      />
      <PosterRow
        title="Em cartaz"
        items={cursos.map((c) => ({
          href: `#${c.id}`,
          src: fotos[capa[c.id] || "familia"],
          title: c.nome,
          kicker: `${c.semanas} semanas`,
        }))}
      />
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {cursos.map((c) => (
          <article key={c.id} id={c.id} className="card">
            <h3 className="font-display text-2xl">{c.nome}</h3>
            <p className="meta">
              {c.semanas} semanas · {c.publico} · {c.vagas} vagas
            </p>
            <ActionForm kind="curso" extra={c.nome} button="Inscrever" />
          </article>
        ))}
      </div>
    </div>
  );
}
