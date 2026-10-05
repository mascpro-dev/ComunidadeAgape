import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/ActionForm";
import { PosterRow } from "@/components/PosterRow";
import { cursos, getCurso } from "@/lib/content";
import { cursoComLanding } from "@/lib/curso-landing";
import { fotoCapa } from "@/lib/fotos";

export function generateStaticParams() {
  return cursos.map((c) => ({ id: c.id }));
}

export default async function CursoLandingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const base = getCurso(id);
  if (!base) notFound();
  const c = cursoComLanding(base);
  const capa = fotoCapa(c.capa);
  const glow = c.glow || "#d6c08a";
  const reels = c.reels || [];

  return (
    <div className="-mx-4 overflow-x-clip md:-mx-8">
      <section className="relative min-h-[86vh] overflow-hidden md:min-h-[78vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={capa} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover blur-md" />
        <div className="absolute inset-0 bg-[#030b1f]/55" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(80% 70% at 20% 80%, ${glow}55, transparent 55%), radial-gradient(70% 60% at 90% 10%, ${glow}33, transparent 50%), linear-gradient(180deg, transparent 20%, #030b1f 92%)`,
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-6 md:min-h-[78vh] md:px-8 md:pb-16">
          <Link href="/formacao" className="mb-6 inline-flex self-start text-[13px] font-medium text-gold">
            ← gerações
          </Link>
          <div className="grid items-end gap-8 md:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)]">
            <div className="relative mx-auto aspect-[2/3] w-[min(240px,58vw)] overflow-hidden rounded-lg shadow-[0_30px_80px_rgba(0,0,0,.55)] md:mx-0 md:w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={capa} alt={c.nome} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="page-kicker">{c.publico}</p>
              <h1 className="font-display text-[42px] font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
                {c.headline || c.nome}
              </h1>
              <p className="mt-4 max-w-[38ch] text-lg leading-snug text-gold md:text-2xl">{c.slogan || c.resumo}</p>
              <p className="mt-3 text-sm text-[#d7e2f8]">{c.nome}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[`${c.semanas} semanas`, c.encontro, c.modalidade, c.material, `${c.vagas} vagas`].map((chip) => (
                  <span key={chip} className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#e8eef8]">
                    {chip}
                  </span>
                ))}
              </div>
              <a href="#inscrever" className="btn-gold mt-8 inline-flex min-h-12 px-8 text-base">
                Quero esta turma
              </a>
            </div>
          </div>
        </div>
      </section>

      <div
        className="relative px-4 py-12 md:px-8 md:py-16"
        style={{
          background: `radial-gradient(90% 50% at 50% 0%, ${glow}22, transparent 50%), #030b1f`,
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="section-label">Por que este curso</p>
            <p className="max-w-[58ch] text-[17px] leading-relaxed text-[#e4ecfb] md:text-[19px]">{c.manifesto || c.resumo}</p>
            <h2 className="mt-10 font-display text-3xl text-white md:text-4xl">Para quem é</h2>
            <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-[#d7e2f8]">{c.paraQuem}</p>
          </div>
          <aside className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
            <p className="section-label">O que você leva</p>
            <ul className="space-y-4">
              {c.voceVai.map((item, i) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug text-[#e8eef8]">
                  <span className="font-display text-2xl leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <p className="section-label">Percurso</p>
          <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none]">
            {c.temas.map((tema, i) => (
              <article
                key={tema}
                className="min-w-[168px] flex-1 rounded-2xl border border-white/10 bg-black/25 p-4"
                style={{ boxShadow: `inset 0 0 40px ${glow}18` }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Semana {i + 1}</p>
                <p className="mt-2 font-display text-xl leading-tight text-white">{tema}</p>
              </article>
            ))}
          </div>
        </div>

        {reels.length ? (
          <div className="mx-auto mt-6 max-w-7xl">
            <PosterRow
              title="Reels · quem já viveu junto"
              items={reels.map((r) => ({
                href: r.video || "#inscrever",
                src: r.capa,
                title: r.nome,
                kicker: r.frase,
                reel: true,
                external: Boolean(r.video),
              }))}
            />
            <p className="mt-1 max-w-[52ch] text-sm text-muted">
              Testemunhos de quem fez o curso em comunidade. Os reels de vídeo entram nestes cards — formação se fortalece junto.
            </p>
          </div>
        ) : null}

        <div
          id="inscrever"
          className="mx-auto mt-14 grid max-w-7xl overflow-hidden rounded-[28px] border border-gold/35 md:grid-cols-[1.1fr_0.9fr]"
          style={{ background: `linear-gradient(135deg, ${glow}33, #071433 45%, #030b1f)` }}
        >
          <div className="p-6 md:p-10">
            <p className="page-kicker">Inscrição</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Sua vaga nesta turma</h2>
            <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-[#e8eef8]">{c.convite || "Deixe seu nome. O time confirma a turma e o material."}</p>
            <p className="mt-4 text-sm text-gold/90">
              {c.geracoes} · {c.modalidade} · {c.vagas} vagas
            </p>
          </div>
          <div className="border-t border-white/10 bg-black/25 p-6 md:border-l md:border-t-0 md:p-10">
            <ActionForm kind="curso" extra={c.nome} button="Confirmar inscrição" />
          </div>
        </div>
      </div>
    </div>
  );
}
