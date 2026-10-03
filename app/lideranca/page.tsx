import Link from "next/link";

export default function LiderancaPage() {
  return (
    <div>
      <Link href="/mais" className="mb-2.5 inline-block text-sm font-bold text-gold">
        ← mais
      </Link>
      <h1 className="text-lg font-extrabold uppercase tracking-wider">Liderança</h1>
      <p className="mb-3.5 mt-1.5 text-xs text-muted">
        O pastor forma pessoas que fazem juntas, com propósito — não faz tudo sozinho.
      </p>
      <div className="grid gap-2.5">
        <article className="card">
          <h3 className="font-semibold">Formação contínua</h3>
          <p className="meta">Líderes em todas as gerações, com mentoria presencial e on-line.</p>
        </article>
        <article className="card">
          <h3 className="font-semibold">Equipes autônomas</h3>
          <p className="meta">Clareza de propósito e responsabilidade.</p>
        </article>
        <article className="card">
          <h3 className="font-semibold">Cuidado em rede</h3>
          <p className="meta">Líderes, mentores e grupos de apoio — inclusive com ferramentas digitais.</p>
        </article>
      </div>
    </div>
  );
}
