"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  adicionarVoluntarios,
  aplicarEquipe,
  atribuir,
  atualizarEvento,
  definirStatus,
  duplicarVaga,
  fmtQuando,
  gerarAutomatica,
  linkWhatsapp,
  motivoBloqueio,
  nomeDepartamento,
  notificarEvento,
  removerEvento,
  renomearVaga,
  saudeDaEscala,
  situacaoEvento,
  STATUS_LABEL,
  textoCadastro,
  textoEscala,
  type StatusEscala,
  type Vaga,
} from "@/lib/servir";
import { Modal } from "./Modal";
import { useServir } from "./ServirProvider";

type Aba = "info" | "escala" | "setlist" | "adicionais";

const COR: Record<StatusEscala, string> = {
  nao_notificado: "text-amber-300",
  aguardando: "text-muted",
  confirmado: "text-emerald-300",
  troca: "text-orange-300",
  presente: "text-sky-300",
};

export function EventoPainel({ eventoId }: { eventoId: string }) {
  const { state, commit } = useServir();
  const router = useRouter();
  const evento = state.eventos.find((e) => e.id === eventoId);
  const [aba, setAba] = useState<Aba>("escala");
  const [vagaId, setVagaId] = useState<string | null>(null);
  const [buscaPessoa, setBuscaPessoa] = useState("");
  const [tagId, setTagId] = useState("");
  const [saude, setSaude] = useState(false);
  const [avisos, setAvisos] = useState<{ nome: string; href: string }[] | null>(null);
  const [cadastro, setCadastro] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);
  const [rotulo, setRotulo] = useState("");
  const [equipeId, setEquipeId] = useState("");
  const [serie, setSerie] = useState(false);
  const [info, setInfo] = useState(
    evento
      ? { nome: evento.nome, data: evento.data, hora: evento.hora, descricao: evento.descricao, deps: evento.departamentoIds }
      : null,
  );

  const vaga = state.vagas.find((v) => v.id === vagaId) || null;

  const linhas = useMemo(() => {
    if (!evento) return [];
    const rows: { depId: string; vaga: Vaga }[] = [];
    for (const dep of state.departamentos) {
      if (!evento.departamentoIds.includes(dep.id)) continue;
      const funs = state.funcoes.filter((f) => f.departamentoId === dep.id);
      for (const fun of funs) {
        for (const item of state.vagas.filter((v) => v.eventoId === evento.id && v.funcaoId === fun.id)) {
          rows.push({ depId: dep.id, vaga: item });
        }
      }
    }
    return rows;
  }, [evento, state.departamentos, state.funcoes, state.vagas]);

  if (!evento || !info) {
    return (
      <article className="card">
        <p className="font-display text-2xl">Este culto não está mais aqui.</p>
        <Link href="/servir/escalas" className="btn-gold mt-4">
          Voltar às escalas
        </Link>
      </article>
    );
  }

  const equipes = state.equipes.filter((e) => evento.departamentoIds.includes(e.departamentoId));
  const pessoasDaVaga = vaga
    ? state.voluntarios.filter((v) => {
        const texto = buscaPessoa.trim().toLowerCase();
        if (texto && !v.nome.toLowerCase().includes(texto)) return false;
        if (tagId && !v.tags.includes(tagId)) return false;
        return true;
      })
    : [];
  const daFuncao = pessoasDaVaga.filter((v) => vaga && v.funcoes.includes(vaga.funcaoId));
  const outros = pessoasDaVaga.filter((v) => vaga && !v.funcoes.includes(vaga.funcaoId));

  function salvarInfo() {
    commit((s) => atualizarEvento(s, eventoId, { nome: info!.nome, data: info!.data, hora: info!.hora, descricao: info!.descricao }, info!.deps, serie));
  }

  function notificar() {
    const lista = state.vagas
      .filter((v) => v.eventoId === eventoId && v.voluntarioId && (v.status === "nao_notificado" || !v.status))
      .map((v) => {
        const pessoa = state.voluntarios.find((p) => p.id === v.voluntarioId);
        const href = pessoa ? linkWhatsapp(pessoa.ddi, pessoa.telefone, textoEscala(pessoa.nome, evento!, v.rotulo)) : "";
        return { nome: pessoa?.nome || "Sem nome", href };
      });
    commit((s) => notificarEvento(s, eventoId));
    setAvisos(lista);
  }

  function escolher(voluntarioId: string) {
    if (!vaga) return;
    commit((s) => atribuir(s, vaga.id, voluntarioId));
    setVagaId(null);
    setBuscaPessoa("");
  }

  let depAnterior = "";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/servir/escalas" className="text-sm text-gold">
            ← Escalas
          </Link>
          <h1 className="mt-2 font-display text-4xl leading-none">{evento.nome}</h1>
          <p className="meta">{fmtQuando(evento.data, evento.hora)} · {situacaoLabel(situacaoEvento(state, evento.id))}</p>
        </div>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            const apagarSerie = evento.serieId ? window.confirm("Apagar todos os cultos desta recorrência? Cancelar apaga só este.") : false;
            commit((s) => removerEvento(s, evento.id, apagarSerie));
            router.push("/servir/escalas");
          }}
        >
          Apagar
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        {(
          [
            ["info", "Informações"],
            ["escala", "Escalas"],
            ["setlist", "Setlist"],
            ["adicionais", "Adicionais"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setAba(id)}
            className={`rounded-xl border px-3 py-3 text-sm ${aba === id ? "border-gold/50 bg-white/10 text-gold" : "border-white/10 text-muted"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {aba === "info" ? (
        <div className="card grid gap-3">
          <label className="grid gap-1 text-sm">
            Nome
            <input className="field" value={info.nome} onChange={(e) => setInfo({ ...info, nome: e.target.value })} />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              Data
              <input className="field" type="date" value={info.data} onChange={(e) => setInfo({ ...info, data: e.target.value })} />
            </label>
            <label className="grid gap-1 text-sm">
              Hora
              <input className="field" type="time" value={info.hora} onChange={(e) => setInfo({ ...info, hora: e.target.value })} />
            </label>
          </div>
          <label className="grid gap-1 text-sm">
            Descrição
            <textarea className="field min-h-20" maxLength={2000} value={info.descricao} onChange={(e) => setInfo({ ...info, descricao: e.target.value })} />
          </label>
          <fieldset className="grid gap-2">
            <legend className="text-sm">Departamentos</legend>
            {state.departamentos.map((d) => (
              <label key={d.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={info.deps.includes(d.id)}
                  onChange={() =>
                    setInfo({
                      ...info,
                      deps: info.deps.includes(d.id) ? info.deps.filter((id) => id !== d.id) : [...info.deps, d.id],
                    })
                  }
                />
                {d.nome}
              </label>
            ))}
          </fieldset>
          {evento.serieId ? (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={serie} onChange={(e) => setSerie(e.target.checked)} />
              Aplicar nome, hora, descrição e departamentos a toda a recorrência
            </label>
          ) : null}
          <button type="button" className="btn-gold" onClick={salvarInfo}>
            Salvar informações
          </button>
        </div>
      ) : null}

      {aba === "escala" ? (
        <div className="grid gap-3">
          <button type="button" className="btn-gold w-full" onClick={() => commit((s) => gerarAutomatica(s, evento.id))}>
            Gerar escala automática
          </button>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-ghost" onClick={() => setSaude(true)}>
              Saúde da escala
            </button>
            <select className="field max-w-xs" value={tagId} onChange={(e) => setTagId(e.target.value)}>
              <option value="">Filtrar voluntário por tag</option>
              {state.tags
                .filter((t) => t.tipo === "voluntario")
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
            </select>
            {equipes.length ? (
              <>
                <select className="field max-w-xs" value={equipeId} onChange={(e) => setEquipeId(e.target.value)}>
                  <option value="">Equipe</option>
                  {equipes.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nome}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn-ghost"
                  disabled={!equipeId}
                  onClick={() => equipeId && commit((s) => aplicarEquipe(s, evento.id, equipeId))}
                >
                  Aplicar equipe
                </button>
              </>
            ) : null}
            <button type="button" className="btn-gold" onClick={notificar}>
              Notificar voluntários
            </button>
          </div>
          <p className="flex flex-wrap gap-3 text-[12px] text-muted">
            <span className="text-amber-300">Não notificado</span>
            <span className="text-muted">Aguardando</span>
            <span className="text-emerald-300">Confirmado</span>
            <span className="text-orange-300">Troca</span>
            <span className="text-sky-300">Presente</span>
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-3 py-3 font-medium">Função</th>
                  <th className="px-3 py-3 font-medium">
                    {fmtQuando(evento.data, evento.hora)}
                    <span className="mt-1 block normal-case tracking-normal text-ink">{evento.nome}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((linha) => {
                  const mostraDep = linha.depId !== depAnterior;
                  depAnterior = linha.depId;
                  const pessoa = state.voluntarios.find((v) => v.id === linha.vaga.voluntarioId);
                  return (
                    <tr key={linha.vaga.id} className="border-t border-white/10">
                      <td className="px-3 py-3 align-top">
                        {mostraDep ? (
                          <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-gold">{nomeDepartamento(state, linha.depId)}</p>
                        ) : null}
                        {editando === linha.vaga.id ? (
                          <form
                            className="flex gap-2"
                            onSubmit={(e) => {
                              e.preventDefault();
                              commit((s) => renomearVaga(s, linha.vaga.id, rotulo));
                              setEditando(null);
                            }}
                          >
                            <input className="field py-2" value={rotulo} onChange={(ev) => setRotulo(ev.target.value)} />
                            <button className="btn-gold px-3" type="submit">
                              Ok
                            </button>
                          </form>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{linha.vaga.rotulo}</span>
                            <button
                              type="button"
                              className="text-[12px] text-muted"
                              onClick={() => {
                                setEditando(linha.vaga.id);
                                setRotulo(linha.vaga.rotulo);
                              }}
                            >
                              Renomear
                            </button>
                            <button type="button" className="text-[12px] text-muted" onClick={() => commit((s) => duplicarVaga(s, linha.vaga.id))}>
                              Duplicar
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-left hover:border-gold/40"
                          onClick={() => {
                            setVagaId(linha.vaga.id);
                            setBuscaPessoa("");
                          }}
                        >
                          <span aria-hidden>⌕</span>
                          <span className={pessoa && linha.vaga.status ? COR[linha.vaga.status] : "text-muted"}>
                            {pessoa ? `${pessoa.nome} · ${STATUS_LABEL[linha.vaga.status || "nao_notificado"]}` : "Voluntário"}
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-muted">A escala fica salva neste navegador.</p>
        </div>
      ) : null}

      {aba === "setlist" ? (
        <article className="card">
          <p className="font-display text-2xl">Setlist do culto</p>
          <p className="meta">
            A lista de músicas, tom, BPM e o arquivo do Holyrics entram na próxima leva. A grade de quem serve já funciona na aba Escalas.
          </p>
        </article>
      ) : null}

      {aba === "adicionais" ? (
        <article className="card">
          <p className="font-display text-2xl">Cronograma e paleta</p>
          <p className="meta">O roteiro do culto e a cor da roupa ficam para a leva seguinte. A permissão de quem edita isso também.</p>
        </article>
      ) : null}

      {vaga ? (
        <Modal title="Selecionar voluntário" onClose={() => setVagaId(null)} wide>
          <input className="field" placeholder="Pesquisar" value={buscaPessoa} onChange={(e) => setBuscaPessoa(e.target.value)} />
          <ListaPessoas titulo="Desta função" pessoas={daFuncao} state={state} evento={evento} vaga={vaga} onEscolher={escolher} />
          <ListaPessoas titulo="Outros voluntários" pessoas={outros} state={state} evento={evento} vaga={vaga} onEscolher={escolher} />
          {vaga.voluntarioId ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {(["confirmado", "aguardando", "troca", "presente"] as StatusEscala[]).map((status) => (
                <button key={status} type="button" className="btn-ghost" onClick={() => commit((s) => definirStatus(s, vaga.id, status))}>
                  {STATUS_LABEL[status]}
                </button>
              ))}
              <button type="button" className="btn-ghost" onClick={() => escolherVazio(commit, vaga.id, () => setVagaId(null))}>
                Tirar da escala
              </button>
            </div>
          ) : null}
          <button type="button" className="btn-gold mt-4 w-full" onClick={() => setCadastro(true)}>
            Adicionar novo voluntário
          </button>
        </Modal>
      ) : null}

      {cadastro && vaga ? (
        <CadastroRapido
          funcaoInicial={vaga.funcaoId}
          onClose={() => setCadastro(false)}
          onSalvo={(id) => commit((s) => atribuir(s, vaga.id, id))}
        />
      ) : null}

      {saude ? (
        <Modal title="Saúde da escala" onClose={() => setSaude(false)}>
          <p className="text-sm text-muted">
            Dias nesta semana. O limite configurado é {state.config.limiteDias}. Dois cultos no mesmo dia contam como um.
          </p>
          <ul className="mt-3 grid gap-2">
            {saudeDaEscala(state, evento.data).map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>{item.nome}</span>
                <span className={item.dias > state.config.limiteDias ? "text-gold" : "text-muted"}>
                  {item.dias} {item.dias === 1 ? "dia" : "dias"}
                </span>
              </li>
            ))}
            {saudeDaEscala(state, evento.data).length === 0 ? <li className="text-sm text-muted">Ninguém escalado nesta semana.</li> : null}
          </ul>
        </Modal>
      ) : null}

      {avisos ? (
        <Modal title="Avisar no WhatsApp" onClose={() => setAvisos(null)}>
          <p className="text-sm text-muted">A escala foi fechada. Cada botão abre a mensagem pronta, com data e função. Quem envia é você.</p>
          <ul className="mt-3 grid gap-2">
            {avisos.length === 0 ? <li className="text-sm text-muted">Não havia ninguém novo para avisar.</li> : null}
            {avisos.map((aviso) => (
              <li key={aviso.nome + aviso.href}>
                {aviso.href ? (
                  <a className="btn-gold w-full" href={aviso.href} target="_blank" rel="noreferrer">
                    WhatsApp de {aviso.nome}
                  </a>
                ) : (
                  <p className="text-sm text-muted">{aviso.nome} está sem telefone.</p>
                )}
              </li>
            ))}
          </ul>
        </Modal>
      ) : null}
    </div>
  );
}

function situacaoLabel(id: "vazia" | "pre" | "concluida") {
  if (id === "concluida") return "Escala concluída";
  if (id === "pre") return "Pré-escala";
  return "Ainda sem pessoas";
}

function escolherVazio(commit: (fn: (s: import("@/lib/servir").ServirState) => import("@/lib/servir").ServirState) => void, vagaId: string, fechar: () => void) {
  commit((s) => atribuir(s, vagaId, null));
  fechar();
}

function ListaPessoas({
  titulo,
  pessoas,
  state,
  evento,
  vaga,
  onEscolher,
}: {
  titulo: string;
  pessoas: { id: string; nome: string; ddi: string; telefone: string }[];
  state: ReturnType<typeof useServir>["state"];
  evento: NonNullable<ReturnType<typeof useServir>["state"]["eventos"][number]>;
  vaga: Vaga;
  onEscolher: (id: string) => void;
}) {
  if (!pessoas.length) return null;
  return (
    <div className="mt-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{titulo}</p>
      <ul className="mt-2 grid gap-2">
        {pessoas.map((pessoa) => {
          const aviso = motivoBloqueio(state, pessoa.id, evento, vaga.funcaoId, vaga.id);
          return (
            <li key={pessoa.id}>
              <button type="button" className="w-full rounded-xl border border-white/10 px-3 py-2 text-left hover:border-gold/40" onClick={() => onEscolher(pessoa.id)}>
                <span className="block text-sm">{pessoa.nome}</span>
                {aviso ? <span className="text-[12px] text-gold">{aviso}. Dá para escalar mesmo assim.</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CadastroRapido({
  funcaoInicial,
  onClose,
  onSalvo,
}: {
  funcaoInicial: string;
  onClose: () => void;
  onSalvo: (id: string) => void;
}) {
  const { state, commit } = useServir();
  const [linhas, setLinhas] = useState([{ nome: "", telefone: "", funcaoId: funcaoInicial }]);
  const [links, setLinks] = useState<{ nome: string; href: string }[]>([]);

  function salvar() {
    const validos = linhas.filter((l) => l.nome.trim() && l.funcaoId);
    if (!validos.length) return;
    let primeiro = "";
    commit((s) => {
      const criado = adicionarVoluntarios(
        s,
        validos.map((l) => ({ nome: l.nome, telefone: l.telefone, ddi: "55", funcaoId: l.funcaoId })),
      );
      primeiro = criado.ids[0] || "";
      return criado.state;
    });
    setLinks(
      validos.map((l) => ({
        nome: l.nome.trim(),
        href: linkWhatsapp("55", l.telefone, textoCadastro(l.nome.trim(), state.funcoes.find((f) => f.id === l.funcaoId)?.nome || "Servir")),
      })),
    );
    if (primeiro) onSalvo(primeiro);
  }

  return (
    <Modal title="Cadastro rápido" onClose={onClose}>
      {links.length ? (
        <ul className="grid gap-2">
          {links.map((link) => (
            <li key={link.nome}>
              {link.href ? (
                <a className="btn-gold w-full" href={link.href} target="_blank" rel="noreferrer">
                  WhatsApp para {link.nome} concluir
                </a>
              ) : (
                <p className="text-sm text-muted">{link.nome} foi salvo sem telefone.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-3">
          {linhas.map((linha, index) => (
            <div key={index} className="grid gap-2 rounded-xl border border-white/10 p-3">
              <p className="text-[12px] text-muted">
                Voluntário {index + 1} de {linhas.length}
              </p>
              <input
                className="field"
                placeholder="Nome completo"
                value={linha.nome}
                onChange={(e) => setLinhas(linhas.map((item, i) => (i === index ? { ...item, nome: e.target.value } : item)))}
              />
              <input
                className="field"
                placeholder="WhatsApp com DDD"
                value={linha.telefone}
                onChange={(e) => setLinhas(linhas.map((item, i) => (i === index ? { ...item, telefone: e.target.value } : item)))}
              />
              <select
                className="field"
                value={linha.funcaoId}
                onChange={(e) => setLinhas(linhas.map((item, i) => (i === index ? { ...item, funcaoId: e.target.value } : item)))}
              >
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
            </div>
          ))}
          <p className="text-[12px] text-gold">O WhatsApp abre com o texto para a pessoa confirmar o cadastro.</p>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setLinhas([...linhas, { nome: "", telefone: "", funcaoId: funcaoInicial }])}
          >
            + Adicionar outro voluntário
          </button>
          <button type="button" className="btn-gold" onClick={salvar}>
            Salvar
          </button>
        </div>
      )}
    </Modal>
  );
}
