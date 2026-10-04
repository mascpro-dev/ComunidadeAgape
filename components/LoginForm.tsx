"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { Logo } from "@/components/Logo";
import { loadMe, signIn, signOut } from "@/lib/agape-db";
import { isSupabaseConfigured } from "@/lib/supabase";
import { fotos } from "@/lib/fotos";

export function LoginForm() {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [busy, setBusy] = useState(false);
  const [verSenha, setVerSenha] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    if (!isSupabaseConfigured()) {
      setErro("Este site ainda não está ligado ao acesso da comunidade. Falta incluir as chaves no Vercel e republicar.");
      return;
    }
    setBusy(true);
    const d = new FormData(e.currentTarget);
    const email = String(d.get("email") || "")
      .trim()
      .toLowerCase();
    const senha = String(d.get("senha") || "");
    const res = await signIn(email, senha);
    if (res.error) {
      setBusy(false);
      setErro(res.error);
      return;
    }
    const me = await loadMe();
    router.push(me?.principal ? "/dashboard" : "/perfil");
    router.refresh();
  }

  return (
    <div className="grid min-h-dvh md:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden min-h-dvh overflow-hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fotos.culto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030b1f] via-[#030b1f]/55 to-[#06153a]/35" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 lg:p-14">
          <Link href="/">
            <Logo variant="full" className="h-10 w-auto max-w-[260px]" />
          </Link>
          <div>
            <p className="page-kicker mb-3">Comunidade Cristã Ágape</p>
            <p className="font-display max-w-[12ch] text-5xl font-semibold leading-[0.95] text-white lg:text-6xl">
              Um só povo.
              <span className="block text-gold">Uma só fé.</span>
            </p>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-[#d7e2f8]">
              Entre para acompanhar a jornada, o cuidado e a Palavra — no templo e na cidade.
            </p>
          </div>
        </div>
      </aside>

      <section className="relative flex min-h-dvh flex-col justify-center px-5 py-12 md:px-12 lg:px-16">
        <Link href="/" className="mb-10 flex items-center md:hidden">
          <Logo variant="full" className="h-8 w-auto max-w-[220px]" />
        </Link>
        <div className="mx-auto w-full max-w-[400px]">
          <p className="page-kicker">Acesso</p>
          <h1 className="font-display mt-2 text-[40px] font-semibold leading-none text-white md:text-5xl">
            Bem-vindo
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Membros entram no perfil. Líderes usam só o que o administrador liberar.
          </p>

          <form onSubmit={onSubmit} className="mt-9 grid gap-4">
            <label className="grid gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-gold/90">
              E-mail
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu@email.com"
                className="field py-3.5 text-[15px] font-normal normal-case tracking-normal text-ink"
              />
            </label>
            <label className="grid gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-gold/90">
              Senha
              <span className="relative">
                <input
                  name="senha"
                  type={verSenha ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="field py-3.5 pr-16 text-[15px] font-normal normal-case tracking-normal text-ink"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted hover:text-gold"
                  onClick={() => setVerSenha((v) => !v)}
                >
                  {verSenha ? "Ocultar" : "Ver"}
                </button>
              </span>
            </label>
            <button className="btn-gold mt-2 h-12 w-full text-[14px]" type="submit" disabled={busy}>
              {busy ? "Entrando…" : "Entrar na comunidade"}
            </button>
            {erro ? <p className="text-sm leading-relaxed text-red-300">{erro}</p> : null}
          </form>

          <p className="mt-8 text-center text-[13px] text-muted">
            Ainda não tem cadastro?{" "}
            <Link href="/perfil" className="text-gold hover:underline">
              Comece pelo perfil
            </Link>
          </p>
          <p className="mt-6 text-center text-[12px] text-muted">
            <Link href="/" className="hover:text-gold">
              Voltar ao início
            </Link>
          </p>
        </div>
      </section>
    </div>
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
