"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PosterRow } from "@/components/PosterRow";
import { loadMe } from "@/lib/agape-db";
import { celulas, eventos, ministerios } from "@/lib/content";
import { fotoCapa, fotos } from "@/lib/fotos";

const buscaRotas = [
  { href: "/perfil", k: "Perfil" },
  { href: "/dashboard", k: "Painel" },
  { href: "/biblia", k: "Bíblia" },
  { href: "/formacao", k: "Formação" },
  { href: "/comunidade", k: "Comunidade" },
  { href: "/celulas", k: "Células" },
  { href: "/culto", k: "Culto" },
  { href: "/palavra", k: "Áudios" },
];

const avisos = [
  { t: "Parabéns aos aniversariantes da comunidade", href: "/comunidade" },
  { t: "Inscrições abertas na Universidade da Família", href: "/formacao" },
  { t: "Células durante a semana — ache a sua", href: "/celulas" },
  { t: "Culto da noite no templo, domingo 19h", href: "/culto" },
];

const destaques = [
  { href: "/culto", src: fotos.familia, k: "Ao vivo", t: "Culto da família", d: "Domingo 10h" },
  { href: "/culto", src: fotos.cultoNoite, k: "Templo", t: "Culto da noite", d: "Domingo 19h" },
  { href: "/formacao/jovens", src: fotos.jovens, k: "Geração", t: "Culto de jovens", d: "Sábado 20h" },
  { href: "/formacao/adolescentes", src: fotos.adolescentes, k: "Geração", t: "Pré-adolescentes", d: "19h" },
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
    loadMe()
      .then((u) => setNome(u?.nome.split(" ")[0] || ""))
      .catch(() => setNome(""));
  }, []);

  const tituloSaudacao = useMemo(
    () => (nome ? `${saudacaoHora()}, ${nome}` : `${saudacaoHora()}, igreja`),
    [nome],
  );

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = busca.trim().toLowerCase();
    if (!q) return;
    const hit = buscaRotas.find((a) => a.k.toLowerCase().includes(q));
    router.push(hit?.href || "/biblia");
  }

  const avisoAtual = avisos[aviso];

  return (
    <div>
      <section className="relative -mx-4 overflow-hidden md:mx-0 md:rounded-[28px]">
        <div className="relative min-h-[460px] md:min-h-[560px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fotos.familia} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030b1f] via-[#030b1f]/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030b1f]/80 via-transparent to-transparent" />
          <div className="relative z-10 flex min-h-[460px] flex-col justify-end px-5 pb-6 pt-16 md:min-h-[560px] md:max-w-3xl md:px-12 md:pb-12">
            <span className="pill">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              ao vivo · domingo 10h
            </span>
            <h1 className="font-display max-w-[10ch] text-[48px] font-semibold leading-[0.9] tracking-tight md:text-[72px]">
              Jesus.
              <span className="block text-gold">Toda a vida.</span>
            </h1>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-[#d7e2f8] md:text-base">
              Palavra, comunidade e gerações — no templo, na transmissão e na cidade.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/culto" className="btn-gold px-6">
                Assistir o culto
              </Link>
              <Link href="/celulas" className="btn-ghost px-6">
                Achar uma célula
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:mt-5 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
        {destaques.map((d) => (
          <Link
            key={d.t}
            href={d.href}
            className="relative min-w-[220px] shrink-0 overflow-hidden rounded-2xl border border-white/10 md:min-w-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.src} alt="" className="h-28 w-full object-cover md:h-36" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030b1f] via-[#030b1f]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">{d.k}</p>
              <p className="font-display text-xl leading-none">{d.t}</p>
              <p className="mt-1 text-[12px] text-[#c5d6f0]">{d.d}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 md:mt-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="page-kicker mb-1">Início</p>
          <h2 className="font-display text-[32px] font-semibold leading-none md:text-[40px]">{tituloSaudacao}</h2>
        </div>
        <form onSubmit={onSearch} className="relative w-full md:max-w-md">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar na comunidade…"
            className="field rounded-full border-white/10 bg-[#0b1c3e]/80 py-3.5 pl-4 pr-12"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-label="Buscar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20 16.5 16.5" />
            </svg>
          </button>
        </form>
      </div>

      <Link
        href={avisoAtual.href}
        className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-gold/25 bg-gold/10 px-4 py-4 md:px-5"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Na comunidade agora</p>
          <p className="mt-1 text-[15px] font-medium leading-snug">{avisoAtual.t}</p>
        </div>
        <button
          type="button"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-gold"
          aria-label="Próximo aviso"
          onClick={(e) => {
            e.preventDefault();
            setAviso((n) => (n + 1) % avisos.length);
          }}
        >
          →
        </button>
      </Link>

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

      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-stretch">
        <div className="flex min-h-0 flex-col gap-5 md:h-full">
          <PosterRow
            fill
            className="mt-0 md:mt-0"
            title="Células"
            href="/celulas"
            hrefLabel="Ver grupos →"
            items={celulas.map((c) => ({
              href: "/celulas",
              src: fotoCapa(c.capa),
              title: c.nome,
              kicker: `${c.dia} · ${c.hora}`,
            }))}
          />
          <PosterRow
            fill
            className="mt-0 md:mt-0"
            title="Atividades da semana"
            href="/eventos"
            hrefLabel="Agenda →"
            items={ministerios.flatMap((m) =>
              m.catalogo
                .filter((i) => i.tipo === "atividade")
                .map((i) => ({
                  href: i.href || `/formacao/${m.id}`,
                  src: fotoCapa(i.capa),
                  title: i.titulo,
                  kicker: i.kicker,
                })),
            )}
          />
        </div>

        <aside className="grid gap-5">
          <div>
            <h3 className="section-label">Na sua jornada</h3>
            <Link
              href="/perfil"
              className="block overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-[#1a3a72] to-[#06153a] px-5 py-7 text-center"
            >
              <p className="font-display text-[48px] font-semibold leading-none text-gold">9</p>
              <p className="mt-2 text-sm text-[#d7e2f8]">Próximos passos</p>
            </Link>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {jornada.map((x) => (
                <Link
                  key={x.k}
                  href={x.href}
                  className="rounded-xl border border-white/10 bg-[#0b1c3e] px-3 py-3.5 text-center hover:border-gold/35"
                >
                  <p className="text-lg font-semibold text-gold">{x.n}</p>
                  <p className="text-[11px] text-muted">{x.k}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="section-label">Tarefas rápidas</h3>
            <div className="rounded-2xl border border-white/10 bg-[#0b1c3e] p-4">
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
            <div className="mt-2.5 rounded-2xl border border-white/10 bg-[#0b1c3e] p-4">
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
