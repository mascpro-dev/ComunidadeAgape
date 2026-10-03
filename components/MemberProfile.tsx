"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { celulas, cursos } from "@/lib/content";
import { loadJson, saveJson } from "@/lib/client-store";
import {
  MEU_PERFIL_KEY,
  MEMBROS_KEY,
  estadosCivis,
  seedMembros,
  type EstadoCivil,
  type Membro,
} from "@/lib/metrics";

const empty: Omit<Membro, "id" | "atualizado"> = {
  nome: "",
  cpf: "",
  endereco: "",
  bairro: "",
  cep: "",
  cidade: "",
  celula: "Não frequento",
  querIndicacao: true,
  convertido: false,
  cursos: "",
  temFilhos: false,
  qtdFilhos: 0,
  estadoCivil: "solteiro",
  tempoCasado: "",
};

export function MemberProfile() {
  const [membros, setMembros] = useState<Membro[]>(seedMembros);
  const [meuId, setMeuId] = useState("");
  const [form, setForm] = useState(empty);
  const [ok, setOk] = useState("");

  useEffect(() => {
    const all = loadJson(MEMBROS_KEY, seedMembros);
    if (!localStorage.getItem(MEMBROS_KEY)) saveJson(MEMBROS_KEY, all);
    setMembros(all);
    const id = localStorage.getItem(MEU_PERFIL_KEY) || "";
    setMeuId(id);
    const mine = all.find((m) => m.id === id);
    if (mine) {
      const { id: _i, atualizado: _a, ...rest } = mine;
      setForm(rest);
    }
  }, []);

  const casado = form.estadoCivil === "casado" || form.estadoCivil === "uniao";
  const semCelula = form.celula === "Não frequento";
  const listaCursos = useMemo(() => form.cursos.split(";").map((c) => c.trim()).filter(Boolean), [form.cursos]);

  function set<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addCurso(nome: string) {
    if (listaCursos.includes(nome)) return;
    set("cursos", [...listaCursos, nome].join("; "));
  }

  function save(e: FormEvent) {
    e.preventDefault();
    const id = meuId || crypto.randomUUID();
    const membro: Membro = {
      ...form,
      id,
      qtdFilhos: form.temFilhos ? Number(form.qtdFilhos) || 0 : 0,
      tempoCasado: casado ? form.tempoCasado : "",
      querIndicacao: semCelula ? form.querIndicacao : false,
      atualizado: new Date().toLocaleDateString("pt-BR"),
    };
    const next = membros.some((m) => m.id === id)
      ? membros.map((m) => (m.id === id ? membro : m))
      : [membro, ...membros];
    setMembros(next);
    saveJson(MEMBROS_KEY, next);
    localStorage.setItem(MEU_PERFIL_KEY, id);
    setMeuId(id);
    setOk("Perfil salvo. A liderança vê estes dados no painel.");
  }

  return (
    <form onSubmit={save} className="grid gap-4 md:grid-cols-2">
      <label className="grid gap-1 text-sm">
        Nome
        <input className="field" required value={form.nome} onChange={(e) => set("nome", e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm">
        CPF
        <input className="field" required placeholder="000.000.000-00" value={form.cpf} onChange={(e) => set("cpf", e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm md:col-span-2">
        Endereço
        <input className="field" required value={form.endereco} onChange={(e) => set("endereco", e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm">
        Bairro
        <input className="field" required value={form.bairro} onChange={(e) => set("bairro", e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm">
        CEP
        <input className="field" required placeholder="00000-000" value={form.cep} onChange={(e) => set("cep", e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm">
        Cidade
        <input className="field" required value={form.cidade} onChange={(e) => set("cidade", e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm">
        Célula que frequenta
        <select className="field" value={form.celula} onChange={(e) => set("celula", e.target.value)}>
          <option>Não frequento</option>
          {celulas.map((c) => (
            <option key={c.id}>{c.nome}</option>
          ))}
        </select>
      </label>
      {semCelula ? (
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input type="checkbox" checked={form.querIndicacao} onChange={(e) => set("querIndicacao", e.target.checked)} />
          Desejo receber indicação de uma célula perto de mim
        </label>
      ) : null}
      <fieldset className="grid gap-2 text-sm">
        <legend>Já é convertido?</legend>
        <div className="flex gap-3">
          <label className="flex items-center gap-2">
            <input type="radio" checked={form.convertido} onChange={() => set("convertido", true)} /> Sim
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={!form.convertido} onChange={() => set("convertido", false)} /> Não
          </label>
        </div>
      </fieldset>
      <label className="grid gap-1 text-sm">
        Estado civil
        <select
          className="field"
          value={form.estadoCivil}
          onChange={(e) => set("estadoCivil", e.target.value as EstadoCivil)}
        >
          {estadosCivis.map((e) => (
            <option key={e.id} value={e.id}>
              {e.label}
            </option>
          ))}
        </select>
      </label>
      {casado ? (
        <label className="grid gap-1 text-sm">
          Há quanto tempo
          <input
            className="field"
            placeholder="Ex.: 8 anos"
            value={form.tempoCasado}
            onChange={(e) => set("tempoCasado", e.target.value)}
          />
        </label>
      ) : null}
      <fieldset className="grid gap-2 text-sm">
        <legend>Tem filhos?</legend>
        <div className="flex gap-3">
          <label className="flex items-center gap-2">
            <input type="radio" checked={form.temFilhos} onChange={() => set("temFilhos", true)} /> Sim
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={!form.temFilhos} onChange={() => set("temFilhos", false)} /> Não
          </label>
        </div>
      </fieldset>
      {form.temFilhos ? (
        <label className="grid gap-1 text-sm">
          Quantos filhos
          <input
            className="field"
            type="number"
            min={1}
            value={form.qtdFilhos || ""}
            onChange={(e) => set("qtdFilhos", Number(e.target.value))}
          />
        </label>
      ) : null}
      <div className="md:col-span-2">
        <p className="mb-2 text-sm">Universidade da Família — cursos já feitos (separados por ;)</p>
        <div className="mb-2 flex flex-wrap gap-2">
          {cursos.map((c) => (
            <button type="button" key={c.id} className="btn-ghost py-1 text-[12px]" onClick={() => addCurso(c.nome)}>
              + {c.nome}
            </button>
          ))}
        </div>
        <textarea
          className="field"
          rows={3}
          placeholder="Namoro com propósito; Casais em missão"
          value={form.cursos}
          onChange={(e) => set("cursos", e.target.value)}
        />
      </div>
      <div className="md:col-span-2">
        <button className="btn-gold" type="submit">
          Salvar meu perfil
        </button>
        {ok ? <p className="mt-3 text-sm text-gold">{ok}</p> : null}
      </div>
    </form>
  );
}
