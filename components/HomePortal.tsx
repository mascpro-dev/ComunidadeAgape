"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PosterRow } from "@/components/PosterRow";
import { getSessionId } from "@/lib/auth";
import { loadJson } from "@/lib/client-store";
import { eventos, ministerios } from "@/lib/content";
import { fotoCapa, fotos } from "@/lib/fotos";
import { MEMBROS_KEY, seedMembros, type Membro } from "@/lib/metrics";

const atajos = [
  { href: "/perfil", k: "Perfil", icon: "user" },
  { href: "/dashboard", k: "Painel", icon: "chart" },
  { href: "/biblia", k: "Bíblia", icon: "book" },
  { href: "/formacao", k: "Formação", icon: "star" },
  { href: "/comunidade", k: "Comunidade", icon: "people" },
  { href: "/celulas", k: "Células", icon: "home" },
  { href: "/culto", k: "Culto", icon: "live" },
  { href: "/palavra", k: "Áudios", icon: "mic" },
];

const avisos = [
  { t: "Parabéns aos aniversariantes da comunidade", href: "/comunidade" },
  { t: "Inscrições abertas na Universidade da Família", href: "/formacao" },
  { t: "Células durante a semana — ache a sua", href: "/celulas" },
  { t: "Culto da noite no templo, domingo 19h", href: "/culto" },
];

const jornada = [
  { n: "2", k: "Cultos", href: "/culto" },
  { n: "1", k: "Célula", href: "/celulas" },
  { n: "3", k: "Salas", href: "/comunidade" },
  { n: "4", k: "Cursos", href: "/formacao" },
  { n: "1", k: "Perfil", href: "/perfil" },
  { n: "6", k: "Gerações", href: "/formacao" },
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
  const [aviso, setAviso] = useState(0);

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
    const hit = atajos.find((a) => a.k.toLowerCase().includes(q));
    router.push(hit?.href || "/biblia");
  }

  return (
    <div>
      <article className="relative overflow-hidden rounded-[20px] bg-[#0a2348] md:rounded-[22px]">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] md:pr-[236px]">
          <div className="flex flex-col justify-center px-6 py-7 md:px-10 md:py-12">
            <h1 className="font-display text-[40px] font-semibold leading-[0.92] tracking-tight md:text-[52px]">
              Jesus.
              <br />
              Toda a vida.
            </h1>
            <p className="mt-3 max-w-[28ch] text-sm text-[#c5d6f0] md:text-[15px]">Conheça os heróis da comunidade este mês</p>
            <Link href="/culto" className="btn-gold mt-6 w-fit px-6">
              Ler mais
            </Link>
          </div>

          <div className="relative flex min-h-[190px] items-end justify-center gap-0 md:min-h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos.heroEsq}
              alt=""
              className="h-[200px] w-1/2 object-cover object-top md:h-[300px]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos.heroDir}
              alt=""
              className="h-[200px] w-1/2 object-cover object-top md:h-[300px]"
            />
          </div>
        </div>

        <aside className="bg-gradient-to-b from-[#9fd4ea] to-[#6bb4d4] text-[#0a2348] md:absolute md:inset-y-0 md:right-0 md:w-[236px]">
          <div className="flex h-full flex-col justify-between p-5 md:p-6">
            <div>
              <p className="text-[13px] font-semibold">Heróis da comunidade este mês</p>
              <ul className="mt-4 space-y-3 text-[13px] leading-snug">
                {avisos.map((a, i) => (
                  <li key={a.t} className={i === aviso ? "font-semibold" : "opacity-80"}>
                    <Link href={a.href}>{a.t}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                className="grid h-7 w-7 place-items-center rounded-md bg-white/25"
                aria-label="Aviso anterior"
                onClick={() => setAviso((n) => (n === 0 ? avisos.length - 1 : n - 1))}
              >
                ⌃
              </button>
              <button
                type="button"
                className="grid h-7 w-7 place-items-center rounded-md bg-white/25"
                aria-label="Próximo aviso"
                onClick={() => setAviso((n) => (n + 1) % avisos.length)}
              >
                ⌄
              </button>
            </div>
          </div>
        </aside>
      </article>

      <div className="mt-8 md:mt-10">
        <h2 className="font-display text-[28px] font-semibold md:text-[32px]">{tituloSaudacao}</h2>
        <form onSubmit={onSearch} className="relative mt-4 md:max-w-xl">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar na comunidade…"
            className="field rounded-full border-white/5 bg-[#0b1c3e] py-3.5 pl-4 pr-12"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-label="Buscar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20 16.5 16.5" />
            </svg>
          </button>
        </form>
      </div>

      <PosterRow
        title="Na semana"
        href="/eventos"
        hrefLabel="Agenda →"
        items={eventos.map((e) => ({
          href: "/eventos",
          src: fotos[e.foto as keyof typeof fotos],
          title: e.titulo,
          kicker: e.tag,
        }))}
      />
      <PosterRow
        title="Gerações"
        href="/formacao"
        items={ministerios.map((m) => ({
          href: `/formacao/${m.id}`,
          src: fotos[m.id as keyof typeof fotos] || fotos.familia,
          title: m.nome,
          kicker: m.tag,
        }))}
      />
      <PosterRow
        title="Assistir"
        href="/culto"
        items={[
          { href: "/culto", src: fotos.familia, title: "Culto da família", kicker: "Ao vivo · Dom 10h" },
          { href: "/culto", src: fotos.culto, title: "Culto da noite", kicker: "Domingo 19h" },
          { href: "/formacao/jovens", src: fotos.jovens, title: "Culto de jovens", kicker: "Sábado 20h" },
          { href: "/formacao/adolescentes", src: fotos.adolescentes, title: "Culto pré-adolescentes", kicker: "19h" },
          { href: "/palavra", src: fotos.biblia, title: "Áudios", kicker: "Palavra" },
          { href: "/visao", src: fotos.missao, title: "Visão 2033", kicker: "A comunidade" },
        ]}
      />

      <div className="md:hidden">
        {ministerios.map((m) => (
          <PosterRow
            key={m.id}
            title={`${m.nome} · cursos e atividades`}
            href={`/formacao/${m.id}`}
            hrefLabel="Abrir →"
            items={m.catalogo.map((i) => ({
              href: i.href || `/formacao/${m.id}`,
              src: fotoCapa(i.capa),
              title: i.titulo,
              kicker: i.kicker,
            }))}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
        <div>
          <div className="flex items-end justify-between">
            <h3 className="section-label mb-0">Atalhos da comunidade</h3>
            <Link href="/mais" className="text-[12px] text-[#9fd4ea]">
              Ver todos →
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {atajos.map((a) => (
              <Link key={a.href} href={a.href} className="topic-tile">
                <span className="mb-2.5 text-[#9fd4ea]">
                  <TileIcon name={a.icon} />
                </span>
                <b className="block text-[13px] font-medium text-[#d7e2f8]">{a.k}</b>
              </Link>
            ))}
          </div>
        </div>

        <aside className="grid gap-5">
          <div>
            <h3 className="section-label">Na sua jornada</h3>
            <Link href="/perfil" className="block rounded-2xl bg-[#5b9cff] px-5 py-7 text-center text-white">
              <p className="text-[40px] font-semibold leading-none">9</p>
              <p className="mt-2 text-sm">Próximos passos</p>
            </Link>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {jornada.map((x) => (
                <Link
                  key={x.k}
                  href={x.href}
                  className="rounded-xl bg-[#0b1c3e] px-3 py-3.5 text-center"
                >
                  <p className="text-lg font-semibold">{x.n}</p>
                  <p className="text-[11px] text-muted">{x.k}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="section-label">Tarefas rápidas</h3>
            <div className="rounded-2xl bg-[#0b1c3e] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-300">Em aberto</p>
              <p className="mt-1.5 text-[15px] font-medium">Célula — encontre o seu grupo</p>
              <p className="meta">Indicação perto de você</p>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                <Link href="/celulas" className="text-center text-[13px] text-muted">
                  Depois
                </Link>
                <Link href="/celulas" className="text-center text-[13px] font-semibold text-[#9fd4ea]">
                  Ver células
                </Link>
              </div>
            </div>
            <div className="mt-2.5 rounded-2xl bg-[#0b1c3e] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9fd4ea]">Novo</p>
              <p className="mt-1.5 text-[15px] font-medium">Universidade da Família</p>
              <p className="meta">Trilhas abertas o ano todo</p>
              <Link href="/formacao" className="mt-3 block text-right text-[13px] text-[#9fd4ea]">
                Acompanhar
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TileIcon({ name }: { name: string }) {
  const p = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
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
