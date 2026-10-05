"use client";

import { BANNER_SLOTS, rotuloTamanho, type BannerSlot } from "@/lib/banner-slots";
import { apagarBannerLocal, blobParaDataUrl, salvarBannerLocal } from "@/lib/banner-idb";
import { prepararBanner } from "@/lib/banners";
import { fotoCapa } from "@/lib/fotos";
import { useFotos } from "@/components/FotosProvider";
import { useMemo, useState } from "react";

const grupos = ["Início", "Cultos", "Gerações", "Cursos"];

async function enviarBanner(slot: BannerSlot, file: File) {
  const blob = await prepararBanner(file, slot.largura, slot.altura);
  await salvarBannerLocal(slot.id, await blobParaDataUrl(blob));
}

async function restaurarBanner(id: string) {
  await apagarBannerLocal(id);
}

function CardBanner({ slot }: { slot: BannerSlot }) {
  const mapa = useFotos();
  const [busy, setBusy] = useState("");
  const src = fotoCapa(slot.id, mapa);

  async function onFile(file?: File) {
    if (!file) return;
    setBusy("Enviando…");
    try {
      await enviarBanner(slot, file);
      window.dispatchEvent(new Event("agape-banners"));
      setBusy("Atualizado");
    } catch (e) {
      setBusy(e instanceof Error ? e.message : "Não foi possível enviar a imagem.");
    }
  }

  async function restaurar() {
    setBusy("Restaurando…");
    try {
      await restaurarBanner(slot.id);
      window.dispatchEvent(new Event("agape-banners"));
      setBusy("Padrão");
    } catch (e) {
      setBusy(e instanceof Error ? e.message : "Erro ao restaurar");
    }
  }

  return (
    <article className="dash-card overflow-hidden p-0">
      <div className="relative bg-black/30" style={{ aspectRatio: `${slot.largura} / ${slot.altura}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </div>
      <div className="p-4">
        <p className="font-display text-xl leading-tight text-white">{slot.titulo}</p>
        <p className="mt-1 text-[12px] text-gold">{rotuloTamanho(slot)}</p>
        <p className="mt-1 text-[13px] text-muted">{slot.onde}</p>
        <p className="mt-1 text-[12px] text-[#c5d6f0]">{slot.dica}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <label className="btn-gold cursor-pointer px-4 py-2 text-[12px]">
            Trocar imagem
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                void onFile(f);
              }}
            />
          </label>
          <button type="button" className="btn-ghost px-4 py-2 text-[12px]" onClick={() => void restaurar()}>
            Restaurar padrão
          </button>
        </div>
        {busy ? (
          <p
            className={`mt-2 text-[12px] ${
              busy === "Atualizado" || busy === "Padrão" || busy.endsWith("…") ? "text-[#9fd4ea]" : "text-[#ffb4b4]"
            }`}
          >
            {busy}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function BannersAdmin() {
  const [grupo, setGrupo] = useState(grupos[0]);
  const lista = useMemo(() => BANNER_SLOTS.filter((s) => s.grupo === grupo), [grupo]);

  return (
    <div>
      <p className="mb-3 max-w-[62ch] text-sm text-[#d7e2f8]">
        Cada peça tem um tamanho. O envio recorta no centro, na proporção certa — a imagem não estica. JPG ou PNG.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {grupos.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGrupo(g)}
            className={`rounded-full px-4 py-2 text-[13px] ${grupo === g ? "bg-gold text-[#1a1408]" : "border border-white/15 text-white"}`}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {lista.map((s) => (
          <CardBanner key={s.id} slot={s} />
        ))}
      </div>
    </div>
  );
}
