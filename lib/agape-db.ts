"use client";

import { getSupabase } from "@/lib/supabase";
import { type EstadoCivil, type FuncaoId, type Membro, type Relatorio } from "@/lib/metrics";

type ProfileRow = {
  id: string;
  nome: string;
  email: string | null;
  cpf: string | null;
  endereco: string | null;
  bairro: string | null;
  cep: string | null;
  cidade: string | null;
  celula: string | null;
  quer_indicacao: boolean;
  convertido: boolean;
  cursos: string | null;
  tem_filhos: boolean;
  qtd_filhos: number;
  estado_civil: string;
  tempo_casado: string | null;
  updated_at: string;
};

function asCivil(v: string): EstadoCivil {
  const ok = ["solteiro", "casado", "uniao", "separado", "viuvo"] as const;
  return (ok.includes(v as EstadoCivil) ? v : "solteiro") as EstadoCivil;
}

function mapMembro(row: ProfileRow, funcoes: string[]): Membro {
  const principal = funcoes.includes("admin");
  const lista = funcoes.filter((f): f is FuncaoId => f !== "admin") as FuncaoId[];
  return {
    id: row.id,
    nome: row.nome || "",
    cpf: row.cpf || "",
    endereco: row.endereco || "",
    bairro: row.bairro || "",
    cep: row.cep || "",
    cidade: row.cidade || "",
    email: row.email || "",
    principal,
    funcoes: principal ? (["painel", "relatorios", "pessoas", "liberar", "audios"] as FuncaoId[]) : lista,
    celula: row.celula || "Não frequento",
    querIndicacao: row.quer_indicacao,
    convertido: row.convertido,
    cursos: row.cursos || "",
    temFilhos: row.tem_filhos,
    qtdFilhos: row.qtd_filhos || 0,
    estadoCivil: asCivil(row.estado_civil),
    tempoCasado: row.tempo_casado || "",
    atualizado: row.updated_at ? new Date(row.updated_at).toLocaleDateString("pt-BR") : "",
  };
}

export async function getSessionUserId() {
  const sb = getSupabase();
  if (!sb) return "";
  const { data } = await sb.auth.getSession();
  return data.session?.user.id || "";
}

export async function signIn(email: string, senha: string) {
  const sb = getSupabase();
  if (!sb) return { error: "Supabase ainda não está configurado neste app." };
  const { data, error } = await sb.auth.signInWithPassword({ email, password: senha });
  if (error) return { error: "E-mail ou senha não conferem. Use a senha criada no acesso da comunidade, não a antiga do protótipo." };
  return { userId: data.user?.id || "", principal: false };
}

export async function signOut() {
  const sb = getSupabase();
  await sb?.auth.signOut();
}

export async function signUp(email: string, senha: string, nome: string) {
  const sb = getSupabase();
  if (!sb) return { error: "Supabase ainda não está configurado neste app." };
  const { data, error } = await sb.auth.signUp({
    email,
    password: senha,
    options: { data: { nome } },
  });
  if (error) return { error: error.message };
  if (!data.session) return { error: "Conta criada. Confirme o e-mail para entrar." };
  return { userId: data.user?.id || "" };
}

async function funcoesDe(ids: string[]) {
  const sb = getSupabase();
  if (!sb || !ids.length) return new Map<string, string[]>();
  const { data, error } = await sb.from("profile_funcoes").select("profile_id, funcao_id").in("profile_id", ids);
  if (error) throw error;
  const map = new Map<string, string[]>();
  for (const row of data || []) {
    const list = map.get(row.profile_id) || [];
    list.push(row.funcao_id);
    map.set(row.profile_id, list);
  }
  return map;
}

export async function loadMe(): Promise<Membro | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data: auth } = await sb.auth.getUser();
  const id = auth.user?.id;
  if (!id) return null;
  const { data, error } = await sb.from("profiles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const fmap = await funcoesDe([id]);
  return mapMembro(data as ProfileRow, fmap.get(id) || []);
}

export async function loadMembros(): Promise<Membro[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from("profiles").select("*").order("nome");
  if (error) throw error;
  const rows = (data || []) as ProfileRow[];
  const fmap = await funcoesDe(rows.map((r) => r.id));
  return rows.map((r) => mapMembro(r, fmap.get(r.id) || []));
}

export async function saveProfile(membro: Membro) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase não configurado");
  const cpf = membro.cpf.replace(/\D/g, "") || null;
  const { error } = await sb
    .from("profiles")
    .update({
      nome: membro.nome,
      cpf,
      endereco: membro.endereco,
      bairro: membro.bairro,
      cep: membro.cep,
      cidade: membro.cidade,
      celula: membro.celula,
      quer_indicacao: membro.querIndicacao,
      convertido: membro.convertido,
      cursos: membro.cursos,
      tem_filhos: membro.temFilhos,
      qtd_filhos: membro.qtdFilhos,
      estado_civil: membro.estadoCivil,
      tempo_casado: membro.tempoCasado,
    })
    .eq("id", membro.id);
  if (error) throw error;
}

export async function updatePassword(senha: string) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase não configurado");
  const { error } = await sb.auth.updateUser({ password: senha });
  if (error) throw error;
}

export async function loadRelatorios(): Promise<Relatorio[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from("relatorios").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((r) => ({
    id: r.id,
    ministerio: r.ministerio,
    lider: r.lider,
    periodo: r.periodo,
    presentes: r.presentes,
    visitantes: r.visitantes,
    decisoes: r.decisoes,
    observacao: r.observacao,
    quando: r.created_at ? new Date(r.created_at).toLocaleDateString("pt-BR") : "",
  }));
}

export async function insertRelatorio(r: Omit<Relatorio, "id" | "quando">) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase não configurado");
  const uid = await getSessionUserId();
  const { error } = await sb.from("relatorios").insert({
    ministerio: r.ministerio,
    lider: r.lider,
    periodo: r.periodo,
    presentes: r.presentes,
    visitantes: r.visitantes,
    decisoes: r.decisoes,
    observacao: r.observacao,
    created_by: uid || null,
  });
  if (error) throw error;
}

export async function setFuncao(profileId: string, fn: FuncaoId, on: boolean) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase não configurado");
  if (on) {
    const { error } = await sb.from("profile_funcoes").insert({ profile_id: profileId, funcao_id: fn });
    if (error && !String(error.message).toLowerCase().includes("duplicate")) throw error;
    return;
  }
  const { error } = await sb.from("profile_funcoes").delete().eq("profile_id", profileId).eq("funcao_id", fn);
  if (error) throw error;
}
