"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadJson, saveJson } from "@/lib/client-store";
import { hidratar, STORAGE_KEY, type ServirState } from "@/lib/servir";

type Ctx = {
  state: ServirState;
  commit: (fn: (state: ServirState) => ServirState) => void;
};

const ServirContext = createContext<Ctx | null>(null);

export function ServirProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ServirState | null>(null);

  useEffect(() => {
    setState(hidratar(loadJson<Partial<ServirState> | null>(STORAGE_KEY, null)));
  }, []);

  useEffect(() => {
    if (state) saveJson(STORAGE_KEY, state);
  }, [state]);

  if (!state) return <p className="text-sm text-muted">Carregando o Servir…</p>;

  return (
    <ServirContext.Provider value={{ state, commit: (fn) => setState((atual) => (atual ? fn(atual) : atual)) }}>
      {children}
    </ServirContext.Provider>
  );
}

export function useServir() {
  const ctx = useContext(ServirContext);
  if (!ctx) throw new Error("Servir precisa do provedor");
  return ctx;
}
