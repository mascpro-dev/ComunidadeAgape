"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const tabs = [
  { href: "/", label: "Início", icon: HomeIcon },
  { href: "/culto", label: "Culto", icon: LiveIcon },
  { href: "/celulas", label: "Células", icon: CellsIcon },
  { href: "/formacao", label: "Formação", icon: SparkIcon },
  { href: "/mais", label: "Mais", icon: MenuIcon },
];

function isOn(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/eventos");
  if (href === "/formacao") return pathname.startsWith("/formacao") || pathname.startsWith("/cursos");
  if (href === "/mais")
    return ["/mais", "/oracao", "/visao", "/lideranca"].some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-dvh bg-deep md:grid md:place-items-center md:p-6">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[linear-gradient(180deg,#0a2460_0%,#06153a_28%)] md:h-[860px] md:min-h-0 md:rounded-[36px] md:border md:border-white/10 md:shadow-phone">
        <div className="pointer-events-none absolute left-1/2 top-3 z-20 hidden h-2.5 w-28 -translate-x-1/2 rounded-full bg-black md:block" />
        <header className="flex items-center justify-between px-5 pb-2 pt-7">
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <Logo className="h-8 w-8" />
            <span>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Comunidade Cristã</p>
              <p className="text-[22px] font-extrabold uppercase tracking-[0.08em]">Ágape</p>
            </span>
          </Link>
          <Link
            href="/mais"
            className="grid h-10 w-10 place-items-center rounded-[14px] bg-gradient-to-br from-[#1c4aae] to-gold text-sm font-extrabold text-navy"
            aria-label="Perfil"
          >
            A
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto px-4 pb-28 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </main>
        <nav className="absolute bottom-3 left-3 right-3 grid grid-cols-5 rounded-[22px] border border-white/10 bg-navy/90 px-1 py-2 backdrop-blur-xl">
          {tabs.map((tab) => {
            const on = isOn(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`grid justify-items-center gap-0.5 text-[10px] ${on ? "text-gold" : "text-[#7d91b8]"}`}
              >
                <tab.icon live={tab.href === "/culto"} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function HomeIcon(_p?: { live?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function LiveIcon({ live }: { live?: boolean }) {
  return (
    <span className="relative">
      {live ? <span className="absolute -right-0.5 top-0 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,.25)]" /> : null}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="5" />
      </svg>
    </span>
  );
}
function CellsIcon(_p?: { live?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function SparkIcon(_p?: { live?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 13.8 8.2 20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
    </svg>
  );
}
function MenuIcon(_p?: { live?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 7h14M5 12h14M5 17h14" />
    </svg>
  );
}
