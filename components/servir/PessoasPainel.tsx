"use client";

import { useState } from "react";
import {
  adicionarVoluntarios,
  atualizarVoluntario,
  DIAS,
  disponibilidadeCheia,
  linkWhatsapp,
  patchConfig,
  PERIODO_LABEL,
  removerVoluntario,
  textoCadastro,
  validarFuncaoVoluntario,
  type Bloqueio,
  type Periodo,
  type Voluntario,
} from "@/lib/servir";
import { Modal } from "./Modal";
import { useServir } from "./ServirProvider";

const PERIODOS: Periodo[] = ["manha", "tarde", "noite"];

export function PessoasPainel() {
  const { state, commit } = useServir();
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);
  const lista = state.voluntarios
    .filter((v) => v.nome.toLowerCase().includes(busca.trim().toLowerCase()))
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  const pessoa = state.voluntarios.find((v) => v.id === editando) || null;

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl leading-none">Pessoas</h1>
          <p className="page-lead">Quem pode servir, em qual função, e os dias em que não pode.</p>
        </div>
        <button type="button" className="btn-gold" onClick={() => setAberto(true)}>
          + Voluntário
        </button>
      </header>
      <input className="field mb-4" placeholder="Pesquisar" value={busca} onChange={(e) => setBusca(e.target.value)} />
      {lista.length === 0 ? (
        <article className="card">
          <p className="font-display text-2xl">Ninguém cadastrado ainda</p>
          <p className="meta">Dá para incluir a pessoa daqui ou direto na lupa da escala.</p>
        </article>
      ) : (
        <ul className="grid gap-2">
          {lista.map((v) => (
            <li key={v.id}>
              <button type="button" className="card w-full text-left hover:border-gold/30" onClick={() => setEditando(v.id)}>
                <p className="font-medium">{v.nome}</p>
                <p className="meta">
                  {v.funcoes.map((id) => state.funcoes.find((f) => f.id === id)?.nome).filter(Boolean).join(" · ") || "Sem função validada"}
                  {v.funcoesPendentes.length ? " · aguardando validação" : ""}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
      {aberto ? <NovoVoluntario onClose={() => setAberto(false)} /> : null}
      {pessoa ? <Editor pessoa={pessoa} onClose={() => setEditando(null)} /> : null}
    </div>
  );
}

function NovoVoluntario({ onClose }: { onClose: () => void }) {
  const { state, commit } = useServir();
  const primeira = state.funcoes[0]?.id || "";
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [funcaoId, setFuncaoId] = useState(primeira);
  const [link, setLink] = useState("");
  const [salvo, setSalvo] = useState(false);

  function salvar() {
    if (!nome.trim() || !funcaoId) return;
    const funcao = state.funcoes.find((f) => f.id === funcaoId)?.nome || "Servir";
    commit((s) => adicionarVoluntarios(s, [{ nome, telefone, ddi: "55", funcaoId }]).state);
    setLink(linkWhatsapp("55", telefone, textoCadastro(nome.trim(), funcao)));
    setSalvo(true);
  }

  return (
    <Modal title="Cadastro rápido" onClose={onClose}>
      {salvo ? (
        link ? (
          <a className="btn-gold w-full" href={link} target="_blank" rel="noreferrer">
            Abrir WhatsApp para concluir
          </a>
        ) : (
          <p className="text-sm text-muted">{nome.trim()} foi salvo. Sem telefone, o WhatsApp não abre.</p>
        )
      ) : (
        <div className="grid gap-3">
          <input className="field" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input className="field" placeholder="WhatsApp com DDD" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          <select className="field" value={funcaoId} onChange={(e) => setFuncaoId(e.target.value)}>
            {state.departamentos.map((dep) => (
              <optgroup key={dep.id} label={dep.nome}>
                {state.funcoes
                  .filter((f) => f.departamentoId === dep.id)
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.nome}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          <button type="button" className="btn-gold" onClick={salvar}>
            Salvar
          </button>
        </div>
      )}
    </Modal>
  );
}

function Editor({ pessoa, onClose }: { pessoa: Voluntario; onClose: () => void }) {
  const { state, commit } = useServir();
  const [bloqueio, setBloqueio] = useState({ inicio: "", fim: "", motivo: "" });

  function patch(parcial: Partial<Voluntario>) {
    commit((s) => atualizarVoluntario(s, pessoa.id, parcial));
  }

  function alternarFuncao(id: string) {
    const tem = pessoa.funcoes.includes(id);
    patch({
      funcoes: tem ? pessoa.funcoes.filter((f) => f !== id) : [...pessoa.funcoes, id],
      funcoesPendentes: pessoa.funcoesPendentes.filter((f) => f !== id),
    });
  }

  function alternarPeriodo(dia: string, periodo: Periodo) {
    const base = pessoa.disponibilidade[dia] || { manha: true, tarde: true, noite: true };
    patch({
      disponibilidade: {
        ...disponibilidadeCheia(),
        ...pessoa.disponibilidade,
        [dia]: { ...base, [periodo]: !base[periodo] },
      },
    });
  }

  function incluirBloqueio() {
    if (!bloqueio.inicio) return;
    const item: Bloqueio = {
      id: `${Date.now()}`,
      inicio: bloqueio.inicio,
      fim: bloqueio.fim || bloqueio.inicio,
      motivo: bloqueio.motivo.trim(),
    };
    patch({ bloqueios: [...pessoa.bloqueios, item] });
    setBloqueio({ inicio: "", fim: "", motivo: "" });
  }

  const cadastro = linkWhatsapp(
    pessoa.ddi,
    pessoa.telefone,
    textoCadastro(pessoa.nome, pessoa.funcoes.map((id) => state.funcoes.find((f) => f.id === id)?.nome).filter(Boolean).join(", ") || "Servir"),
  );

  return (
    <Modal title={pessoa.nome} onClose={onClose} wide>
      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="field" value={pessoa.nome} onChange={(e) => patch({ nome: e.target.value })} />
          <input className="field" placeholder="WhatsApp" value={pessoa.telefone} onChange={(e) => patch({ telefone: e.target.value })} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => commit((s) => patchConfig(s, { euVoluntarioId: s.config.euVoluntarioId === pessoa.id ? null : pessoa.id }))}
          >
            {state.config.euVoluntarioId === pessoa.id ? "Este sou eu neste aparelho" : "Marcar como eu neste aparelho"}
          </button>
          {cadastro ? (
            <a className="btn-gold" href={cadastro} target="_blank" rel="noreferrer">
              WhatsApp do cadastro
            </a>
          ) : null}
        </div>
        <fieldset>
          <legend className="text-sm">Funções</legend>
          <div className="mt-2 grid gap-3">
            {state.departamentos.map((dep) => (
              <div key={dep.id}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold">{dep.nome}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {state.funcoes
                    .filter((f) => f.departamentoId === dep.id)
                    .map((f) => (
                      <label key={f.id} className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[13px]">
                        <input type="checkbox" checked={pessoa.funcoes.includes(f.id)} onChange={() => alternarFuncao(f.id)} />
                        {f.nome}
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        {pessoa.funcoesPendentes.length ? (
          <div>
            <p className="text-sm">Funções para validar</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {pessoa.funcoesPendentes.map((id) => (
                <button key={id} type="button" className="btn-gold" onClick={() => commit((s) => validarFuncaoVoluntario(s, pessoa.id, id))}>
                  Validar {state.funcoes.find((f) => f.id === id)?.nome}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {state.tags.some((t) => t.tipo === "voluntario") ? (
          <div className="flex flex-wrap gap-2">
            {state.tags
              .filter((t) => t.tipo === "voluntario")
              .map((tag) => (
                <label key={tag.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={pessoa.tags.includes(tag.id)}
                    onChange={() =>
                      patch({
                        tags: pessoa.tags.includes(tag.id) ? pessoa.tags.filter((t) => t !== tag.id) : [...pessoa.tags, tag.id],
                      })
                    }
                  />
                  {tag.nome}
                </label>
              ))}
          </div>
        ) : null}
        <div>
          <p className="text-sm">Dias em que pode servir</p>
          <div className="mt-2 grid gap-2">
            {DIAS.map((dia, index) => (
              <div key={dia} className="flex flex-wrap items-center gap-3 text-sm">
                <span className="w-24 text-muted">{dia}</span>
                {PERIODOS.map((periodo) => (
                  <label key={periodo} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={Boolean(pessoa.disponibilidade[String(index)]?.[periodo])}
                      onChange={() => alternarPeriodo(String(index), periodo)}
                    />
                    {PERIODO_LABEL[periodo]}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm">Bloqueio de datas</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <input className="field" type="date" value={bloqueio.inicio} onChange={(e) => setBloqueio({ ...bloqueio, inicio: e.target.value })} />
            <input className="field" type="date" value={bloqueio.fim} onChange={(e) => setBloqueio({ ...bloqueio, fim: e.target.value })} />
            <input className="field" placeholder="Motivo" value={bloqueio.motivo} onChange={(e) => setBloqueio({ ...bloqueio, motivo: e.target.value })} />
          </div>
          <button type="button" className="btn-ghost mt-2" onClick={incluirBloqueio}>
            Bloquear período
          </button>
          <ul className="mt-2 grid gap-1 text-sm text-muted">
            {pessoa.bloqueios.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-2">
                <span>
                  {b.inicio.split("-").reverse().join("/")} até {b.fim.split("-").reverse().join("/")} {b.motivo}
                </span>
                <button type="button" onClick={() => patch({ bloqueios: pessoa.bloqueios.filter((item) => item.id !== b.id) })}>
                  tirar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="text-sm text-gold"
          onClick={() => {
            commit((s) => removerVoluntario(s, pessoa.id));
            onClose();
          }}
        >
          Remover esta pessoa
        </button>
      </div>
    </Modal>
  );
}
