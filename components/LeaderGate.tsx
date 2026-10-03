"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { LEADER_PIN } from "@/lib/metrics";

const KEY = "agape-leader";

export function LeaderGate({ title, children }: { title: string; children: ReactNode }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setOk(sessionStorage.getItem(KEY) === "1");
  }, []);

  function unlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pin = String(new FormData(e.currentTarget).get("pin") || "");
    if (pin === LEADER_PIN) {
      sessionStorage.setItem(KEY, "1");
      setOk(true);
    }
  }

  if (ok) return <>{children}</>;

  return (
    <form onSubmit={unlock} className="card mx-auto grid max-w-md gap-2">
      <p className="font-display text-2xl">{title}</p>
      <p className="meta">Área da liderança. Use o código da casa para ver números e enviar relatórios.</p>
      <input name="pin" type="password" placeholder="Código da liderança" className="field" />
      <button className="btn-gold" type="submit">
        Entrar
      </button>
      <p className="text-[12px] text-muted">Código de demonstração: {LEADER_PIN}</p>
    </form>
  );
}
