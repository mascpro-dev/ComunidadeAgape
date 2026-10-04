"use client";

import { useRouter } from "next/navigation";
import { maisMenu } from "@/lib/nav";

export function MaisNav() {
  const router = useRouter();

  return (
    <label className="relative mb-5 block md:hidden">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Menu</span>
      <span className="relative block">
        <select
          className="field w-full appearance-none rounded-2xl border-white/15 bg-[#0b1c3e] py-3.5 pl-4 pr-11 font-display text-[20px] text-white"
          defaultValue=""
          aria-label="Abrir páginas do menu"
          onChange={(e) => {
            const href = e.target.value;
            e.target.selectedIndex = 0;
            if (href) router.push(href);
          }}
        >
          <option value="" disabled>
            Comunidade, Gerações, Áudios…
          </option>
          {maisMenu.map((item) => (
            <option key={item.href} value={item.href}>
              {item.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">▾</span>
      </span>
    </label>
  );
}
