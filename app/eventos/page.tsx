import Link from "next/link";
import { eventos } from "@/lib/content";

export default function EventosPage() {
  return (
    <div>
      <Link href="/" className="mb-2.5 inline-block text-sm font-bold text-gold">
        ← início
      </Link>
      <h1 className="text-lg font-extrabold uppercase tracking-wider">Agenda</h1>
      <div className="mt-3 grid gap-2.5">
        {eventos.map((e) => (
          <article key={e.titulo} className="card">
            <h3 className="font-semibold">{e.titulo}</h3>
            <p className="meta">
              {e.quando} · {e.tag}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
