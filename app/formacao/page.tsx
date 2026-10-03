import Link from "next/link";
import { ministerios } from "@/lib/content";

export default function FormacaoPage() {
  return (
    <div>
      <h1 className="text-lg font-extrabold uppercase tracking-wider">Formação</h1>
      <p className="mb-3.5 mt-1.5 text-xs text-muted">
        Discipulado contínuo e personalizado — trilhas, células e mentoria.
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {ministerios.map((m) => (
          <Link key={m.id} href={`/formacao/${m.id}`} className={`tile ${m.tone}`}>
            <span>
              {m.emoji} {m.tag}
            </span>
            <b>{m.nome}</b>
          </Link>
        ))}
      </div>
      <section className="mt-6">
        <h2 className="section-label">Trilhas</h2>
        <Link href="/cursos" className="card block">
          <h3 className="font-semibold">Cursos da família e da fé</h3>
          <p className="meta">Namoro, noivos, casais, pais e finanças</p>
        </Link>
      </section>
    </div>
  );
}
