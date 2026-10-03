"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { SessionMenu } from "./LoginForm";

const tabs = [
  { href: "/", label: "Início", icon: HomeIcon },
  { href: "/biblia", label: "Bíblia", icon: BookIcon },
  { href: "/comunidade", label: "Casa", icon: CommunityIcon },
  { href: "/culto", label: "Culto", icon: LiveIcon },
  { href: "/mais", label: "Mais", icon: MenuIcon },
];

const desktopNav = [
  { href: "/", label: "Início" },
  { href: "/culto", label: "Culto" },
  { href: "/biblia", label: "Bíblia" },
  { href: "/comunidade", label: "Comunidade" },
  { href: "/palavra", label: "Áudios" },
  { href: "/celulas", label: "Células" },
  { href: "/perfil", label: "Perfil" },
  { href: "/dashboard", label: "Painel" },
  { href: "/visao", label: "Visão" },
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
      "/formacao",
      "/cursos",
      "/palavra",
      "/perfil",
      "/dashboard",
      "/entrar",
    ].some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );
  if (href === "/visao") return pathname.startsWith("/visao") || pathname.startsWith("/lideranca");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 hidden border-b border-white/[0.06] bg-[#030b1f]/80 backdrop-blur-xl md:block">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-3 text-white">
            <Logo className="h-9 w-9 text-gold" />
            <span>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Comunidade Cristã</p>
              <p className="font-display text-[26px] font-semibold leading-none tracking-wide">Ágape</p>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {desktopNav.map((item) => {
              const on = isOn(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-[13px] tracking-wide transition ${
                    on ? "bg-white/10 text-gold" : "text-[#c5d2ea] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SessionMenu />
        </div>
      </header>

      <header className="flex items-center justify-between px-5 pb-1 pt-[calc(env(safe-area-inset-top)+18px)] md:hidden">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <Logo className="h-7 w-7 text-gold" />
          <span>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted">Comunidade Cristã</p>
            <p className="font-display text-[22px] font-semibold leading-none">Ágape</p>
          </span>
        </Link>
        <Link
          href="/entrar"
          className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-[11px] font-semibold text-gold"
          aria-label="Entrar"
        >
          M
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-28 pt-3 md:px-8 md:pb-16 md:pt-10">{children}</main>

      <footer className="mt-auto hidden border-t border-white/[0.06] py-10 md:block">
        <div className="mx-auto flex max-w-6xl items-end justify-between px-8">
          <div>
            <p className="font-display text-2xl text-gold">Ágape</p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Pessoas formadas por Jesus em uma comunidade viva, para amar, servir e transformar a cidade.
            </p>
          </div>
          <p className="text-xs tracking-[0.16em] text-muted">VISÃO 2033</p>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#06153a]/92 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          {tabs.map((tab) => {
            const on = isOn(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`grid justify-items-center gap-1 py-1 text-[10px] tracking-wide ${
                  on ? "text-gold" : "text-[#7d91b8]"
                }`}
              >
                <tab.icon live={tab.href === "/culto"} />
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
function LiveIcon({ live }: { live?: boolean }) {
  return (
    <span className="relative">
      {live ? (
        <span className="absolute -right-0.5 top-0 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,.25)]" />
      ) : null}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="4" />
        <path d="M5 12a7 7 0 0 1 14 0M2 12a10 10 0 0 1 20 0" />
      </svg>
    </span>
  );
}
function BookIcon(_p?: { live?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 4.5h6.5A3.5 3.5 0 0 1 15 8v12H8.5A3.5 3.5 0 0 0 5 20.5zM15 8h4v12h-4" />
    </svg>
  );
}
function CommunityIcon(_p?: { live?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="3" />
      <circle cx="6" cy="10" r="2" />
      <circle cx="18" cy="10" r="2" />
      <path d="M4 19c.4-2.5 2.6-4 5-4M15 15c2.4 0 4.6 1.5 5 4M8.5 15c1.1-.6 2.3-1 3.5-1s2.4.4 3.5 1" />
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
