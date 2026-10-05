import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/ActionForm";
import { PosterRow } from "@/components/PosterRow";
import { cursos, getCurso, type Curso } from "@/lib/content";
import { cursoComLanding } from "@/lib/curso-landing";
import { loadBannerOverrides } from "@/lib/banners";
import { fotoCapa } from "@/lib/fotos";

export function generateStaticParams() {
  return cursos.map((c) => ({ id: c.id }));
}

function Headline({ text }: { text: string }) {
  const parts = text.split(/(?<=\.)\s+/).filter(Boolean);
  if (parts.length < 2) {
    return (
      <h1 className="font-display text-[40px] font-semibold leading-[0.95] tracking-tight text-white md:text-[64px]">
        {text}
      </h1>
    );
  }
  const last = parts.pop()!;
  return (
    <h1 className="font-display text-[40px] font-semibold leading-[0.95] tracking-tight text-white md:text-[64px]">
      {parts.join(" ")}{" "}
      <span className="text-gold">{last}</span>
    </h1>
  );
}

function leadDe(c: Curso) {
  const raw = c.manifesto || c.resumo;
  const frases = raw.split(/(?<=\.)\s+/).filter(Boolean);
  return frases.slice(0, 2).join(" ");
}

function topicos(c: Curso) {
  const extras = [c.material, c.modalidade, `${c.vagas} vagas por turma`, c.encontro, c.paraQuem];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of [...c.voceVai, ...c.temas, ...extras]) {
    const t = item.trim();
    if (!t || seen.has(t.toLowerCase())) continue;
    seen.add(t.toLowerCase());
    out.push(t);
    if (out.length === 6) break;
  }
  return out;
}

const icones = [
  <path key="p" d="M8 6v12M6 8h4M16 8l4 8M16 16l4-8" />,
  <path key="s" d="M4 7h16v12H4zM8 7V5h8v2" />,
  <path key="q" d="M11 5h2l1 4h4l-3.2 2.4L16 16l-4-2.4L8 16l1.2-4.6L6 9h4z" />,
  <path key="l" d="M12 4l2.2 4.4L19 9l-3.5 3.4.8 4.6L12 15l-4.3 2 1-4.6L5 9l4.8-.6z" />,
  <path key="a" d="M5 16c2-5 5-8 7-9 2 1 5 4 7 9M9 16a3 3 0 0 0 6 0" />,
  <circle key="c" cx="12" cy="12" r="7" />,
];

export default async function CursoLandingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const base = getCurso(id);
  if (!base) notFound();
  const c = cursoComLanding(base);
  const extras = await loadBannerOverrides();
  const capa = fotoCapa(c.capa, extras);
  const glow = c.glow || "#d6c08a";
  const reels = c.reels || [];
  const stats = [
    { n: c.semanas >= 2 ? `${c.semanas}` : "12h", l: c.semanas >= 2 ? "semanas" : "imersão" },
    { n: `${c.vagas}`, l: "vagas na turma" },
    { n: c.modalidade.includes("online") ? "Híbrido" : "Presencial", l: "formato" },
  ];
  const selos = Array.from(
    new Set(["Universidade da Família", "Comunidade Ágape", ...c.geracoes.split("·").map((s) => s.trim())]),
  );
  const blocos = topicos(c);

  return (
    <div className="-mx-4 overflow-x-clip md:-mx-8">
      <section className="relative overflow-hidden px-4 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(70% 55% at 85% 20%, ${glow}28, transparent 55%), radial-gradient(50% 40% at 10% 90%, ${glow}18, transparent 50%)`,
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <Link href="/formacao" className="mb-5 inline-flex text-[13px] font-medium text-gold">
              ← gerações
            </Link>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{c.publico}</p>
            <div className="mt-3">
              <Headline text={c.headline || c.nome} />
            </div>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-[#d7e2f8] md:text-[17px]">{leadDe(c)}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#inscrever" className="btn-gold inline-flex min-h-12 px-7 text-base">
                Quero esta turma →
              </a>
              <a
                href="#percurso"
                className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 text-[15px] text-white transition hover:border-gold/50"
              >
                ▶ Ver o percurso
              </a>
            </div>
            {reels.length ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex -space-x-2">
                  {reels.slice(0, 4).map((r) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={r.nome}
                      src={r.capa}
                      alt=""
                      className="h-9 w-9 rounded-full border-2 border-[#030b1f] object-cover"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#c9d6ee]">
                  <span className="text-gold">★★★★★</span> Quem já fez esta trilha na comunidade
                </p>
              </div>
            ) : null}
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={capa} alt={c.nome} className="aspect-[4/5] w-full object-cover object-top md:aspect-[5/6]" />
            </div>
            <ul className="absolute right-0 top-6 hidden w-[168px] flex-col gap-2 sm:flex md:-right-2 lg:-right-6">
              {stats.map((s) => (
                <li
                  key={s.l}
                  className="rounded-2xl border border-white/15 bg-[#071433]/90 px-4 py-3 shadow-lg backdrop-blur-md"
                >
                  <p className="font-display text-2xl leading-none text-white">{s.n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-gold">{s.l}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 max-w-7xl rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 md:px-8">
          <p className="mb-3 text-center text-[11px] uppercase tracking-[0.18em] text-muted">Formação reconhecida na casa</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {selos.map((s) => (
              <span key={s} className="text-[13px] font-semibold tracking-[0.08em] text-[#e8eef8]/80">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-3xl text-white md:text-5xl">Tudo o que você precisa nesta turma</h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-center text-[#c9d6ee]">{c.slogan || c.resumo}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blocos.map((item, i) => (
              <li key={item} className="rounded-[22px] border border-white/10 bg-white/[0.03] px-5 py-6 text-center">
                <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-gold">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    {icones[i % icones.length]}
                  </svg>
                </span>
                <p className="font-display text-xl text-white">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="percurso" className="px-4 pb-12 md:px-8 md:pb-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-label">Dentro da trilha</p>
            <h2 className="font-display text-3xl text-white md:text-5xl">Um percurso. Crescimento contínuo.</h2>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-[#d7e2f8]">{c.manifesto || c.resumo}</p>
            <ul className="mt-6 space-y-4">
              {[
                { t: "Para quem é", d: c.paraQuem },
                { t: "Como acontece", d: `${c.encontro} · ${c.modalidade}` },
                { t: "O que você leva", d: c.voceVai.join(" · ") },
                { t: "Material", d: c.material },
              ].map((x) => (
                <li key={x.t} className="flex gap-3">
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/15 text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-white">{x.t}</p>
                    <p className="text-sm leading-snug text-[#c9d6ee]">{x.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,.35)] md:p-6">
            <div className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-muted">
              <span>⌕</span> Encontros, temas e testemunhos
            </div>
            <div className="grid gap-3 sm:grid-cols-[0.9fr_1.1fr]">
              <ul className="space-y-2">
                {c.temas.slice(0, 6).map((tema, i) => (
                  <li key={tema} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gold">
                      {c.semanas >= 2 ? `Semana ${i + 1}` : `Bloco ${i + 1}`}
                    </p>
                    <p className="font-display text-lg leading-tight text-white">{tema}</p>
                  </li>
                ))}
              </ul>
              <div className="grid gap-3">
                {reels.slice(0, 2).map((r) => (
                  <article key={r.nome} className="overflow-hidden rounded-2xl border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.capa} alt="" className="h-28 w-full object-cover" />
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-white">{r.nome}</p>
                      <p className="text-[12px] text-muted">{r.frase}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {reels.length ? (
        <div className="px-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <PosterRow
              title="Quem já viveu junto"
              items={reels.map((r) => ({
                href: r.video || "#inscrever",
                src: r.capa,
                title: r.nome,
                kicker: r.frase,
                reel: true,
                external: Boolean(r.video),
              }))}
            />
          </div>
        </div>
      ) : null}

      <div className="px-4 py-10 md:px-8 md:pb-16">
        <div
          id="inscrever"
          className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[28px] border border-gold/30 md:flex-row md:items-center"
          style={{ background: `linear-gradient(120deg, ${glow}28, #071433 42%, #030b1f)` }}
        >
          <div className="flex-1 p-6 md:p-10">
            <p className="page-kicker">Inscrição</p>
            <h2 className="font-display text-3xl text-white md:text-5xl">Aprenda com a Palavra. Cresça na comunidade.</h2>
            <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-[#e8eef8]">{c.convite || "Deixe seu nome. O time confirma a turma e o material."}</p>
            <p className="mt-4 text-sm text-gold/90">Material incluso · {c.geracoes} · {c.vagas} vagas</p>
          </div>
          <div className="w-full border-t border-white/10 bg-black/25 p-6 md:max-w-md md:border-l md:border-t-0 md:p-8">
            <ActionForm kind="curso" extra={c.nome} cursoId={c.id} button="Confirmar inscrição" />
          </div>
        </div>
      </div>
    </div>
  );
}
