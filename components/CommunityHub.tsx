"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { loadJson, saveJson } from "@/lib/client-store";
import { CardPhoto } from "./CardPhoto";
import { fotos } from "@/lib/fotos";

const ROOMS = ["Palavra", "Oração", "Jovens", "Famílias", "Missão", "Liderança"] as const;

type Post = {
  id: string;
  autor: string;
  texto: string;
  quando: string;
  likes: number;
  liked?: boolean;
  comentarios: string[];
  imagem?: string;
};

type Msg = { id: string; sala: string; autor: string; texto: string; quando: string };

const POSTS = "agape-posts";
const MSGS = "agape-msgs";

const seedPosts: Post[] = [
  {
    id: "p1",
    autor: "Comunidade Ágape",
    texto: "Jesus para toda a vida. Culto da família às 10h (templo e online) e da noite às 19h no templo.",
    quando: "Hoje",
    likes: 24,
    comentarios: ["Amém, igreja!", "Levando a família."],
    imagem: fotos.culto,
  },
  {
    id: "p2",
    autor: "Ágape Serve",
    texto: "Sábado tem ação na cidade. Quem puder levar alimento e presença, chama no grupo de missão.",
    quando: "Ontem",
    likes: 18,
    comentarios: ["Eu vou."],
    imagem: fotos.missao,
  },
  {
    id: "p3",
    autor: "Células",
    texto: "Pertencimento acontece no grupo menor. Ainda dá tempo de achar uma célula no seu bairro.",
    quando: "Esta semana",
    likes: 31,
    comentarios: [],
    imagem: fotos.celulas,
  },
];

export function CommunityHub() {
  const [tab, setTab] = useState<"feed" | "salas">("feed");
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [sala, setSala] = useState<(typeof ROOMS)[number]>("Oração");

  useEffect(() => {
    setPosts(
      loadJson(POSTS, seedPosts).map((p) => {
        const seed = seedPosts.find((s) => s.id === p.id);
        return { ...p, imagem: p.imagem || seed?.imagem };
      }),
    );
    setMsgs(loadJson(MSGS, [] as Msg[]));
  }, []);

  const daSala = useMemo(() => msgs.filter((m) => m.sala === sala), [msgs, sala]);

  function savePosts(next: Post[]) {
    setPosts(next);
    saveJson(POSTS, next);
  }
  function saveMsgs(next: Msg[]) {
    setMsgs(next);
    saveJson(MSGS, next);
  }

  function like(id: string) {
    savePosts(
      posts.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p,
      ),
    );
  }

  function comment(e: FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const texto = String(new FormData(e.currentTarget).get("c") || "").trim();
    if (!texto) return;
    savePosts(posts.map((p) => (p.id === id ? { ...p, comentarios: [...p.comentarios, texto] } : p)));
    e.currentTarget.reset();
  }

  function publish(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const texto = String(data.get("texto") || "").trim();
    const autor = String(data.get("autor") || "Irmão(ã)").trim();
    if (!texto) return;
    savePosts([
      {
        id: crypto.randomUUID(),
        autor,
        texto,
        quando: "Agora",
        likes: 0,
        comentarios: [],
      },
      ...posts,
    ]);
    e.currentTarget.reset();
  }

  function sendRoom(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const texto = String(data.get("texto") || "").trim();
    const autor = String(data.get("autor") || "Eu").trim();
    if (!texto) return;
    saveMsgs([
      ...msgs,
      { id: crypto.randomUUID(), sala, autor, texto, quando: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    e.currentTarget.reset();
  }

  return (
    <div className="md:mx-auto md:max-w-6xl">
      <div className="frame mb-6 px-3 py-4 md:px-8 md:py-5">
        <div className="grid grid-cols-6 gap-2 md:gap-4">
          {ROOMS.map((r) => (
            <button
              key={r}
              onClick={() => {
                setSala(r);
                setTab("salas");
              }}
              className="grid justify-items-center gap-1.5"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-full border-2 text-sm md:h-16 md:w-16 ${
                  sala === r && tab === "salas" ? "border-gold text-gold" : "border-white/20 text-ink"
                }`}
              >
                {r.slice(0, 1)}
              </span>
              <span className="text-[10px] text-muted md:text-[11px]">{r}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex gap-2">
        <button className={tab === "feed" ? "btn-gold" : "btn-ghost"} onClick={() => setTab("feed")}>
          Feed
        </button>
        <button className={tab === "salas" ? "btn-gold" : "btn-ghost"} onClick={() => setTab("salas")}>
          Salas
        </button>
      </div>

      {tab === "feed" ? (
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_300px] md:items-start md:gap-8">
          <div className="mx-auto grid w-full max-w-[640px] gap-4">
            <form onSubmit={publish} className="card grid gap-2">
              <input name="autor" placeholder="Seu nome" className="field" />
              <textarea name="texto" required rows={3} placeholder="O que Deus tem feito na comunidade?" className="field" />
              <button className="btn-gold w-fit" type="submit">
                Publicar
              </button>
            </form>
            {posts.map((p) => (
              <article key={p.id} className="card overflow-hidden p-0">
                {p.imagem ? (
                  <CardPhoto src={p.imagem} alt={p.autor} className="h-52 md:h-64" />
                ) : (
                  <div className="h-40 bg-[linear-gradient(135deg,#1a3d8a,#06153a_55%,#d6c08a33)]" />
                )}
                <div className="p-4 md:p-5">
                  <p className="text-[13px] font-semibold">{p.autor}</p>
                  <p className="mt-2 text-[15px] leading-relaxed">{p.texto}</p>
                  <p className="meta">{p.quando}</p>
                  <button className="mt-3 text-sm text-gold" onClick={() => like(p.id)}>
                    ♥ {p.likes}
                  </button>
                  <div className="mt-3 space-y-1">
                    {p.comentarios.map((c, i) => (
                      <p key={i} className="text-[13px] text-muted">
                        {c}
                      </p>
                    ))}
                  </div>
                  <form onSubmit={(e) => comment(e, p.id)} className="mt-3 flex gap-2">
                    <input name="c" placeholder="Comentar" className="field" />
                    <button className="btn-ghost shrink-0" type="submit">
                      Enviar
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
          <aside className="mt-6 hidden md:block">
            <div className="frame sticky top-24 p-5">
              <p className="section-label">Salas da comunidade</p>
              <div className="grid gap-2">
                {ROOMS.map((r) => (
                  <button
                    key={r}
                    className={`rounded-xl px-3 py-2.5 text-left text-sm ${
                      sala === r ? "bg-white/10 text-gold" : "text-[#d7e2f8] hover:bg-white/5"
                    }`}
                    onClick={() => {
                      setSala(r);
                      setTab("salas");
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-8">
          <aside className="frame mb-4 hidden p-3 md:block">
            {ROOMS.map((r) => (
              <button
                key={r}
                onClick={() => setSala(r)}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                  sala === r ? "bg-white/10 text-gold" : "text-[#d7e2f8]"
                }`}
              >
                {r}
              </button>
            ))}
          </aside>
          <div className="frame p-4 md:p-6">
            <h2 className="mb-3 font-display text-3xl">Sala {sala}</h2>
            <div className="mb-4 grid min-h-[240px] gap-2 rounded-2xl border border-white/10 p-4">
              {daSala.length ? (
                daSala.map((m) => (
                  <div key={m.id}>
                    <p className="text-[12px] text-gold">
                      {m.autor} · {m.quando}
                    </p>
                    <p className="text-sm">{m.texto}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">Seja o primeiro a escrever nesta sala.</p>
              )}
            </div>
            <form onSubmit={sendRoom} className="grid gap-2 md:grid-cols-[1fr_2fr_auto]">
              <input name="autor" placeholder="Seu nome" className="field" />
              <input name="texto" required placeholder={`Mensagem em ${sala}`} className="field" />
              <button className="btn-gold" type="submit">
                Enviar na sala
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
