"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { loadBannerOverrides } from "@/lib/banners";
import { fotos, mesclarFotos, type FotosMap } from "@/lib/fotos";

const Ctx = createContext<FotosMap>(fotos);

export function FotosProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<FotosMap>({});

  useEffect(() => {
    function puxar() {
      loadBannerOverrides()
        .then(setExtras)
        .catch(() => undefined);
    }
    puxar();
    window.addEventListener("agape-banners", puxar);
    return () => window.removeEventListener("agape-banners", puxar);
  }, []);

  const value = useMemo(() => mesclarFotos(extras), [extras]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFotos() {
  return useContext(Ctx);
}

export function recarregarBanners(set: (m: FotosMap) => void) {
  return loadBannerOverrides().then(set);
}
