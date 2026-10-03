import { ActionForm } from "@/components/ActionForm";
import { cursos } from "@/lib/content";
import Link from "next/link";

export default function CursosPage() {
  return (
    <div>
      <Link href="/formacao" className="mb-2.5 inline-block text-sm font-bold text-gold">
        ← formação
      </Link>
      <h1 className="text-lg font-extrabold uppercase tracking-wider">Trilhas</h1>
      <p className="mb-3.5 mt-1.5 text-xs text-muted">
        Formação personalizada: novos convertidos, membros, líderes, casais, pais, jovens e crianças.
      </p>
      <div className="grid gap-2.5">
        {cursos.map((c) => (
          <article key={c.id} className="card">
            <h3 className="font-semibold">{c.nome}</h3>
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
