"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { SessionMenu } from "./LoginForm";

const tabs = [
  { href: "/", label: "Início", icon: HomeIcon },
  { href: "/biblia", label: "Bíblia", icon: BookIcon },
  { href: "/formacao", label: "Formação", icon: FormacaoIcon },
  { href: "/culto", label: "Culto", icon: LiveIcon },
  { href: "/mais", label: "Mais", icon: MenuIcon },
];

const desktopNav = [
  { href: "/", label: "Início" },
  { href: "/culto", label: "Culto" },
  { href: "/biblia", label: "Bíblia" },
  { href: "/comunidade", label: "Comunidade" },
  { href: "/formacao", label: "Gerações" },
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
      "/palavra",
      "/perfil",
      "/dashboard",
      "/entrar",
      "/comunidade",
    ].some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );
  if (href === "/visao") return pathname.startsWith("/visao") || pathname.startsWith("/lideranca");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/entrar") {
    return <div className="min-h-dvh bg-deep">{children}</div>;
  }

  return (
    <div className="flex min-h-dvh flex-col">
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

      <header className="flex items-center justify-between px-5 pb-1 pt-[calc(env(safe-area-inset-top)+14px)] md:hidden">
        <Link href="/" className="flex items-center">
          <Logo variant="full" className="h-10 w-auto max-w-[260px] object-contain object-left" />
        </Link>
        <SessionMenu compact />
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-28 pt-3 md:px-8 md:pb-16 md:pt-8">{children}</main>

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
