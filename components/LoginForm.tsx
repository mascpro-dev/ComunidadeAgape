"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { loadMe, signIn, signOut } from "@/lib/agape-db";
import { isSupabaseConfigured } from "@/lib/supabase";
import { ADMIN_PRINCIPAL } from "@/lib/metrics";

export function LoginForm() {
  const router = useRouter();
  const [erro, setErro] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    if (!isSupabaseConfigured()) {
      setErro("Falta configurar URL e chave anon no arquivo .env.local");
      return;
    }
    const d = new FormData(e.currentTarget);
    const email = String(d.get("email") || "")
      .trim()
      .toLowerCase();
    const senha = String(d.get("senha") || "");
    const res = await signIn(email, senha);
    if (res.error) {
      setErro(res.error);
      return;
    }
    const me = await loadMe();
    router.push(me?.principal ? "/dashboard" : "/perfil");
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
  const [id, setId] = useState("");

  useEffect(() => {
    let alive = true;
    loadMe()
      .then((u) => {
        if (!alive) return;
        setId(u?.id || "");
        setNome(u?.nome.split(" ")[0] || "");
      })
      .catch(() => {
        if (!alive) return;
        setId("");
        setNome("");
      });
    return () => {
      alive = false;
    };
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
        <Avatar nome={nome} size={compact ? 36 : 34} />
        {compact ? null : <span className="hidden lg:inline">{nome}</span>}
      </Link>
      {compact ? null : (
        <button
          className="btn-ghost py-2 text-[12px]"
          onClick={async () => {
            await signOut();
            location.href = "/";
          }}
        >
          Sair
        </button>
      )}
    </div>
  );
}
