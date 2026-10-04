"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { loadJson, saveJson } from "@/lib/client-store";
import { loadMe } from "@/lib/agape-db";
import { temFuncao } from "@/lib/metrics";

type AudioItem = {
  id: string;
  titulo: string;
  autor: string;
  quando: string;
  dataUrl: string;
};

const KEY = "agape-audios";

export function AudioFeed() {
  const [items, setItems] = useState<AudioItem[]>([]);
  const [leader, setLeader] = useState(false);
  const [recording, setRecording] = useState(false);
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    setItems(loadJson<AudioItem[]>(KEY, []));
    loadMe()
      .then((u) => setLeader(temFuncao(u || undefined, "audios")))
      .catch(() => setLeader(false));
  }, []);

  function persist(next: AudioItem[]) {
    setItems(next);
    saveJson(KEY, next);
  }

  async function startRec() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const media = new MediaRecorder(stream);
    chunks.current = [];
    media.ondataavailable = (ev) => {
      if (ev.data.size) chunks.current.push(ev.data);
    };
    media.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
    };
    rec.current = media;
    media.start();
    setRecording(true);
  }

  function stopRec() {
    rec.current?.stop();
    setRecording(false);
  }

  async function publish(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const titulo = String(data.get("titulo") || "Palavra").trim();
    const autor = String(data.get("autor") || "Liderança Ágape").trim();
    const file = data.get("arquivo") as File | null;
    let blob: Blob | null = file && file.size ? file : null;
    if (!blob && chunks.current.length) blob = new Blob(chunks.current, { type: "audio/webm" });
    if (!blob) return;
    const dataUrl = await blobToUrl(blob);
    persist([
      {
        id: crypto.randomUUID(),
        titulo,
        autor,
        quando: new Date().toLocaleString("pt-BR"),
        dataUrl,
      },
      ...items,
    ]);
    chunks.current = [];
    form.reset();
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_340px]">
      <div className="grid gap-3">
        {items.length ? (
          items.map((a) => (
            <article key={a.id} className="card">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{a.autor}</p>
              <h3 className="mt-1 font-display text-2xl">{a.titulo}</h3>
              <p className="meta">{a.quando}</p>
              <audio className="mt-3 w-full" controls src={a.dataUrl} />
            </article>
          ))
        ) : (
          <p className="text-sm text-muted">Ainda não há áudios. O pastor e os líderes publicam por aqui.</p>
        )}
      </div>

      <aside className="card h-fit">
        {leader ? (
          <form onSubmit={publish} className="grid gap-2">
            <p className="text-[11px] uppercase tracking-[0.16em] text-gold">Estúdio da liderança</p>
            <input name="titulo" required placeholder="Título da palavra" className="field" />
            <input name="autor" placeholder="Quem fala" className="field" defaultValue="Pastor / líder" />
            <input name="arquivo" type="file" accept="audio/*" className="field" />
            <div className="flex gap-2">
              {recording ? (
                <button type="button" className="btn-ghost" onClick={stopRec}>
                  Parar gravação
                </button>
              ) : (
                <button type="button" className="btn-ghost" onClick={startRec}>
                  Gravar agora
                </button>
              )}
            </div>
            <button className="btn-gold" type="submit">
              Publicar áudio
            </button>
          </form>
        ) : (
          <div className="grid gap-2">
            <p className="font-display text-2xl">Área dos líderes</p>
            <p className="meta">Entre na sua conta. Só publica áudio quem o administrador principal liberar.</p>
            <a href="/entrar" className="btn-gold">
              Fazer login
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}

function blobToUrl(blob: Blob) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}
