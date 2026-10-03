import { ActionForm } from "@/components/ActionForm";
import { cursos } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";

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
      <div className="grid gap-3 md:grid-cols-2">
        {cursos.map((c) => (
          <article key={c.id} className="card">
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
