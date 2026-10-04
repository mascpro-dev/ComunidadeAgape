import { ActionForm } from "@/components/ActionForm";
import { PosterRow } from "@/components/PosterRow";
import { cursos } from "@/lib/content";
import { fotoCapa } from "@/lib/fotos";
import { PageHeader } from "@/components/PageHeader";

export default function CursosPage() {
  return (
    <div>
      <PageHeader
        backHref="/formacao"
        backLabel="formação"
        kicker="Escola"
        title="Trilhas"
        lead="Formação por geração: finanças Crown, Habitudes, Ignição e Escola da Família — para o membro decidir com clareza."
      />
      <PosterRow
        title="Em cartaz"
        items={cursos.map((c) => ({
          href: `#${c.id}`,
          src: fotoCapa(c.capa),
          title: c.nome,
          kicker: `${c.semanas} sem`,
        }))}
      />
      <div className="mt-8 grid gap-5">
        {cursos.map((c) => (
          <article key={c.id} id={c.id} className="card overflow-hidden !p-0 md:grid md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
            <div className="relative min-h-[220px] bg-black/20 md:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fotoCapa(c.capa)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="p-5 md:p-7">
              <p className="page-kicker !mb-1">{c.publico}</p>
              <h3 className="font-display text-[28px] leading-tight md:text-3xl">{c.nome}</h3>
              <p className="meta">
                {c.encontro} · {c.semanas} semanas · {c.modalidade} · {c.material} · {c.vagas} vagas
              </p>
              <p className="mt-3 text-[13px] text-gold/90">{c.geracoes}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#d7e2f8]">{c.resumo}</p>
              <h4 className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">Para quem</h4>
              <p className="mt-1 text-sm leading-relaxed text-[#d7e2f8]">{c.paraQuem}</p>
              <h4 className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">O que você leva</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#d7e2f8]">
                {c.voceVai.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4 className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">Temas das semanas</h4>
              <p className="mt-1 text-sm leading-relaxed text-[#d7e2f8]">{c.temas.join(" · ")}</p>
              <div className="mt-5">
                <ActionForm kind="curso" extra={c.nome} button="Inscrever" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
