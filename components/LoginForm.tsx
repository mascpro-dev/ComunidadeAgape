"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { clearSession, getSessionId, hashPassword, setSession } from "@/lib/auth";
import { loadJson, saveJson } from "@/lib/client-store";
import { ADMIN_PRINCIPAL, MEMBROS_KEY, garantirAdmin, seedMembros, type Membro } from "@/lib/metrics";

export function LoginForm() {
  const router = useRouter();
  const [erro, setErro] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    const d = new FormData(e.currentTarget);
    const email = String(d.get("email") || "")
      .trim()
      .toLowerCase();
    const senha = String(d.get("senha") || "");
    const lista = garantirAdmin(loadJson<Membro[]>(MEMBROS_KEY, seedMembros));
    saveJson(MEMBROS_KEY, lista);
    const hash = await hashPassword(senha);
    const user = lista.find((m) => (m.email || "").toLowerCase() === email && m.senhaHash === hash);
    if (!user) {
      setErro("E-mail ou senha não conferem.");
      return;
    }
    setSession(user.id);
    router.push(user.principal ? "/dashboard" : "/perfil");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto grid max-w-md gap-2">
      <p className="font-display text-2xl">Entrar</p>
      <p className="meta">Use o e-mail cadastrado. O administrador principal libera as funções de cada pessoa.</p>
      <input name="email" type="email" required placeholder="E-mail" className="field" defaultValue={ADMIN_PRINCIPAL.email} />
      <input name="senha" type="password" required placeholder="Senha" className="field" />
      <button className="btn-gold" type="submit">
        Acessar
      </button>
      {erro ? <p className="text-sm text-red-300">{erro}</p> : null}
    </form>
  );
}

export function SessionMenu({ compact }: { compact?: boolean }) {
  const pathname = usePathname();
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const sid = getSessionId();
    setId(sid);
    if (!sid) {
      setNome("");
      setFoto("");
      return;
    }
    const lista = garantirAdmin(loadJson<Membro[]>(MEMBROS_KEY, seedMembros));
    const u = lista.find((m) => m.id === sid);
    setNome(u?.nome.split(" ")[0] || "");
    setFoto(u?.foto || "");
  }, [pathname]);

  if (!id) {
    return (
      <Link href="/entrar" className={compact ? "" : "btn-gold"} aria-label="Entrar">
        {compact ? <Avatar nome="M" size={36} /> : "Entrar"}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/perfil" className="flex items-center gap-2 text-[13px] text-gold">
        <Avatar nome={nome} foto={foto} size={compact ? 36 : 34} />
        {compact ? null : <span className="hidden lg:inline">{nome}</span>}
      </Link>
      {compact ? null : (
        <button
          className="btn-ghost py-2 text-[12px]"
          onClick={() => {
            clearSession();
            location.href = "/";
          }}
        >
          Sair
        </button>
      )}
    </div>
  );
}
