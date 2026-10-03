"use client";

import { useEffect, useState } from "react";

type BeforeInstall = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstalarPwa() {
  const [instalado, setInstalado] = useState(false);
  const [ios, setIos] = useState(false);
  const [android, setAndroid] = useState(false);
  const [promptEvent, setPromptEvent] = useState<BeforeInstall | null>(null);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    setInstalado(standalone);
    const ua = navigator.userAgent || "";
    setIos(/iPhone|iPad|iPod/i.test(ua));
    setAndroid(/Android/i.test(ua));
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstall);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function instalar() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") setInstalado(true);
    setPromptEvent(null);
  }

  return (
    <section className="card mb-6">
      <p className="text-[11px] uppercase tracking-[0.16em] text-gold">App no celular</p>
      <h2 className="mt-1 font-display text-2xl">Baixar a Ágape na tela inicial</h2>
      {instalado ? (
        <p className="meta">O app já está instalado neste aparelho. Abra pelo ícone Ágape, como qualquer outro aplicativo.</p>
      ) : (
        <>
          <p className="meta">
            Instale como aplicativo: abre em tela cheia, sem a barra do navegador, e fica no celular mesmo offline para as telas já visitadas.
          </p>
          {promptEvent ? (
            <button type="button" className="btn-gold mt-4" onClick={instalar}>
              Instalar agora
            </button>
          ) : null}

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm font-semibold text-gold">iPhone e iPad (Safari)</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-[#d7e2f8]">
                <li>Abra este site no <b>Safari</b> (não use o Chrome no iPhone).</li>
                <li>Toque em <b>Compartilhar</b> — o quadrado com a seta para cima.</li>
                <li>Role e toque em <b>Adicionar à Tela de Início</b>.</li>
                <li>Toque em <b>Adicionar</b>. O ícone Ágape aparece na tela do celular.</li>
              </ol>
              {ios && !promptEvent ? (
                <p className="mt-3 text-[12px] text-gold">Neste iPhone, use o Safari e o botão Compartilhar, como acima.</p>
              ) : null}
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm font-semibold text-gold">Android (Chrome)</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-[#d7e2f8]">
                <li>Abra o site no <b>Chrome</b>.</li>
                <li>Toque nos <b>três pontinhos</b> no canto.</li>
                <li>Toque em <b>Adicionar à tela inicial</b> ou <b>Instalar aplicativo</b>.</li>
                <li>Confirme. O ícone Ágape fica junto dos outros apps.</li>
              </ol>
              {android && !promptEvent ? (
                <p className="mt-3 text-[12px] text-muted">Se o Chrome mostrar “Instalar app” no menu, use essa opção.</p>
              ) : null}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
