"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { celulas, cursos } from "@/lib/content";
import { buscarCep } from "@/lib/cep";
import { comprimirFoto } from "@/lib/foto-perfil";
import { loadMe, saveProfile, signUp, updatePassword } from "@/lib/agape-db";
import { estadosCivis, type EstadoCivil, type Membro } from "@/lib/metrics";

const empty: Omit<Membro, "id" | "atualizado" | "senhaHash" | "funcoes" | "principal"> = {
  nome: "",
  cpf: "",
  endereco: "",
  bairro: "",
  cep: "",
  cidade: "",
  email: "",
  celula: "Não frequento",
  querIndicacao: true,
  convertido: false,
  cursos: "",
  temFilhos: false,
  qtdFilhos: 0,
  estadoCivil: "solteiro",
  tempoCasado: "",
  foto: "",
};

export function MemberProfile() {
  const [meuId, setMeuId] = useState("");
  const [form, setForm] = useState(empty);
  const [senha, setSenha] = useState("");
  const [cepStatus, setCepStatus] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    loadMe()
      .then((mine) => {
        if (!mine) return;
        setMeuId(mine.id);
        fill(mine);
      })
      .catch(() => setOk("Não foi possível carregar o perfil."));
  }, []);

  function fill(mine: Membro) {
    setForm({
      nome: mine.nome,
      cpf: mine.cpf,
      endereco: mine.endereco,
      bairro: mine.bairro,
      cep: mine.cep,
      cidade: mine.cidade,
      email: mine.email || "",
      celula: mine.celula,
      querIndicacao: mine.querIndicacao,
      convertido: mine.convertido,
      cursos: mine.cursos,
      temFilhos: mine.temFilhos,
      qtdFilhos: mine.qtdFilhos,
      estadoCivil: mine.estadoCivil,
      tempoCasado: mine.tempoCasado,
      foto: mine.foto || "",
    });
  }

  const casado = form.estadoCivil === "casado" || form.estadoCivil === "uniao";
  const semCelula = form.celula === "Não frequento";
  const listaCursos = useMemo(() => form.cursos.split(";").map((c) => c.trim()).filter(Boolean), [form.cursos]);

  function set<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onCep() {
    setCepStatus("Buscando CEP…");
    const dados = await buscarCep(form.cep);
    if (!dados) {
      setCepStatus("CEP não encontrado.");
      return;
    }
    setForm((f) => ({
      ...f,
      cep: dados.cep,
      bairro: dados.bairro || f.bairro,
      cidade: dados.cidade || f.cidade,
      endereco: f.endereco.includes(",") ? f.endereco : dados.endereco || f.endereco,
    }));
    setCepStatus("Endereço preenchido pelo CEP. Confira o número e o apto.");
  }

  function addCurso(nome: string) {
    if (listaCursos.includes(nome)) return;
    set("cursos", [...listaCursos, nome].join("; "));
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setOk("");
    try {
      let id = meuId;
      if (!id) {
        if (!senha) {
          setOk("Defina uma senha para criar o cadastro.");
          return;
        }
        const created = await signUp((form.email || "").toLowerCase(), senha, form.nome);
        if (created.error || !created.userId) {
          setOk(created.error || "Não foi possível criar a conta.");
          return;
        }
        id = created.userId;
        setMeuId(id);
      } else if (senha) {
        await updatePassword(senha);
      }
      const membro: Membro = {
        ...form,
        id,
        qtdFilhos: form.temFilhos ? Number(form.qtdFilhos) || 0 : 0,
        tempoCasado: casado ? form.tempoCasado : "",
        querIndicacao: semCelula ? form.querIndicacao : false,
        atualizado: new Date().toLocaleDateString("pt-BR"),
        email: (form.email || "").toLowerCase(),
      };
      await saveProfile(membro);
      setSenha("");
      setOk("Cadastro salvo na comunidade.");
    } catch (err) {
      setOk(err instanceof Error ? err.message : "Não foi possível salvar.");
    }
  }

  async function onFoto(file?: File) {
    if (!file) return;
    try {
      const data = await comprimirFoto(file);
      set("foto", data);
      if (meuId) {
        await saveProfile({
          ...form,
          foto: data,
          id: meuId,
          qtdFilhos: form.temFilhos ? Number(form.qtdFilhos) || 0 : 0,
          tempoCasado: casado ? form.tempoCasado : "",
          querIndicacao: semCelula ? form.querIndicacao : false,
          atualizado: new Date().toLocaleDateString("pt-BR"),
          email: (form.email || "").toLowerCase(),
        });
        setOk("Foto salva no perfil.");
      }
    } catch {
      setOk("Não foi possível usar esta foto.");
    }
  }

  return (
    <form onSubmit={save} className="grid gap-4 md:grid-cols-2">
      <div className="card flex items-center gap-4 md:col-span-2">
        <Avatar nome={form.nome} foto={form.foto} size={88} />
        <div>
          <p className="text-sm font-medium">Foto do perfil</p>
          <p className="meta mb-3">A foto faz parte do cadastro e aparece no seu perfil e no menu.</p>
          <label className="btn-ghost inline-flex cursor-pointer">
            Escolher foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFoto(e.target.files?.[0])}
            />
          </label>
          {form.foto ? (
            <button
              type="button"
              className="ml-2 text-[13px] text-muted"
              onClick={async () => {
                set("foto", "");
                if (meuId) {
                  try {
                    await saveProfile({
                      ...form,
                      foto: "",
                      id: meuId,
                      qtdFilhos: form.temFilhos ? Number(form.qtdFilhos) || 0 : 0,
                      tempoCasado: casado ? form.tempoCasado : "",
                      querIndicacao: semCelula ? form.querIndicacao : false,
                      atualizado: new Date().toLocaleDateString("pt-BR"),
                      email: (form.email || "").toLowerCase(),
                    });
                    setOk("Foto removida.");
                  } catch {
                    setOk("Não foi possível remover a foto.");
                  }
                }
              }}
            >
              Remover
            </button>
          ) : null}
        </div>
      </div>
      <label className="grid gap-1 text-sm">
        Nome
        <input className="field" required value={form.nome} onChange={(e) => set("nome", e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm">
        CPF
        <input className="field" required placeholder="000.000.000-00" value={form.cpf} onChange={(e) => set("cpf", e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm">
        E-mail
        <input
          className="field"
          type="email"
          required
          value={form.email}
          disabled={!!meuId}
          onChange={(e) => set("email", e.target.value)}
        />
      </label>
      <label className="grid gap-1 text-sm">
        Senha {meuId ? "(em branco mantém a atual)" : ""}
        <input className="field" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required={!meuId} />
      </label>
      <label className="grid gap-1 text-sm">
        CEP
        <input
          className="field"
          required
          placeholder="00000-000"
          value={form.cep}
          onChange={(e) => set("cep", e.target.value)}
          onBlur={onCep}
        />
        {cepStatus ? <span className="text-[12px] text-gold">{cepStatus}</span> : null}
      </label>
      <label className="grid gap-1 text-sm">
        Cidade
        <input className="field" required value={form.cidade} onChange={(e) => set("cidade", e.target.value)} />
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
