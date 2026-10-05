import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/ActionForm";
import { PosterRow } from "@/components/PosterRow";
import { ministeriosNaAgenda, type ItemGeracao } from "@/lib/content";
import { fotoCapa } from "@/lib/fotos";
import { loadBannerOverrides } from "@/lib/banners";

export default async function MinisterioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = ministeriosNaAgenda().find((x) => x.id === id);
  if (!m) notFound();
  const extras = await loadBannerOverrides();
  const capa = fotoCapa(m.id, extras);
  const cursos = m.catalogo.filter((i) => i.tipo === "curso");
  const atividades = m.catalogo.filter((i) => i.tipo === "atividade");

  function posters(itens: ItemGeracao[]) {
    return itens.map((i) => ({
        href: i.href || `/formacao/${id}`,
      src: fotoCapa(i.capa, extras),
      title: i.titulo,
      kicker: i.kicker,
    }));
  }

  return (
    <div>
      <Link href="/formacao" className="mb-3 inline-flex text-[13px] font-medium text-gold md:hidden">
        ← formação
      </Link>
      <article className="relative min-h-[200px] overflow-hidden rounded-[24px] md:min-h-[320px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={capa} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030b1f] via-[#030b1f]/55 to-black/15" />
        <div className="relative z-10 flex min-h-[200px] flex-col justify-end p-5 md:min-h-[320px] md:p-10">
          <span className="pill">{m.tag}</span>
          <h1 className="font-display text-[40px] font-semibold leading-none md:text-6xl">{m.nome}</h1>
          <p className="mt-3 text-sm text-[#d7e2f8]">
            {m.quando} · {m.local}
          </p>
        </div>
      </article>

      <PosterRow title="Cursos" items={posters(cursos)} size="gen" />
      <PosterRow title="Atividades" items={posters(atividades)} size="gen" />

      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-[#d7e2f8]">{m.texto}</p>
        <aside>
          <h2 className="section-label">Liderança</h2>
          <div className="card">
            <h3 className="font-display text-2xl">{m.lider}</h3>
            <p className="meta">Mentoria presencial e on-line</p>
          </div>
          <div className="mt-4">
            {m.checkin ? (
              <article id="checkin" className="card">
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
