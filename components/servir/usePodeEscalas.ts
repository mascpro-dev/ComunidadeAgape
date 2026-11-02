"use client";

import { useEffect, useState } from "react";
import { loadMe } from "@/lib/agape-db";
import { temFuncao } from "@/lib/metrics";

export function usePodeEscalas() {
  const [state, setState] = useState({ ready: false, pode: false });

  useEffect(() => {
    loadMe()
      .then((u) => setState({ ready: true, pode: temFuncao(u || undefined, "escalas") }))
      .catch(() => setState({ ready: true, pode: false }));
  }, []);

  return state;
}
