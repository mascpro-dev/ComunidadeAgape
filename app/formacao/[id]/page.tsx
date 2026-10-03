import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/ActionForm";
import { ministerios } from "@/lib/content";

export default async function MinisterioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = ministerios.find((x) => x.id === id);
  if (!m) notFound();

  return (
    <div>
      <Link href="/formacao" className="mb-2.5 inline-block text-sm font-bold text-gold">
        ← formação
      </Link>
      <article className="hero min-h-[150px]">
        <span className="pill">
          {m.emoji} {m.tag}
        </span>
        <h1 className="text-[26px] font-extrabold">{m.nome}</h1>
        <p className="mt-2 text-sm text-[#d7e2f8]">
          {m.quando} · {m.local}
        </p>
      </article>
      <p className="mt-4 text-sm">{m.texto}</p>
      <section className="mt-6">
        <h2 className="section-label">Liderança</h2>
        <div className="card flex items-center gap-2.5">
          <div className="grid h-[42px] w-[42px] place-items-center rounded-2xl bg-gradient-to-br from-[#1c4aae] to-gold text-lg">
            {m.emoji}
          </div>
          <div>
            <h3 className="font-semibold">{m.lider}</h3>
            <p className="meta">Mentoria presencial e on-line</p>
          </div>
        </div>
      </section>
      <section className="mt-6">
        <h2 className="section-label">Próximos</h2>
        <div className="grid gap-2.5">
          {m.proximos.map((p) => (
            <article key={p.titulo} className="card">
              <h3 className="font-semibold">{p.titulo}</h3>
              <p className="meta">
                {p.data} · {p.extra}
              </p>
            </article>
          ))}
        </div>
      </section>
      {m.checkin ? (
        <section className="mt-6">
          <h2 className="section-label">Check-in kids</h2>
          <article className="card">
            <p>Pré-selecione as crianças. No templo, mostre o código.</p>
            <ActionForm kind="checkin" button="Gerar código" />
          </article>
        </section>
      ) : m.cursos ? (
        <Link href="/cursos" className="btn-gold mt-4">
          Ver trilhas da família
        </Link>
      ) : (
        <ActionForm kind="quero-ir" extra={m.nome} button="Quero fazer parte" />
      )}
    </div>
  );
}
