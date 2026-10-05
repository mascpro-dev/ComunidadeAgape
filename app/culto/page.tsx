import { church, youtubeSrc } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { PosterRow } from "@/components/PosterRow";
import { fotos } from "@/lib/fotos";

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
        <a
          href={church.youtubeUrl}
          target="_blank"
          rel="noopener"
          className="relative block min-h-[220px] overflow-hidden rounded-[24px] md:min-h-[380px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fotos.familia} alt="Culto da família Ágape" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030b1f] via-[#030b1f]/55 to-black/20" />
          <div className="relative z-10 flex min-h-[220px] flex-col justify-end p-5 md:min-h-[380px] md:p-10">
            <span className="pill">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> templo + ao vivo · domingo 10h
            </span>
            <h2 className="font-display max-w-[18ch] text-[34px] font-semibold leading-tight md:text-5xl">
              Culto da família: no templo e ao vivo.
            </h2>
            <p className="mt-3 text-sm text-[#d7e2f8] md:text-base">Venha ao templo ou abra a transmissão no YouTube.</p>
          </div>
        </a>
      )}
      <PosterRow
        title="Na comunidade"
        items={[
          { href: "/culto", src: fotos.familia, title: "Culto da família", kicker: "Dom 10h · templo e ao vivo" },
          { href: "/culto", src: fotos.cultoNoite, title: "Culto da noite", kicker: "Domingo 19h" },
          { href: "/formacao/jovens", src: fotos.cultoJovens, title: "Culto de jovens", kicker: "Sábado 20h" },
          { href: "/formacao/adolescentes", src: fotos.adolescentes, title: "Culto de Pré Adolescentes", kicker: "às 19h" },
          { href: "/formacao/infantil", src: fotos.infantil, title: "Culto Infantil", kicker: "Domingo 10h · igreja" },
          {
            href: church.youtubeUrl,
            src: fotos.youtube,
            title: "YouTube Ágape",
            kicker: "Canal",
            external: true,
          },
        ]}
      />
    </div>
  );
}
