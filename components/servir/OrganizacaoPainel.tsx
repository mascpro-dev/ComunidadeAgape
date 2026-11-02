"use client";

import Link from "next/link";
import { useState } from "react";
import {
  adicionarDepartamento,
  adicionarFuncao,
  adicionarTag,
  definirConfirmacao,
  definirDescritivo,
  removerDepartamento,
  removerEquipe,
  removerFuncao,
  removerTag,
  renomearDepartamento,
  renomearFuncao,
  salvarEquipe,
  uid,
  type Equipe,
} from "@/lib/servir";
import { useServir } from "./ServirProvider";

const cartoes = [
  { href: "/servir/organizacao/departamentos", titulo: "Departamentos e funções", texto: "Ministérios e o que cada pessoa faz no culto." },
  { href: "/servir/organizacao/descritivo", titulo: "Descritivo da função", texto: "O que se espera de cada função no evento." },
  { href: "/servir/organizacao/times", titulo: "Times", texto: "Equipes prontas para aplicar numa escala." },
  { href: "/servir/organizacao/tags", titulo: "Tags", texto: "Etiquetas para filtrar voluntários e, depois, músicas." },
];

export function OrganizacaoHub() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-4xl leading-none">Organização</h1>
        <p className="page-lead">A base que a escala consulta.</p>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        {cartoes.map((c) => (
          <Link key={c.href} href={c.href} className="card hover:border-gold/30">
            <p className="font-display text-2xl leading-tight">{c.titulo}</p>
            <p className="meta">{c.texto}</p>
            <p className="mt-3 text-sm text-gold">Gerenciar</p>
          </Link>
        ))}
        <article className="card opacity-70">
          <p className="font-display text-2xl leading-tight">Painel</p>
          <p className="meta">Os indicadores de escala ficam para depois. O painel da igreja continua em Mais.</p>
        </article>
      </div>
    </div>
  );
}

export function DepartamentosPainel() {
  const { state, commit } = useServir();
  const [busca, setBusca] = useState("");
  const [nome, setNome] = useState("");
  const [aberto, setAberto] = useState<string | null>(null);
  const [novaFuncao, setNovaFuncao] = useState("");
  const lista = state.departamentos.filter((d) => d.nome.toLowerCase().includes(busca.trim().toLowerCase()));

  return (
    <div>
      <Voltar titulo="Departamentos" />
      <input className="field mb-4" placeholder="Pesquisar departamento" value={busca} onChange={(e) => setBusca(e.target.value)} />
      <ul className="grid gap-2">
        {lista.map((dep) => (
          <li key={dep.id} className="card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <input
                className="field max-w-sm"
                value={dep.nome}
                onChange={(e) => commit((s) => renomearDepartamento(s, dep.id, e.target.value))}
              />
              <button type="button" className="text-sm text-gold" onClick={() => setAberto(aberto === dep.id ? null : dep.id)}>
                {aberto === dep.id ? "Fechar funções" : "Gerenciar funções"}
              </button>
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={dep.confirmacaoAutomatica}
                onChange={(e) => commit((s) => definirConfirmacao(s, dep.id, e.target.checked))}
              />
              Confirmação automática ao notificar
            </label>
            {aberto === dep.id ? (
              <div className="mt-4 grid gap-2">
                {state.funcoes
                  .filter((f) => f.departamentoId === dep.id)
                  .map((f) => (
                    <div key={f.id} className="flex gap-2">
                      <input className="field" value={f.nome} onChange={(e) => commit((s) => renomearFuncao(s, f.id, e.target.value))} />
                      <button type="button" className="text-sm text-muted" onClick={() => commit((s) => removerFuncao(s, f.id))}>
                        Apagar
                      </button>
                    </div>
                  ))}
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    commit((s) => adicionarFuncao(s, dep.id, novaFuncao));
                    setNovaFuncao("");
                  }}
                >
                  <input className="field" placeholder="Nova função" value={novaFuncao} onChange={(e) => setNovaFuncao(e.target.value)} />
                  <button className="btn-gold" type="submit">
                    Incluir
                  </button>
                </form>
              </div>
            ) : null}
            <button type="button" className="mt-3 text-[12px] text-muted" onClick={() => commit((s) => removerDepartamento(s, dep.id))}>
              Apagar departamento
            </button>
          </li>
        ))}
      </ul>
      <form
        className="mt-4 flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          commit((s) => adicionarDepartamento(s, nome));
          setNome("");
        }}
      >
        <input className="field max-w-sm" placeholder="Novo departamento" value={nome} onChange={(e) => setNome(e.target.value)} />
        <button className="btn-gold" type="submit">
          Adicionar departamento
        </button>
      </form>
    </div>
  );
}

export function DescritivoPainel() {
  const { state, commit } = useServir();
  const [funcaoId, setFuncaoId] = useState(state.funcoes[0]?.id || "");
  const fun = state.funcoes.find((f) => f.id === funcaoId);

  return (
    <div>
      <Voltar titulo="Descritivo da função" />
      <select className="field mb-3" value={funcaoId} onChange={(e) => setFuncaoId(e.target.value)}>
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
      {fun ? (
        <textarea
          className="field min-h-40"
          placeholder="O que se espera desta função no culto"
          value={fun.descritivo}
          onChange={(e) => commit((s) => definirDescritivo(s, fun.id, e.target.value))}
        />
      ) : null}
      <p className="meta">O texto fica salvo enquanto você escreve.</p>
    </div>
  );
}

export function TimesPainel() {
  const { state, commit } = useServir();
  const [aberto, setAberto] = useState(false);
  const [equipe, setEquipe] = useState<Equipe | null>(null);

  function nova() {
    const departamentoId = state.departamentos[0]?.id || "";
    setEquipe({ id: uid(), nome: "", departamentoId, membros: [] });
    setAberto(true);
  }

  return (
    <div>
      <Voltar titulo="Equipes" />
      {state.equipes.length === 0 && !aberto ? (
        <article className="card">
          <p className="font-display text-2xl">Nenhuma equipe criada</p>
          <p className="meta">Monte um time com as pessoas de cada função e aplique na escala.</p>
        </article>
      ) : (
        <ul className="grid gap-2">
          {state.equipes.map((item) => (
            <li key={item.id} className="card flex items-center justify-between gap-3">
              <button
                type="button"
                className="text-left"
                onClick={() => {
                  setEquipe(item);
                  setAberto(true);
                }}
              >
                <p className="font-medium">{item.nome}</p>
                <p className="meta">{state.departamentos.find((d) => d.id === item.departamentoId)?.nome}</p>
              </button>
              <button type="button" className="text-sm text-muted" onClick={() => commit((s) => removerEquipe(s, item.id))}>
                Apagar
              </button>
            </li>
          ))}
        </ul>
      )}
      <button type="button" className="btn-gold mt-4" onClick={nova}>
        Adicionar nova equipe
      </button>
      {aberto && equipe ? (
        <form
          className="card mt-4 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!equipe.nome.trim()) return;
            commit((s) => salvarEquipe(s, { ...equipe, nome: equipe.nome.trim() }));
            setAberto(false);
          }}
        >
          <input className="field" placeholder="Nome da equipe" value={equipe.nome} onChange={(e) => setEquipe({ ...equipe, nome: e.target.value })} />
          <select
            className="field"
            value={equipe.departamentoId}
            onChange={(e) => setEquipe({ ...equipe, departamentoId: e.target.value, membros: [] })}
          >
            {state.departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
          {state.funcoes
            .filter((f) => f.departamentoId === equipe.departamentoId)
            .map((f) => {
              const atual = equipe.membros.find((m) => m.funcaoId === f.id)?.voluntarioId || "";
              return (
                <label key={f.id} className="grid gap-1 text-sm">
                  {f.nome}
                  <select
                    className="field"
                    value={atual}
                    onChange={(e) => {
                      const membros = equipe.membros.filter((m) => m.funcaoId !== f.id);
                      if (e.target.value) membros.push({ funcaoId: f.id, voluntarioId: e.target.value });
                      setEquipe({ ...equipe, membros });
                    }}
                  >
                    <option value="">Ninguém</option>
                    {state.voluntarios
                      .filter((v) => v.funcoes.includes(f.id))
                      .map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.nome}
                        </option>
                      ))}
                  </select>
                </label>
              );
            })}
          <button className="btn-gold" type="submit">
            Salvar equipe
          </button>
        </form>
      ) : null}
    </div>
  );
}

export function TagsPainel() {
  const { state, commit } = useServir();
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"voluntario" | "musica">("voluntario");

  return (
    <div>
      <Voltar titulo="Tags" />
      <form
        className="card grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          commit((s) => adicionarTag(s, nome, tipo));
          setNome("");
        }}
      >
        <input className="field" placeholder="Nome da tag" value={nome} onChange={(e) => setNome(e.target.value)} />
        <label className="flex items-start gap-2 text-sm">
          <input type="radio" name="tipo" checked={tipo === "voluntario"} onChange={() => setTipo("voluntario")} />
          <span>
            Voluntário
            <span className="mt-1 block text-muted">Destaca o perfil e entra no filtro da escala.</span>
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input type="radio" name="tipo" checked={tipo === "musica"} onChange={() => setTipo("musica")} />
          <span>
            Música
            <span className="mt-1 block text-muted">Fica guardada para o repertório, na próxima leva.</span>
          </span>
        </label>
        <button className="btn-gold" type="submit">
          Salvar
        </button>
      </form>
      <ul className="mt-4 grid gap-2">
        {state.tags.map((tag) => (
          <li key={tag.id} className="card flex items-center justify-between">
            <span>
              {tag.nome} <span className="text-muted">· {tag.tipo === "voluntario" ? "voluntário" : "música"}</span>
            </span>
            <button type="button" className="text-sm text-muted" onClick={() => commit((s) => removerTag(s, tag.id))}>
              Apagar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Voltar({ titulo }: { titulo: string }) {
  return (
    <header className="mb-6">
      <Link href="/servir/organizacao" className="text-sm text-gold">
        ← Organização
      </Link>
      <h1 className="mt-2 font-display text-4xl leading-none">{titulo}</h1>
    </header>
  );
}
