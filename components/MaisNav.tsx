"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { maisMenu } from "@/lib/nav";

export function MaisNav() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(true);

  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-[#0b1c3e]/80 md:hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3.5 text-left"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
      >
        <span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Menu</span>
          <span className="font-display text-xl leading-none text-white">Comunidade, Gerações, Áudios…</span>
        </span>
        <span className="text-gold">{aberto ? "−" : "+"}</span>
      </button>
      {aberto ? (
        <nav className="grid border-t border-white/10 px-2 py-2">
          {maisMenu.map((item) => {
            const on = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-3 text-[15px] ${on ? "bg-white/10 text-gold" : "text-[#d7e2f8]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
