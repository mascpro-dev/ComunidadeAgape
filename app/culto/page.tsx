import { church, youtubeSrc } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";

export default function CultoPage() {
  const src = youtubeSrc();
  return (
    <div>
      <PageHeader
        kicker="Presencial e online"
        title="Culto"
        lead="Adoração, Palavra e comunidade para todas as gerações — no templo e na transmissão."
      />
      {src ? (
        <div className="aspect-video overflow-hidden rounded-[24px] border border-white/10 bg-black md:max-w-4xl">
          <iframe
            src={src}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Transmissão Ágape"
          />
        </div>
      ) : (
        <article className="hero min-h-[180px] md:min-h-[280px]">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> transmissão · domingo 18h
          </span>
          <h2 className="font-display text-[34px] font-semibold leading-tight md:text-5xl">
            A live entra no ar no culto da noite.
          </h2>
        </article>
      )}
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <article className="card">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Domingo</p>
          <h3 className="mt-1 font-display text-2xl">Culto da família</h3>
          <p className="meta">10h · templo · todas as gerações</p>
        </article>
        <article className="card">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Domingo</p>
          <h3 className="mt-1 font-display text-2xl">Culto da noite</h3>
          <p className="meta">18h · templo + live · Palavra aplicada</p>
        </article>
        <a href={church.youtubeUrl} target="_blank" rel="noopener" className="card flex flex-col justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Canal</p>
            <h3 className="mt-1 font-display text-2xl">YouTube Ágape</h3>
          </div>
          <p className="meta">Abrir transmissões anteriores →</p>
        </a>
      </div>
    </div>
  );
}
