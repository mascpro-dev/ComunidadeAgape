"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ServirProvider } from "./ServirProvider";

const itens = [
  { href: "/servir", label: "Início" },
  { href: "/servir/escalas", label: "Escalas" },
  { href: "/servir/pessoas", label: "Pessoas" },
  { href: "/servir/organizacao", label: "Organização" },
];

function ativo(pathname: string, href: string) {
  if (href === "/servir") return pathname === "/servir";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ServirFrame({ children }: { children: ReactNode }) {
  return (
    <ServirProvider>
      <ServirChrome>{children}</ServirChrome>
    </ServirProvider>
  );
}

function ServirChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="md:grid md:grid-cols-[196px_minmax(0,1fr)] md:items-start md:gap-8">
      <aside className="mb-5 md:sticky md:top-28">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="page-kicker mb-0">Sistema interno</p>
          <Link
            href="/servir/config"
            aria-label="Configurações do Servir"
            className={`grid h-9 w-9 place-items-center rounded-full border ${
              pathname.startsWith("/servir/config") ? "border-gold text-gold" : "border-white/15 text-muted"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
            </svg>
          </Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
          {itens.map((item) => {
            const on = ativo(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-4 py-2 text-sm md:rounded-xl ${
                  on ? "bg-white/10 text-gold" : "text-[#c5d2ea] hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
