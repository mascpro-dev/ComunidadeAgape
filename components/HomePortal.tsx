"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CardPhoto } from "@/components/CardPhoto";
import { getSessionId } from "@/lib/auth";
import { loadJson } from "@/lib/client-store";
import { eventos, ministerios } from "@/lib/content";
import { fotos } from "@/lib/fotos";
import { MEMBROS_KEY, seedMembros, type Membro } from "@/lib/metrics";

const atajos = [
  { href: "/perfil", k: "Meu perfil", t: "Cadastro", icon: "user" },
  { href: "/dashboard", k: "Painel", t: "Métricas", icon: "chart" },
  { href: "/biblia", k: "Bíblia", t: "Leitura", icon: "book" },
  { href: "/comunidade", k: "Comunidade", t: "Feed e salas", icon: "people" },
  { href: "/palavra", k: "Áudios", t: "Palavra", icon: "mic" },
  { href: "/culto", k: "Culto", t: "Ao vivo", icon: "live" },
  { href: "/celulas", k: "Células", t: "Grupos", icon: "home" },
  { href: "/formacao", k: "Formação", t: "Cursos", icon: "star" },
];

const avisos = [
  { t: "Cultos no templo e online", d: "Domingo 10h e 18h" },
  { t: "Universidade da Família", d: "Trilhas abertas o ano todo" },
  { t: "Células em casas", d: "Encontre um grupo no seu bairro" },
  { t: "Visão 2033", d: "Uma casa viva na cidade" },
];

function saudacaoHora() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export function HomePortal() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const sid = getSessionId();
    if (!sid) return;
    const lista = loadJson<Membro[]>(MEMBROS_KEY, seedMembros);
    const u = lista.find((m) => m.id === sid);
    setNome(u?.nome.split(" ")[0] || "");
  }, []);

  const tituloSaudacao = useMemo(
    () => (nome ? `${saudacaoHora()}, ${nome}` : `${saudacaoHora()}, igreja`),
    [nome],
  );

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = busca.trim().toLowerCase();
    if (!q) return;
    const hit = atajos.find((a) => a.k.toLowerCase().includes(q) || a.t.toLowerCase().includes(q));
    router.push(hit?.href || "/biblia");
  }

  return (
    <div>
      <article className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#071428] md:grid md:grid-cols-[1.4fr_0.72fr] md:rounded-[28px]">
        <div className="relative min-h-[240px] md:min-h-[360px]">
          <CardPhoto src={fotos.familia} alt="Família na casa" className="absolute inset-0 h-full rounded-none" />
          <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-end p-5 md:min-h-[360px] md:p-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">Na casa este mês</p>
            <h1 className="font-display mt-2 max-w-[14ch] text-[36px] font-semibold leading-[0.95] md:text-[56px]">
              Jesus para toda a vida.
            </h1>
            <p className="mt-3 max-w-[36ch] text-sm text-[#d7e2f8] md:text-base">Conheça os heróis da casa — e dê o próximo passo com a gente.</p>
            <Link href="/culto" className="btn-gold mt-5 w-fit">
              Ler mais
            </Link>
          </div>
        </div>
        <aside className="relative border-t border-white/10 bg-[#0b1c3e] md:border-l md:border-t-0">
          <div className="absolute right-0 top-0 h-full w-1.5 bg-gold/80" />
          <div className="p-5 pr-7 md:p-7">
            <p className="text-[12px] font-semibold text-gold">Esta semana na Ágape</p>
            <ul className="mt-5 space-y-4">
              {avisos.map((a) => (
                <li key={a.t} className="border-b border-white/10 pb-4 last:border-0">
                  <p className="text-[14px] font-medium">{a.t}</p>
                  <p className="meta">{a.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </article>

      <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[minmax(0,1fr)_300px] md:items-start md:gap-10">
        <div>
          <h2 className="font-display text-[28px] font-semibold md:text-[34px]">{tituloSaudacao}</h2>
          <form onSubmit={onSearch} className="relative mt-4">
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar perfil, bíblia, culto, células…"
              className="field rounded-full py-3.5 pl-4 pr-12"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-label="Buscar">
              ⌕
            </button>
          </form>

          <div className="mt-8 flex items-end justify-between">
            <h3 className="section-label mb-0">Atalhos da casa</h3>
            <Link href="/mais" className="text-[12px] text-gold">
              Ver todos →
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {atajos.map((a) => (
              <Link key={a.href} href={a.href} className="topic-tile">
                <span className="mb-2 text-gold">
                  <TileIcon name={a.icon} />
                </span>
                <b className="block text-[13px] font-medium">{a.k}</b>
                <span className="mt-0.5 block text-[11px] text-muted">{a.t}</span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex items-end justify-between">
            <h3 className="section-label mb-0">Na semana</h3>
            <Link href="/eventos" className="text-[12px] text-gold">
              Agenda →
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {eventos.slice(0, 3).map((e) => (
              <Link key={e.titulo} href="/eventos" className="card overflow-hidden p-0">
                <CardPhoto src={fotos[e.foto as keyof typeof fotos]} alt={e.titulo} className="h-36 md:h-40" />
                <div className="p-3.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gold">{e.tag}</p>
                  <h4 className="mt-1 font-display text-xl leading-tight">{e.titulo}</h4>
                  <p className="meta">{e.quando}</p>
                </div>
              </Link>
            ))}
          </div>

          <h3 className="section-label mt-10">Gerações</h3>
          <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
            {ministerios.map((m) => (
              <Link
                key={m.id}
                href={`/formacao/${m.id}`}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08]"
              >
                <CardPhoto src={fotos[m.id as keyof typeof fotos] || fotos.familia} alt={m.nome} className="h-24 md:h-28" />
                <p className="absolute bottom-1.5 left-0 right-0 text-center font-display text-[15px] text-white drop-shadow md:text-lg">
                  {m.nome}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <div>
            <h3 className="section-label">Na sua jornada</h3>
            <Link href="/perfil" className="block rounded-2xl bg-[#3d7dff] px-5 py-6 text-center text-white">
              <p className="text-3xl font-semibold">1</p>
              <p className="mt-1 text-sm">Perfil para completar</p>
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { n: "2", k: "Cultos", href: "/culto" },
                { n: "1", k: "Célula", href: "/celulas" },
                { n: "3", k: "Salas", href: "/comunidade" },
                { n: "6", k: "Gerações", href: "/formacao" },
              ].map((x) => (
                <Link key={x.k} href={x.href} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center">
                  <p className="text-lg font-semibold">{x.n}</p>
                  <p className="text-[11px] text-muted">{x.k}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="section-label">Próximo passo</h3>
            <div className="card">
              <p className="text-[11px] uppercase tracking-[0.14em] text-red-300">Culto</p>
              <p className="mt-1 font-display text-xl">Domingo · família 10h</p>
              <p className="meta">Templo e online</p>
              <Link href="/culto" className="btn-gold mt-4 w-full">
                Assistir
              </Link>
            </div>
            <div className="card mt-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">Novo</p>
              <p className="mt-1 font-display text-xl">Visão 2033</p>
              <p className="meta">O rumo da casa até a próxima década</p>
              <Link href="/visao" className="btn-ghost mt-4 w-full">
                Ver visão
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TileIcon({ name }: { name: string }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;
  if (name === "book")
    return (
      <svg {...p}>
        <path d="M5 4.5h6.5A3.5 3.5 0 0 1 15 8v12H8.5A3.5 3.5 0 0 0 5 20.5zM15 8h4v12h-4" />
      </svg>
    );
  if (name === "people")
    return (
      <svg {...p}>
        <circle cx="12" cy="8" r="3" />
        <path d="M4 19c.4-2.5 2.6-4 5-4M15 15c2.4 0 4.6 1.5 5 4" />
      </svg>
    );
  if (name === "chart")
    return (
      <svg {...p}>
        <path d="M4 19h16M7 16v-5M12 16V8M17 16v-8" />
      </svg>
    );
  if (name === "mic")
    return (
      <svg {...p}>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
      </svg>
    );
  if (name === "live")
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="3" />
        <path d="M5 12a7 7 0 0 1 14 0" />
      </svg>
    );
  if (name === "home")
    return (
      <svg {...p}>
        <path d="M4 10.5 12 4l8 6.5V20h-6v-6H10v6H4z" />
      </svg>
    );
  if (name === "star")
    return (
      <svg {...p}>
        <path d="M12 3.5 14.2 9h5.8l-4.7 3.5 1.8 5.5L12 14.8 6.9 18l1.8-5.5L4 9h5.8z" />
      </svg>
    );
  return (
    <svg {...p}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c.6-3.2 3.2-5 7-5s6.4 1.8 7 5" />
    </svg>
  );
}
