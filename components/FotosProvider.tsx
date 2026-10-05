"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { lerBannersLocais } from "@/lib/banner-idb";
import { loadBannerOverrides } from "@/lib/banners";
import { fotos, mesclarFotos, type FotosMap } from "@/lib/fotos";

const Ctx = createContext<FotosMap>(fotos);

export function FotosProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<FotosMap>({});

  useEffect(() => {
    function puxar() {
      Promise.all([loadBannerOverrides().catch(() => ({})), lerBannersLocais().catch(() => ({}))])
        .then(([remoto, local]) => setExtras({ ...remoto, ...local }))
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
  return Promise.all([loadBannerOverrides().catch(() => ({})), lerBannersLocais().catch(() => ({}))]).then(
    ([remoto, local]) => set({ ...remoto, ...local }),
  );
}
