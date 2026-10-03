import { church, youtubeSrc } from "@/lib/content";

export default function CultoPage() {
  const src = youtubeSrc();
  return (
    <div>
      <h1 className="mb-2.5 text-lg font-extrabold uppercase tracking-wider">Culto</h1>
      {src ? (
        <div className="aspect-video overflow-hidden rounded-[20px] border border-white/10 bg-black">
          <iframe
            src={src}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Transmissão Ágape"
          />
        </div>
      ) : (
        <article className="hero min-h-[150px]">
          <span className="pill">
            <span className="h-2 w-2 rounded-full bg-red-500" /> culto presencial e online
          </span>
          <h2 className="text-[26px] font-extrabold leading-tight">A transmissão entra no ar domingo 18h.</h2>
          <p className="mt-2 text-sm text-[#d7e2f8]">Adoração, Palavra e comunidade para todas as gerações.</p>
        </article>
      )}
      <p className="my-4 text-sm text-muted">Cultos presenciais e on-line, integrados</p>
      <div className="grid gap-2.5">
        <article className="card">
          <h3 className="font-semibold">Culto da família</h3>
          <p className="meta">Domingo 10h · templo · todas as gerações</p>
        </article>
        <article className="card">
          <h3 className="font-semibold">Culto da noite</h3>
          <p className="meta">Domingo 18h · templo + live · Palavra aplicada</p>
        </article>
        <a href={church.youtubeUrl} target="_blank" rel="noopener" className="btn-gold">
          Abrir canal no YouTube
        </a>
      </div>
    </div>
  );
}
