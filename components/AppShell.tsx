"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { desktopNav, maisMenu } from "@/lib/nav";
import { Logo } from "./Logo";
import { SessionMenu } from "./LoginForm";

const tabs = [
  { href: "/", label: "Início", icon: HomeIcon },
  { href: "/biblia", label: "Bíblia", icon: BookIcon },
  { href: "/formacao", label: "Gerações", icon: FormacaoIcon },
  { href: "/comunidade", label: "Comunidade", icon: ComunidadeIcon },
  { href: "/mais", label: "Mais", icon: MenuIcon },
];

function isOn(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/formacao") return pathname.startsWith("/formacao") || pathname.startsWith("/cursos");
  if (href === "/mais")
    return [
      "/mais",
      "/oracao",
      "/visao",
      "/lideranca",
      "/eventos",
      "/celulas",
      "/palavra",
      "/perfil",
      "/dashboard",
      "/entrar",
      "/culto",
    ].some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );
  if (href === "/visao") return pathname.startsWith("/visao") || pathname.startsWith("/lideranca");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [maisAberto, setMaisAberto] = useState(false);

  useEffect(() => {
    setMaisAberto(false);
  }, [pathname]);

  if (pathname === "/entrar") {
    return <div className="min-h-dvh bg-deep">{children}</div>;
  }

  return (
    <div className="flex min-h-dvh min-w-0 max-w-full flex-col overflow-x-clip">
      <header className="sticky top-0 z-40 hidden border-b border-white/[0.06] bg-[#030b1f]/80 backdrop-blur-xl md:block">
        <div className="mx-auto flex h-[108px] max-w-7xl items-center gap-8 px-6 lg:px-8">
          <Link href="/" className="shrink-0">
            <Logo variant="full" className="h-[76px] w-auto max-w-[460px] object-contain object-left" />
          </Link>
          <nav className="flex min-w-0 flex-1 items-center justify-between gap-1">
            {desktopNav.map((item) => {
              const on = isOn(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-1 rounded-full px-2 py-2.5 text-center text-[15px] font-medium tracking-wide transition ${
                    on ? "bg-white/10 text-gold" : "text-[#c5d2ea] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="shrink-0">
            <SessionMenu />
          </div>
        </div>
      </header>

      <header className="flex items-center justify-between gap-3 px-4 pb-2 pt-[calc(env(safe-area-inset-top)+8px)] md:hidden">
        <Link href="/" className="min-w-0 flex-1">
          <Logo variant="full" className="h-[80px] w-auto max-w-[calc(100vw-108px)] object-contain object-left" />
        </Link>
        <SessionMenu compact />
      </header>

      <main className="mx-auto min-w-0 w-full max-w-7xl flex-1 overflow-x-clip px-4 pb-28 pt-3 md:px-8 md:pb-16 md:pt-8">
        {children}
      </main>

      <footer className="mt-auto hidden md:block">
        <div className="mx-auto grid max-w-7xl gap-10 px-8 py-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <Logo variant="full" className="h-14 w-auto max-w-[340px] object-contain object-left" />
            <p className="mt-3 max-w-sm text-sm text-muted">
              Pessoas formadas por Jesus em uma comunidade viva, para amar, servir e transformar a cidade.
            </p>
            <p className="mt-3 text-[12px] text-muted">Marília-SP · Visão 2033</p>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">Comunidade</p>
            <div className="grid gap-2 text-sm text-muted">
              <Link href="/culto">Culto</Link>
              <Link href="/celulas">Células</Link>
              <Link href="/comunidade">Comunidade</Link>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">Formação</p>
            <div className="grid gap-2 text-sm text-muted">
              <Link href="/biblia">Bíblia</Link>
              <Link href="/formacao">Universidade da Família</Link>
              <Link href="/palavra">Áudios</Link>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">Visão</p>
            <div className="grid gap-2 text-sm text-muted">
              <Link href="/visao">2033</Link>
              <Link href="/lideranca">Liderança</Link>
              <Link href="/dashboard">Painel</Link>
            </div>
          </div>
        </div>
        <div className="bg-[#6bb4d4] text-[12px] text-[#0a2348]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">
            <div className="flex gap-4">
              <Link href="/mais">Termos</Link>
              <Link href="/mais">Privacidade</Link>
            </div>
            <p>© Comunidade Cristã Ágape</p>
          </div>
        </div>
      </footer>

      {maisAberto ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/45 md:hidden"
          aria-label="Fechar menu"
          onClick={() => setMaisAberto(false)}
        />
      ) : null}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#06153a]/92 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
        {maisAberto ? (
          <div className="absolute bottom-[calc(100%+8px)] right-3 w-[min(240px,calc(100vw-24px))] overflow-hidden rounded-none border border-gold/40 bg-deep shadow-[0_16px_40px_rgba(0,0,0,.4)]">
            {maisMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-white/10 px-4 py-3.5 font-display text-[18px] font-semibold text-gold last:border-b-0"
                onClick={() => setMaisAberto(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="mx-auto grid max-w-md grid-cols-5">
          {tabs.map((tab) => {
            const on = tab.href === "/mais" ? maisAberto || isOn(pathname, "/mais") : isOn(pathname, tab.href);
            if (tab.href === "/mais") {
              return (
                <button
                  key={tab.href}
                  type="button"
                  onClick={() => setMaisAberto((v) => !v)}
                  className={`grid justify-items-center gap-1 py-1 text-[10px] tracking-wide ${
                    on ? "text-gold" : "text-[#7d91b8]"
                  }`}
                  aria-expanded={maisAberto}
                  aria-label="Mais"
                >
                  <tab.icon />
                  {tab.label}
                </button>
              );
            }
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`grid justify-items-center gap-1 py-1 text-[10px] tracking-wide ${
                  on ? "text-gold" : "text-[#7d91b8]"
                }`}
                onClick={() => setMaisAberto(false)}
              >
                <tab.icon />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function HomeIcon(_p?: { live?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function ComunidadeIcon(_p?: { live?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="8" cy="9" r="2.4" />
      <circle cx="16" cy="9" r="2.4" />
      <path d="M4.5 18c.6-2.4 2.2-3.8 3.5-3.8s2.9 1.4 3.5 3.8M12.5 18c.6-2.4 2.2-3.8 3.5-3.8s2.9 1.4 3.5 3.8" />
    </svg>
  );
}
function BookIcon(_p?: { live?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 4.5h6.5A3.5 3.5 0 0 1 15 8v12H8.5A3.5 3.5 0 0 0 5 20.5zM15 8h4v12h-4" />
    </svg>
  );
}
function FormacaoIcon(_p?: { live?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="M7 10.5v5.2c0 .7 2.2 2.3 5 2.3s5-1.6 5-2.3v-5.2" />
    </svg>
  );
}
function MenuIcon(_p?: { live?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 7h14M5 12h14M5 17h10" />
    </svg>
  );
}
