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
      <Link href="/formacao" className="mb-3 inline-flex text-[13px] font-medium text-gold md:hidden">
        ← formação
      </Link>
      <article className="hero min-h-[180px] md:min-h-[280px]">
        <span className="pill">{m.tag}</span>
        <h1 className="font-display text-[40px] font-semibold leading-none md:text-6xl">{m.nome}</h1>
        <p className="mt-3 text-sm text-[#d7e2f8]">
          {m.quando} · {m.local}
        </p>
      </article>
      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-[#d7e2f8]">{m.texto}</p>
          <section className="mt-8">
            <h2 className="section-label">Próximos</h2>
            <div className="grid gap-3">
              {m.proximos.map((p) => (
                <article key={p.titulo} className="card">
                  <h3 className="font-display text-2xl">{p.titulo}</h3>
                  <p className="meta">
                    {p.data} · {p.extra}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
        <aside>
          <h2 className="section-label">Liderança</h2>
          <div className="card">
            <h3 className="font-display text-2xl">{m.lider}</h3>
            <p className="meta">Mentoria presencial e on-line</p>
          </div>
          <div className="mt-4">
            {m.checkin ? (
              <article className="card">
                <h3 className="font-display text-2xl">Check-in kids</h3>
                <p className="meta">Pré-selecione as crianças. No templo, mostre o código.</p>
                <ActionForm kind="checkin" button="Gerar código" />
              </article>
            ) : m.cursos ? (
              <Link href="/cursos" className="btn-gold">
                Ver trilhas da família
              </Link>
            ) : (
              <ActionForm kind="quero-ir" extra={m.nome} button="Quero fazer parte" />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
