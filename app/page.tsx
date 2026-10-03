import Link from "next/link";
import { eventos, ministerios } from "@/lib/content";

export default function HomePage() {
  return (
    <div>
      <article className="hero">
        <span className="pill">
          <span className="h-2 w-2 rounded-full bg-red-500" /> culto · domingo 18h
        </span>
        <h1 className="max-w-[16ch] text-[26px] font-extrabold leading-tight">Jesus para toda a vida.</h1>
        <p className="mb-3.5 mt-2 text-sm text-[#d7e2f8]">Amar, servir e transformar a cidade — juntos, com propósito.</p>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/culto" className="btn-gold">
            Assistir agora
          </Link>
          <Link href="/visao" className="btn-ghost">
            Visão 2033
          </Link>
        </div>
      </article>

      <section className="mt-6">
        <h2 className="section-label">No app</h2>
        <div className="grid grid-cols-2 gap-2.5">
          <Link href="/culto" className="tile from-[#3d6fd4] to-[#12245a]">
            <span className="text-sm text-white/80">Conteúdo</span>
            <b>Culto ao vivo</b>
          </Link>
          <Link href="/celulas" className="tile from-[#2a5bb8] to-[#0a2460]">
            <span className="text-sm text-white/80">Grupos</span>
            <b>Achar célula</b>
          </Link>
          <Link href="/eventos" className="tile from-[#e4d3a2] to-[#8a7340] text-[#1a1408]">
            <span className="text-sm opacity-80">Agenda</span>
            <b>Eventos</b>
          </Link>
          <Link href="/oracao" className="tile from-[#7eb6ff] to-[#1a4a8c] text-[#041218]">
            <span className="text-sm opacity-80">Oração</span>
            <b>Enviar pedido</b>
          </Link>
          <Link href="/formacao" className="tile from-[#16305f] to-[#071433]">
            <span className="text-sm text-white/80">Acompanhamento</span>
            <b>Discipulado</b>
          </Link>
          <Link href="/formacao/infantil" className="tile from-[#2a5bb8] to-[#0a2460]">
            <span className="text-sm text-white/80">Kids</span>
            <b>Check-in</b>
          </Link>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="section-label">Gerações</h2>
        <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
          {ministerios.map((m) => (
            <Link key={m.id} href={`/formacao/${m.id}`} className="min-w-[72px] text-center text-[11px] text-muted">
              <div className="mx-auto mb-1.5 grid h-16 w-16 place-items-center rounded-[22px] border-2 border-gold/50 bg-navy text-xl">
                {m.emoji}
              </div>
              {m.nome.split(" ")[0]}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="section-label">Essa semana</h2>
        <div className="grid gap-2.5">
          {eventos.slice(0, 3).map((e) => (
            <Link key={e.titulo} href="/eventos" className="card">
              <h3 className="text-base font-semibold">{e.titulo}</h3>
              <p className="meta">
                {e.quando} · {e.tag}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
