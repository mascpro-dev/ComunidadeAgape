"use client";

import { fotoGeracao } from "@/lib/fotos";
import { useFotos } from "@/components/FotosProvider";

export function CapaGeracao({ id, nome }: { id: string; nome: string }) {
  const F = useFotos();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={fotoGeracao(id, F)} alt={nome} className="absolute inset-0 h-full w-full object-cover" />
  );
}
