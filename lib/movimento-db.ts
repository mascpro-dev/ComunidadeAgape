"use client";

import { getSupabase } from "@/lib/supabase";
import { getSessionUserId } from "@/lib/agape-db";

export type MembroMovimento = {
  id: string;
  nome: string;
  email: string | null;
  convertido: boolean;
  bairro: string;
  cidade: string;
  quer_indicacao: boolean;
  celula_nome: string | null;
  celula_papel: string | null;
  celula_status: string | null;
  cursos_ativos: number;
  cursos_concluidos: number;
  cultos_90d: number;
  celulas_90d: number;
  ultimo_culto: string | null;
  ultimo_movimento: string | null;
};

export type MovimentoRow = {
  id: string;
  created_at: string;
  tipo: string;
  nome: string;
  extra: string;
  detalhe: string;
  celula_id: string | null;
  curso_id: string | null;
};

export async function loadMovimentoMembros(): Promise<MembroMovimento[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from("v_membro_movimento").select("*").order("nome");
  if (error) throw error;
  return (data || []) as MembroMovimento[];
}

export async function loadMovimentosRecentes(limit = 40): Promise<MovimentoRow[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("movimentos")
    .select("id, created_at, tipo, nome, extra, detalhe, celula_id, curso_id")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []) as MovimentoRow[];
}

type RegistrarInput = {
  tipo: MovimentoRow["tipo"] | "celula_pedido" | "curso_inscricao" | "checkin_kids" | "oracao" | "quero_ir" | "culto";
  nome: string;
  extra?: string;
  detalhe?: string;
  celulaId?: string;
  cursoId?: string;
  sala?: string;
  codigo?: string;
};

export async function registrarMovimento(input: RegistrarInput) {
  const sb = getSupabase();
  if (!sb) return { error: "Supabase não configurado" };
  const uid = await getSessionUserId();
  const nome = input.nome.trim();
  const extra = (input.extra || "").trim();
  const detalhe = (input.detalhe || "").trim();

  const { error: movErr } = await sb.from("movimentos").insert({
    tipo: input.tipo,
    profile_id: uid || null,
    nome,
    extra,
    detalhe,
    celula_id: input.celulaId || null,
    curso_id: input.cursoId || null,
  });
  if (movErr) return { error: movErr.message };

  if (input.tipo === "celula_pedido" && input.celulaId && uid) {
    const { error } = await sb.from("celula_membros").upsert(
      {
        celula_id: input.celulaId,
        profile_id: uid,
        papel: "membro",
        status: "pedido",
      },
      { onConflict: "celula_id,profile_id" },
    );
    if (error) return { error: error.message };
  }

  if (input.tipo === "curso_inscricao" && input.cursoId) {
    const { error } = await sb.from("inscricoes").insert({
      curso_id: input.cursoId,
      profile_id: uid || null,
      nome,
      status: "inscrito",
    });
    if (error && !/inscricoes_ativas_uid|duplicate/i.test(error.message)) return { error: error.message };
  }

  if (input.tipo === "checkin_kids" && input.codigo) {
    const { error } = await sb.from("kids_checkin").insert({
      codigo: input.codigo,
      crianca: nome,
      sala: input.sala || "",
      profile_id: uid || null,
    });
    if (error) return { error: error.message };
  }

  return { ok: true };
}
