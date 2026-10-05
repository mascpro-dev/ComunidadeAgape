"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { LeaderGate } from "./LeaderGate";
import {
  FUNCOES,
  estadosCivis,
  maskCpf,
  ministeriosPainel,
  parseCursos,
  summarize,
  temFuncao,
  type FuncaoId,
  type Membro,
  type Relatorio,
} from "@/lib/metrics";
import { FieldSelect } from "@/components/FieldSelect";
import { insertRelatorio, loadMe, loadMembros, loadRelatorios, setFuncao } from "@/lib/agape-db";
import { loadMovimentoMembros, loadMovimentosRecentes, type MembroMovimento, type MovimentoRow } from "@/lib/movimento-db";

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
const DIAS = ["D", "S", "T", "Q", "Q", "S", "S"];

function saudacaoHora(h: number) {
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export function MetricsDashboard() {
  const [tab, setTab] = useState<"numeros" | "relatorios" | "pessoas" | "movimento">("numeros");
  const [membros, setMembros] = useState<Membro[]>([]);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [movimento, setMovimento] = useState<MembroMovimento[]>([]);
  const [trilha, setTrilha] = useState<MovimentoRow[]>([]);
  const [eu, setEu] = useState<Membro | undefined>();
  const [agora, setAgora] = useState<Date | null>(null);

  async function recarregar() {
    const [m, r, me, mv, tr] = await Promise.all([
      loadMembros(),
      loadRelatorios(),
      loadMe(),
      loadMovimentoMembros().catch(() => [] as MembroMovimento[]),
      loadMovimentosRecentes().catch(() => [] as MovimentoRow[]),
    ]);
    setMembros(m);
    setRelatorios(r);
    setEu(me || undefined);
    setMovimento(mv);
    setTrilha(tr);
  }

  useEffect(() => {
    recarregar().catch(() => undefined);
    setAgora(new Date());
    const t = setInterval(() => setAgora(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const s = useMemo(() => summarize(membros, relatorios), [membros, relatorios]);
  const maxMin = Math.max(1, ...s.porMinisterio.map((m) => m.presentes));
  const pctConv = s.total ? Math.round((s.convertidos / s.total) * 100) : 0;
  const nome = eu?.nome.split(" ")[0] || "líder";
  const papel = eu?.principal ? "Administrador" : "Liderança";
  const podePessoas = temFuncao(eu, "pessoas") || temFuncao(eu, "liberar");
  const podeRel = temFuncao(eu, "relatorios") || temFuncao(eu, "painel");

  async function saveRel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    await insertRelatorio({
      ministerio: String(d.get("ministerio")),
      lider: String(d.get("lider") || "").trim(),
      periodo: String(d.get("periodo") || "").trim(),
      presentes: Number(d.get("presentes") || 0),
      visitantes: Number(d.get("visitantes") || 0),
      decisoes: Number(d.get("decisoes") || 0),
      observacao: String(d.get("observacao") || "").trim(),
    });
    e.currentTarget.reset();
    await recarregar();
    setTab("numeros");
  }

  return (
    <LeaderGate title="Painel da comunidade" funcao="painel">
      <div className="md:grid md:grid-cols-[68px_minmax(0,1fr)] md:gap-5">
        <nav className="mb-4 flex gap-2 overflow-x-auto md:mb-0 md:flex-col md:items-center md:rounded-[28px] md:bg-[#0a1733]/90 md:py-4">
          <SideBtn on={tab === "numeros"} label="Números" onClick={() => setTab("numeros")}>
            <IconHome />
          </SideBtn>
          {podeRel ? (
            <SideBtn on={tab === "relatorios"} label="Relatórios" onClick={() => setTab("relatorios")}>
              <IconList />
            </SideBtn>
          ) : null}
          {podePessoas ? (
            <SideBtn on={tab === "pessoas"} label="Pessoas" onClick={() => setTab("pessoas")}>
              <IconPeople />
            </SideBtn>
          ) : null}
          <SideBtn on={tab === "movimento"} label="Movimento" onClick={() => setTab("movimento")}>
            <IconList />
          </SideBtn>
        </nav>

        <div>
          <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-[32px] font-semibold leading-none md:text-[40px]">
                {agora ? saudacaoHora(agora.getHours()) : "Olá"},
                <span className="text-gold"> {nome}</span>
              </h1>
              <p className="mt-2 text-[13px] text-muted">
                {papel} · Cuidar · Formar · Enviar
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-[36px] leading-none md:text-[44px]">
                {agora
                  ? agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                  : "--:--"}
              </p>
              <p className="mt-1 text-[12px] capitalize text-muted">
                {agora
                  ? agora.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
                  : "Painel da comunidade"}
              </p>
            </div>
          </header>

          {tab === "numeros" ? (
            <NumerosGrid s={s} relatorios={relatorios} maxMin={maxMin} pctConv={pctConv} />
          ) : null}

          {tab === "relatorios" && podeRel ? (
            <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
              <form onSubmit={saveRel} className="dash-card grid h-fit gap-2">
                <p className="font-display text-2xl">Enviar relatório</p>
                <FieldSelect name="ministerio" required options={ministeriosPainel} />
                <input name="lider" required placeholder="Nome do líder" className="field" defaultValue={eu?.nome} />
                <input name="periodo" required placeholder="Período (ex.: Outubro 2026)" className="field" />
                <input name="presentes" type="number" min={0} placeholder="Presentes" className="field" />
                <input name="visitantes" type="number" min={0} placeholder="Visitantes" className="field" />
                <input name="decisoes" type="number" min={0} placeholder="Decisões / conversões" className="field" />
                <textarea name="observacao" rows={4} placeholder="O que Deus fez neste período" className="field" />
                <button className="btn-gold" type="submit">
                  Enviar à secretaria
                </button>
              </form>
              <div className="grid gap-3">
                {relatorios.map((r) => (
                  <article key={r.id} className="dash-card">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{r.ministerio}</p>
                    <h3 className="font-display text-2xl">{r.periodo}</h3>
                    <p className="meta">
                      {r.lider} · {r.quando}
                    </p>
                    <p className="mt-2 text-sm">
                      {r.presentes} presentes · {r.visitantes} visitantes · {r.decisoes} decisões
                    </p>
                    {r.observacao ? <p className="mt-2 text-sm text-[#d7e2f8]">{r.observacao}</p> : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {tab === "pessoas" && podePessoas ? (
            <PessoasAdmin
              eu={eu}
              membros={membros}
              onToggle={async (id, fn, on) => {
                await setFuncao(id, fn, on);
                await recarregar();
              }}
            />
          ) : null}

          {tab === "movimento" ? <MovimentoPainel membros={movimento} trilha={trilha} /> : null}
        </div>
      </div>
    </LeaderGate>
  );
}

function NumerosGrid({
  s,
  relatorios,
  maxMin,
  pctConv,
}: {
  s: ReturnType<typeof summarize>;
  relatorios: Relatorio[];
  maxMin: number;
  pctConv: number;
}) {
  const now = new Date();
  const tarefas = [
    { ok: s.queremIndicacao === 0, t: `${s.queremIndicacao} pedem indicação de célula`, href: "#pessoas" },
    { ok: s.semCelula === 0, t: `${s.semCelula} ainda sem célula`, href: "/celulas" },
    { ok: s.naoConvertidos === 0, t: `${s.naoConvertidos} para acompanhar na fé`, href: "#pessoas" },
    { ok: relatorios.length > 0, t: "Relatórios do mês no painel", href: "#relatorios" },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-12">
      <article className="dash-card md:col-span-4">
        <p className="mb-3 text-[13px] font-medium">Calendário</p>
        <MiniCalendario date={now} />
      </article>

      <article className="dash-card md:col-span-5">
        <p className="mb-3 text-[13px] font-medium">Agenda da comunidade</p>
        <ul className="space-y-2.5">
          {[
            { h: "10:00", t: "Culto da família", d: "Domingo · templo + online", c: "bg-[#7b6cff]" },
            { h: "19:00", t: "Culto da noite", d: "Domingo · templo", c: "bg-[#4ea0ff]" },
            { h: "20:00", t: "Culto de jovens", d: "Sábado · templo", c: "bg-[#3dce8a]" },
            { h: "19:00", t: "Culto de Pré Adolescentes", d: "às 19h · Templo", c: "bg-[#ff6b3d]" },
            { h: "Semana", t: "Células em casas", d: "Grupos nos bairros", c: "bg-gold" },
            { h: "Trilha", t: "Universidade da Família", d: "Formação contínua", c: "bg-[#3dce8a]" },
          ].map((x) => (
            <li key={x.t} className="flex gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5">
              <span className={`mt-1 h-8 w-1 rounded-full ${x.c}`} />
              <span className="w-14 shrink-0 text-[12px] text-muted">{x.h}</span>
              <span>
                <b className="block text-[13px] font-medium">{x.t}</b>
                <span className="text-[12px] text-muted">{x.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </article>

      <article className="dash-card flex flex-col items-center justify-center text-center md:col-span-3">
        <p className="self-start text-[13px] font-medium">Comunidade hoje</p>
        <p className="mt-4 font-display text-5xl text-gold">{s.total}</p>
        <p className="mt-1 text-sm text-muted">membros no cadastro</p>
        <p className="mt-4 text-[12px] text-[#d7e2f8]">
          {s.convertidos} convertidos · {s.filhos} crianças
        </p>
      </article>

      <article className="dash-card md:col-span-7">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-medium">Tarefas da liderança</p>
          <Link href="/celulas" className="rounded-full bg-[#7b6cff] px-3 py-1 text-[11px] font-semibold text-white">
            + Cuidar
          </Link>
        </div>
        <ul className="space-y-2">
          {tarefas.map((t) => (
            <li key={t.t} className="flex items-center gap-3 rounded-xl px-1 py-1.5 text-[13px]">
              <span
                className={`grid h-5 w-5 place-items-center rounded-full border ${
                  t.ok ? "border-[#3dce8a] bg-[#3dce8a] text-[#062] " : "border-white/20"
                }`}
              >
                {t.ok ? "✓" : ""}
              </span>
              <span className={t.ok ? "text-muted line-through" : ""}>{t.t}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="dash-card flex flex-col items-center justify-center md:col-span-5">
        <p className="self-start text-[13px] font-medium">Vidas convertidas</p>
        <Ring pct={pctConv} />
        <p className="mt-2 text-[13px] text-muted">{s.convertidos} de {s.total} no cadastro</p>
      </article>

      <article className="dash-card md:col-span-7">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-medium">Prazos e relatórios</p>
          <span className="text-[12px] text-muted">Ver todos</span>
        </div>
        <ul className="space-y-2">
          {relatorios.slice(0, 4).map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5">
              <span>
                <b className="block text-[13px]">{r.ministerio}</b>
                <span className="text-[12px] text-muted">
                  {r.periodo} · {r.presentes} presentes
                </span>
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  r.decisoes > 0 ? "bg-[#7b6cff]/30 text-[#c5b8ff]" : "bg-gold/20 text-gold"
                }`}
              >
                {r.decisoes > 0 ? "Alto" : "Médio"}
              </span>
            </li>
          ))}
        </ul>
      </article>

      <article className="dash-card md:col-span-5">
        <p className="mb-3 text-[13px] font-medium">Anotações dos líderes</p>
        <ul className="space-y-2 text-[13px] leading-relaxed text-[#d7e2f8]">
          {relatorios
            .filter((r) => r.observacao)
            .slice(0, 3)
            .map((r) => (
              <li key={r.id}>• {r.observacao}</li>
            ))}
        </ul>
      </article>

      <article className="dash-card md:col-span-7">
        <p className="mb-3 text-[13px] font-medium">Ministérios</p>
        <div className="grid gap-2">
          {s.porMinisterio
            .filter((m) => m.relatorios)
            .map((m) => (
              <div key={m.nome}>
                <div className="flex justify-between text-[12px]">
                  <span>{m.nome}</span>
                  <span className="text-gold">{m.presentes}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${(m.presentes / maxMin) * 100}%` }} />
                </div>
              </div>
            ))}
        </div>
      </article>

      <article className="dash-card md:col-span-5">
        <p className="mb-3 text-[13px] font-medium">Hábitos da comunidade</p>
        <ul className="space-y-2.5">
          {["Culto", "Células", "Jovens", "Famílias"].map((nome) => {
            const ok = (s.porMinisterio.find((m) => m.nome === nome)?.relatorios || 0) > 0;
            return (
              <li key={nome} className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-sm ${ok ? "bg-[#7b6cff]" : "bg-white/20"}`} />
                  {nome}
                </span>
                <span className="flex gap-1">
                  {DIAS.map((d, i) => (
                    <span
                      key={`${nome}-${i}`}
                      className={`h-4 w-4 rounded-full ${ok && i === 0 ? "bg-[#7b6cff]" : "border border-white/15"}`}
                    />
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
        <Link href="/palavra" className="mt-4 block rounded-xl bg-white/[0.04] px-3 py-3 text-[13px]">
          Áudios da liderança →
        </Link>
      </article>

      <article className="dash-card md:col-span-6">
        <p className="mb-3 text-[13px] font-medium">Células</p>
        <ul className="grid gap-1.5">
          {Object.entries(s.porCelula).map(([k, n]) => (
            <li key={k} className="flex justify-between text-[13px]">
              <span>{k}</span>
              <b className="text-gold">{n}</b>
            </li>
          ))}
        </ul>
      </article>
      <article className="dash-card md:col-span-6">
        <p className="mb-3 text-[13px] font-medium">Estado civil</p>
        <ul className="grid gap-1.5">
          {estadosCivis.map((e) => (
            <li key={e.id} className="flex justify-between text-[13px]">
              <span>{e.label}</span>
              <b className="text-gold">{s.porCivil[e.id] || 0}</b>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function MiniCalendario({ date }: { date: Date }) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const today = date.getDate();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  return (
    <div>
      <p className="mb-3 text-center text-[13px] capitalize text-muted">
        {MESES[m]} {y}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
        {DIAS.map((d, i) => (
          <span key={`${d}-${i}`}>{d}</span>
        ))}
        {cells.map((d, i) => {
          const sun = d && new Date(y, m, d).getDay() === 0;
          const on = d === today;
          return (
            <span
              key={i}
              className={`grid h-7 place-items-center rounded-full ${
                on ? "bg-[#7b6cff] text-white" : sun ? "text-gold" : d ? "text-[#d7e2f8]" : ""
              }`}
            >
              {d || ""}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Ring({ pct }: { pct: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div className="relative my-2 h-[132px] w-[132px]">
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="10" />
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="#b9a2ff"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <p className="font-display text-3xl">{pct}%</p>
      </div>
    </div>
  );
}

function SideBtn({
  on,
  label,
  onClick,
  children,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
        on ? "bg-[#7b6cff] text-white" : "text-muted hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function rotuloTipo(tipo: string) {
  const map: Record<string, string> = {
    culto: "Culto",
    celula_pedido: "Pedido de célula",
    celula_membro: "Célula",
    curso_inscricao: "Inscrição em curso",
    curso_conclusao: "Concluiu curso",
    checkin_kids: "Check-in kids",
    oracao: "Oração",
    quero_ir: "Quero fazer parte",
  };
  return map[tipo] || tipo;
}

function MovimentoPainel({ membros, trilha }: { membros: MembroMovimento[]; trilha: MovimentoRow[] }) {
  const semCelula = membros.filter((m) => !m.celula_nome || m.celula_nome === "Não frequento").length;
  const semCulto = membros.filter((m) => !m.cultos_90d).length;
  const emCurso = membros.filter((m) => m.cursos_ativos > 0).length;

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        <article className="dash-card">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Sem célula</p>
          <p className="font-display mt-1 text-4xl">{semCelula}</p>
          <p className="meta">membros para indicar</p>
        </article>
        <article className="dash-card">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Em curso</p>
          <p className="font-display mt-1 text-4xl">{emCurso}</p>
          <p className="meta">inscrições ativas</p>
        </article>
        <article className="dash-card">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Sem culto em 90 dias</p>
          <p className="font-display mt-1 text-4xl">{semCulto}</p>
          <p className="meta">para cuidar</p>
        </article>
      </div>

      <div className="overflow-x-auto rounded-[22px] border border-white/[0.08]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#0a1733] text-[11px] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3">Membro</th>
              <th className="px-4 py-3">Célula</th>
              <th className="px-4 py-3">Cursos</th>
              <th className="px-4 py-3">Cultos 90d</th>
              <th className="px-4 py-3">Último passo</th>
            </tr>
          </thead>
          <tbody>
            {membros.map((m) => (
              <tr key={m.id} className="border-t border-white/[0.06]">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{m.nome}</p>
                  <p className="meta">{m.bairro || m.cidade || m.email || "—"}</p>
                </td>
                <td className="px-4 py-3">
                  {m.celula_nome || "—"}
                  {m.celula_status ? <span className="meta"> · {m.celula_status}</span> : null}
                </td>
                <td className="px-4 py-3">
                  {m.cursos_ativos} ativo(s)
                  {m.cursos_concluidos ? ` · ${m.cursos_concluidos} concluído(s)` : ""}
                </td>
                <td className="px-4 py-3">{m.cultos_90d}</td>
                <td className="px-4 py-3 text-muted">
                  {m.ultimo_movimento
                    ? new Date(m.ultimo_movimento).toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!membros.length ? (
          <p className="px-4 py-6 text-sm text-muted">Rode a migration 004 no Supabase para ver o movimento dos membros.</p>
        ) : null}
      </div>

      <section>
        <h2 className="section-label">Últimos movimentos</h2>
        <div className="grid gap-2">
          {trilha.map((t) => (
            <article key={t.id} className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl border border-white/10 px-4 py-3">
              <p>
                <span className="text-gold">{rotuloTipo(t.tipo)}</span>
                <span className="text-white"> · {t.nome || "Alguém"}</span>
                {t.extra ? <span className="text-muted"> · {t.extra}</span> : null}
              </p>
              <p className="text-[12px] text-muted">
                {new Date(t.created_at).toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
              </p>
            </article>
          ))}
          {!trilha.length ? <p className="text-sm text-muted">Ainda não há inscrições, células ou check-ins gravados.</p> : null}
        </div>
      </section>
    </div>
  );
}

function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10.5 12 4l8 6.5V20h-6v-6H10v6H4z" />
    </svg>
  );
}
function IconList() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 7h12M8 12h12M8 17h8M4 7h.01M4 12h.01M4 17h.01" />
    </svg>
  );
}
function IconPeople() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3" />
      <path d="M4 19c.5-3 3-5 8-5s7.5 2 8 5" />
    </svg>
  );
}

function PessoasAdmin({
  eu,
  membros,
  onToggle,
}: {
  eu?: Membro;
  membros: Membro[];
  onToggle: (id: string, fn: FuncaoId, on: boolean) => Promise<void>;
}) {
  const podeLiberar = temFuncao(eu, "liberar");

  function toggle(m: Membro, fn: FuncaoId) {
    if (m.principal) return;
    const tem = (m.funcoes || []).includes(fn);
    void onToggle(m.id, fn, !tem);
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {membros.map((m) => (
        <article key={m.id} className="dash-card">
          <p className="font-display text-2xl">
            {m.nome}
            {m.principal ? <span className="ml-2 text-sm text-gold">adm principal</span> : null}
          </p>
          <p className="meta">
            {m.email || "sem e-mail"} · {maskCpf(m.cpf)} · {m.bairro} · {m.cidade}
          </p>
          <p className="meta">
            {m.celula}
            {m.querIndicacao ? " · quer indicação de célula" : ""} · convertido: {m.convertido ? "sim" : "não"}
          </p>
          <p className="meta">
            {estadosCivis.find((e) => e.id === m.estadoCivil)?.label}
            {m.tempoCasado ? ` · ${m.tempoCasado}` : ""}
            {m.temFilhos ? ` · ${m.qtdFilhos} filho(s)` : ""}
            {parseCursos(m.cursos).length ? ` · ${parseCursos(m.cursos).join("; ")}` : ""}
          </p>
          {podeLiberar ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {FUNCOES.map((f) => (
                <label key={f.id} className="flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    disabled={!!m.principal}
                    checked={m.principal || (m.funcoes || []).includes(f.id)}
                    onChange={() => toggle(m, f.id)}
                  />
                  {f.label}
                </label>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
