import { PageHeader } from "@/components/PageHeader";

export default function LiderancaPage() {
  return (
    <div>
      <PageHeader
        backHref="/mais"
        backLabel="mais"
        kicker="Multiplicar"
        title="Liderança"
        lead="O pastor forma pessoas que fazem juntas, com propósito — não faz tudo sozinho."
      />
      <div className="grid gap-3 md:grid-cols-3">
        <article className="card">
          <h3 className="font-display text-2xl">Formação contínua</h3>
          <p className="meta">Líderes em todas as gerações, com mentoria presencial e on-line.</p>
        </article>
        <article className="card">
          <h3 className="font-display text-2xl">Equipes autônomas</h3>
          <p className="meta">Clareza de propósito e responsabilidade.</p>
        </article>
        <article className="card">
          <h3 className="font-display text-2xl">Cuidado em rede</h3>
          <p className="meta">Líderes, mentores e grupos de apoio — inclusive com ferramentas digitais.</p>
        </article>
      </div>
    </div>
  );
}
