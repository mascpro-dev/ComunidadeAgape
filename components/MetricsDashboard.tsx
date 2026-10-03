"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { loadJson, saveJson } from "@/lib/client-store";
import { LeaderGate } from "./LeaderGate";
import {
  MEMBROS_KEY,
  RELATORIOS_KEY,
  estadosCivis,
  maskCpf,
  ministeriosPainel,
  parseCursos,
  seedMembros,
  seedRelatorios,
  summarize,
  type Membro,
  type Relatorio,
} from "@/lib/metrics";

export function MetricsDashboard() {
  const [tab, setTab] = useState<"numeros" | "relatorios" | "pessoas">("numeros");
  const [membros, setMembros] = useState<Membro[]>(seedMembros);
  const [relatorios, setRelatorios] = useState<Relatorio[]>(seedRelatorios);

  useEffect(() => {
    const m = loadJson(MEMBROS_KEY, seedMembros);
    const r = loadJson(RELATORIOS_KEY, seedRelatorios);
    if (!localStorage.getItem(MEMBROS_KEY)) saveJson(MEMBROS_KEY, m);
    if (!localStorage.getItem(RELATORIOS_KEY)) saveJson(RELATORIOS_KEY, r);
    setMembros(m);
    setRelatorios(r);
  }, []);

  const s = useMemo(() => summarize(membros, relatorios), [membros, relatorios]);
  const maxMin = Math.max(1, ...s.porMinisterio.map((m) => m.presentes));

  function saveRel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const next = [
      {
        id: crypto.randomUUID(),
        ministerio: String(d.get("ministerio")),
        lider: String(d.get("lider") || "").trim(),
        periodo: String(d.get("periodo") || "").trim(),
        presentes: Number(d.get("presentes") || 0),
        visitantes: Number(d.get("visitantes") || 0),
        decisoes: Number(d.get("decisoes") || 0),
        observacao: String(d.get("observacao") || "").trim(),
        quando: new Date().toLocaleDateString("pt-BR"),
      },
      ...relatorios,
    ];
    setRelatorios(next);
    saveJson(RELATORIOS_KEY, next);
    e.currentTarget.reset();
    setTab("numeros");
  }

  return (
    <LeaderGate title="Painel da casa">
      <div className="mb-6 flex flex-wrap gap-2">
        <button className={tab === "numeros" ? "btn-gold" : "btn-ghost"} onClick={() => setTab("numeros")}>
          Números
        </button>
        <button className={tab === "relatorios" ? "btn-gold" : "btn-ghost"} onClick={() => setTab("relatorios")}>
          Relatórios
        </button>
        <button className={tab === "pessoas" ? "btn-gold" : "btn-ghost"} onClick={() => setTab("pessoas")}>
          Pessoas
        </button>
      </div>

      {tab === "numeros" ? (
        <div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat t="Membros" n={s.total} />
            <Stat t="Convertidos" n={s.convertidos} />
            <Stat t="Sem célula" n={s.semCelula} />
            <Stat t="Querem indicação" n={s.queremIndicacao} />
            <Stat t="Famílias com filhos" n={s.comFilhos} />
            <Stat t="Crianças no cadastro" n={s.filhos} />
            <Stat t="Ainda não convertidos" n={s.naoConvertidos} />
            <Stat t="Relatórios no mês" n={relatorios.length} />
          </div>

          <h2 className="section-label mt-10">Ministérios</h2>
          <div className="grid gap-3">
            {s.porMinisterio.map((m) => (
              <article key={m.nome} className="card">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl">{m.nome}</h3>
                    <p className="meta">
                      {m.relatorios} relatório(s) · {m.presentes} presentes · {m.visitantes} visitantes · {m.decisoes}{" "}
                      decisões
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${(m.presentes / maxMin) * 100}%` }} />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="section-label">Células</h2>
              <ul className="grid gap-2">
                {Object.entries(s.porCelula).map(([k, n]) => (
                  <li key={k} className="flex justify-between rounded-xl border border-white/10 px-3 py-2 text-sm">
                    <span>{k}</span>
                    <b className="text-gold">{n}</b>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="section-label">Estado civil</h2>
              <ul className="grid gap-2">
                {estadosCivis.map((e) => (
                  <li key={e.id} className="flex justify-between rounded-xl border border-white/10 px-3 py-2 text-sm">
                    <span>{e.label}</span>
                    <b className="text-gold">{s.porCivil[e.id] || 0}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="section-label mt-10">Universidade da Família</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(s.porCurso).length ? (
              Object.entries(s.porCurso).map(([c, n]) => (
                <span key={c} className="rounded-full border border-gold/30 px-3 py-1 text-[13px]">
                  {c} · {n}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted">Nenhum curso registrado ainda.</p>
            )}
          </div>
        </div>
      ) : null}

      {tab === "relatorios" ? (
        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          <form onSubmit={saveRel} className="card grid h-fit gap-2">
            <p className="font-display text-2xl">Enviar relatório</p>
            <select name="ministerio" className="field" required>
              {ministeriosPainel.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <input name="lider" required placeholder="Nome do líder" className="field" />
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
              <article key={r.id} className="card">
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

      {tab === "pessoas" ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-[0.14em] text-muted">
              <tr>
                <th className="pb-3 pr-3">Nome</th>
                <th className="pb-3 pr-3">CPF</th>
                <th className="pb-3 pr-3">Bairro</th>
                <th className="pb-3 pr-3">Célula</th>
                <th className="pb-3 pr-3">Convertido</th>
                <th className="pb-3 pr-3">Família</th>
                <th className="pb-3">Cursos</th>
              </tr>
            </thead>
            <tbody>
              {membros.map((m) => (
                <tr key={m.id} className="border-t border-white/10">
                  <td className="py-3 pr-3">{m.nome}</td>
                  <td className="py-3 pr-3">{maskCpf(m.cpf)}</td>
                  <td className="py-3 pr-3">{m.bairro}</td>
                  <td className="py-3 pr-3">
                    {m.celula}
                    {m.querIndicacao ? <span className="block text-[11px] text-gold">quer indicação</span> : null}
                  </td>
                  <td className="py-3 pr-3">{m.convertido ? "Sim" : "Não"}</td>
                  <td className="py-3 pr-3">
                    {estadosCivis.find((e) => e.id === m.estadoCivil)?.label}
                    {m.tempoCasado ? ` · ${m.tempoCasado}` : ""}
                    {m.temFilhos ? ` · ${m.qtdFilhos} filho(s)` : ""}
                  </td>
                  <td className="py-3">{parseCursos(m.cursos).join("; ") || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </LeaderGate>
  );
}

function Stat({ t, n }: { t: string; n: number }) {
  return (
    <article className="card">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{t}</p>
      <p className="mt-2 font-display text-4xl text-gold">{n}</p>
    </article>
  );
}
