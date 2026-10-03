import Link from "next/link";
import { eventos, ministerios } from "@/lib/content";

const atajos = [
  { href: "/perfil", k: "Meu perfil", t: "Cadastro do membro" },
  { href: "/dashboard", k: "Painel", t: "Métricas e relatórios" },
  { href: "/biblia", k: "Bíblia", t: "Leitura online" },
  { href: "/comunidade", k: "Comunidade", t: "Feed e salas" },
  { href: "/palavra", k: "Áudios", t: "Palavra dos líderes" },
  { href: "/culto", k: "Culto", t: "Ao vivo e no templo" },
];
  { href: "/culto", k: "Culto", t: "Ao vivo e no templo" },
  { href: "/celulas", k: "Células", t: "Encontre o seu grupo" },
  { href: "/formacao", k: "Formação", t: "Discipulado contínuo" },
];

export default function HomePage() {
  return (
    <div>
      <article className="hero">
        <span className="pill">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          domingo · 10h e 18h
        </span>
        <h1 className="font-display max-w-[14ch] text-[40px] font-semibold leading-[0.95] md:max-w-[16ch] md:text-[72px]">
          Jesus para toda a vida.
        </h1>
        <p className="mb-6 mt-4 max-w-[42ch] text-sm leading-relaxed text-[#d7e2f8] md:text-lg">
          Amar, servir e transformar a cidade — juntos, com propósito.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/culto" className="btn-gold">
            Assistir agora
          </Link>
          <Link href="/visao" className="btn-ghost">
            Visão 2033
          </Link>
        </div>
      </article>

      <section className="mt-8 grid gap-8 md:mt-14 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
        <div>
          <h2 className="section-label">Entrar na casa</h2>
          <div className="grid gap-2.5 md:grid-cols-2">
            {atajos.map((a) => (
              <Link key={a.href} href={a.href} className="shortcut">
                <span className="h-9 w-px bg-gold/70" />
                <span>
                  <b className="block text-[15px] font-medium">{a.k}</b>
                  <span className="text-[13px] text-muted">{a.t}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="section-label">Essa semana</h2>
          <div className="grid gap-3">
            {eventos.slice(0, 3).map((e) => (
              <Link key={e.titulo} href="/eventos" className="card">
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{e.tag}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">{e.titulo}</h3>
                <p className="meta">{e.quando}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 md:mt-16">
        <h2 className="section-label">Gerações</h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {ministerios.map((m) => (
            <Link
              key={m.id}
              href={`/formacao/${m.id}`}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-2 py-4 text-center transition hover:border-gold/40"
            >
              <p className="font-display text-2xl text-gold">{m.nome.slice(0, 1)}</p>
              <p className="mt-2 text-[12px] text-[#d7e2f8]">{m.nome}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
