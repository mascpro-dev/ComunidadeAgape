"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  criarEventos,
  fmtData,
  isoHoje,
  situacaoEvento,
  somaDias,
  type Frequencia,
} from "@/lib/servir";
import { Modal } from "./Modal";
import { useServir } from "./ServirProvider";

const SITUACAO = {
  vazia: "Sem escala",
  pre: "Pré-escala",
  concluida: "Concluída",
};

export function EscalasPainel() {
  const { state, commit } = useServir();
  const router = useRouter();
  const [aberto, setAberto] = useState(false);
  const [passo, setPasso] = useState<"recorrencia" | "dados">("recorrencia");
  const [comRecorrencia, setComRecorrencia] = useState(false);
  const [frequencia, setFrequencia] = useState<Frequencia>("semanal");
  const [ate, setAte] = useState(somaDias(isoHoje(), 90));
  const [nome, setNome] = useState("Culto de domingo");
  const [data, setData] = useState(isoHoje());
  const [hora, setHora] = useState("10:00");
  const [descricao, setDescricao] = useState("");
  const [deps, setDeps] = useState<string[]>(state.departamentos.map((d) => d.id));
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroDep, setFiltroDep] = useState("");
  const [filtroSit, setFiltroSit] = useState("");

  const eventos = useMemo(() => {
    return state.eventos
      .filter((e) => !busca || e.nome.toLowerCase().includes(busca.trim().toLowerCase()))
      .filter((e) => !filtroDep || e.departamentoIds.includes(filtroDep))
      .filter((e) => !filtroSit || situacaoEvento(state, e.id) === filtroSit)
      .slice()
      .sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora));
  }, [state, busca, filtroDep, filtroSit]);

  function abrir() {
    setPasso("recorrencia");
    setComRecorrencia(false);
    setErro("");
    setDeps(state.departamentos.map((d) => d.id));
    setAberto(true);
  }

  function marcarDep(id: string) {
    setDeps((lista) => (lista.includes(id) ? lista.filter((item) => item !== id) : [...lista, id]));
  }

  function salvar() {
    if (!nome.trim()) {
      setErro("Dê um nome ao culto.");
      return;
    }
    if (!deps.length) {
      setErro("Escolha ao menos um departamento.");
      return;
    }
    if (comRecorrencia && ate < data) {
      setErro("A data final precisa ser igual ou posterior à primeira data.");
      return;
    }
    const criado = criarEventos(state, {
      nome,
      data,
      hora,
      descricao,
      departamentoIds: deps,
      recorrencia: comRecorrencia ? { frequencia, ate } : undefined,
    });
    commit(() => criado.state);
    setAberto(false);
    router.push(`/servir/escalas/${criado.id}`);
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl leading-none">Escala rápida</h1>
          <p className="page-lead">Crie o culto e monte quem serve em cada função.</p>
        </div>
      </header>

      {state.eventos.length > 0 ? (
        <div className="mb-4 grid gap-2 md:grid-cols-[1fr_180px_180px]">
          <input className="field" placeholder="Buscar culto" value={busca} onChange={(e) => setBusca(e.target.value)} />
          <select className="field" value={filtroDep} onChange={(e) => setFiltroDep(e.target.value)}>
            <option value="">Todos os departamentos</option>
            {state.departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
          <select className="field" value={filtroSit} onChange={(e) => setFiltroSit(e.target.value)}>
            <option value="">Todas as situações</option>
            <option value="vazia">Sem escala</option>
            <option value="pre">Pré-escala</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>
      ) : null}

      {eventos.length === 0 ? (
        <article className="card mx-auto max-w-md text-center">
          <p className="font-display text-3xl">Crie um evento</p>
          <p className="meta mx-auto">Comece criando um evento para montar as escalas e organizar os voluntários.</p>
          <button type="button" className="btn-gold mt-4" onClick={abrir}>
            + Criar evento
          </button>
        </article>
      ) : (
        <div className="grid gap-3">
          <div className="flex justify-end">
            <button type="button" className="btn-gold" onClick={abrir}>
              + Criar evento
            </button>
          </div>
          {eventos.map((evento) => (
            <button
              key={evento.id}
              type="button"
              onClick={() => router.push(`/servir/escalas/${evento.id}`)}
              className="card text-left hover:border-gold/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-2xl leading-tight">{evento.nome}</p>
                  <p className="meta">
                    {fmtData(evento.data)} · {evento.hora}
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.16em] text-gold">{SITUACAO[situacaoEvento(state, evento.id)]}</span>
              </div>
              <p className="mt-2 text-[13px] text-muted">
                {evento.departamentoIds.map((id) => state.departamentos.find((d) => d.id === id)?.nome).filter(Boolean).join(" · ") || "Sem departamento"}
              </p>
            </button>
          ))}
        </div>
      )}

      {aberto ? (
        <Modal title={passo === "recorrencia" ? "Novo evento" : "Informações"} onClose={() => setAberto(false)}>
          {passo === "recorrencia" ? (
            <>
              <p className="text-sm text-muted">Se a recorrência não for selecionada, será criado apenas um evento.</p>
              <label className="mt-4 flex items-center gap-3 text-sm">
                <input type="checkbox" checked={comRecorrencia} onChange={(e) => setComRecorrencia(e.target.checked)} />
                Criar um evento com recorrência
              </label>
              <button type="button" className="btn-gold mt-5 w-full" onClick={() => setPasso("dados")}>
                Avançar
              </button>
            </>
          ) : (
            <div className="grid gap-3">
              {comRecorrencia ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-sm">
                    Repete
                    <select className="field" value={frequencia} onChange={(e) => setFrequencia(e.target.value as Frequencia)}>
                      <option value="semanal">Toda semana</option>
                      <option value="quinzenal">A cada 15 dias</option>
                      <option value="mensal">Todo mês</option>
                    </select>
                  </label>
                  <label className="grid gap-1 text-sm">
                    Até
                    <input className="field" type="date" value={ate} onChange={(e) => setAte(e.target.value)} />
                  </label>
                </div>
              ) : null}
              <label className="grid gap-1 text-sm">
                Nome
                <input className="field" value={nome} onChange={(e) => setNome(e.target.value)} />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1 text-sm">
                  Data
                  <input className="field" type="date" value={data} onChange={(e) => setData(e.target.value)} />
                </label>
                <label className="grid gap-1 text-sm">
                  Hora
                  <input className="field" type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                </label>
              </div>
              <label className="grid gap-1 text-sm">
                Descrição
                <textarea className="field min-h-20" maxLength={2000} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                <span className="text-right text-[11px] text-muted">{descricao.length}/2000</span>
              </label>
              <fieldset className="grid gap-2">
                <legend className="text-sm">Departamentos</legend>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={deps.length === state.departamentos.length}
                    onChange={(e) => setDeps(e.target.checked ? state.departamentos.map((d) => d.id) : [])}
                  />
                  Todos
                </label>
                {state.departamentos.map((d) => (
                  <label key={d.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={deps.includes(d.id)} onChange={() => marcarDep(d.id)} />
                    {d.nome}
                  </label>
                ))}
              </fieldset>
              {erro ? <p className="text-sm text-gold">{erro}</p> : null}
              <div className="flex gap-2">
                <button type="button" className="btn-ghost" onClick={() => setPasso("recorrencia")}>
                  Voltar
                </button>
                <button type="button" className="btn-gold flex-1" onClick={salvar}>
                  Criar escala
                </button>
              </div>
            </div>
          )}
        </Modal>
      ) : null}
    </div>
  );
}
