"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { getSessionId } from "@/lib/auth";
import { loadJson, saveJson } from "@/lib/client-store";
import { MEMBROS_KEY, garantirAdmin, seedMembros, temFuncao, type FuncaoId, type Membro } from "@/lib/metrics";

export function LeaderGate({
  title,
  funcao,
  children,
}: {
  title: string;
  funcao: FuncaoId;
  children: ReactNode;
}) {
  const [user, setUser] = useState<Membro | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lista = garantirAdmin(loadJson<Membro[]>(MEMBROS_KEY, seedMembros));
    saveJson(MEMBROS_KEY, lista);
    const u = lista.find((m) => m.id === getSessionId()) || null;
    setUser(u);
    setReady(true);
  }, []);

  if (!ready) return <p className="text-sm text-muted">Carregando…</p>;
  if (temFuncao(user || undefined, funcao)) return <>{children}</>;

  return (
    <article className="card mx-auto max-w-md">
      <p className="font-display text-2xl">{title}</p>
      <p className="meta mt-2">
        {user
          ? "Este cadastro ainda não tem esta função. Peça ao administrador principal para liberar."
          : "Entre com e-mail e senha. O administrador libera as funções de cada cadastro."}
      </p>
      <Link href="/entrar" className="btn-gold mt-4">
        Ir para o login
      </Link>
    </article>
  );
}
