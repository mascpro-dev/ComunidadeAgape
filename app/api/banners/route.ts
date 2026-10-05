import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import {
  apagarArquivoBanner,
  chaveBannerOk,
  gravarArquivoBanner,
  gravarManifestoBanners,
  lerManifestoBanners,
  urlBanner,
} from "@/lib/banner-fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nhaqognbizjswdmfoahx.supabase.co")
  .trim()
  .replace(/\/rest\/v1\/?$/, "")
  .replace(/\/$/, "");
const SUPABASE_ANON_KEY = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYXFvZ25iaXpqc3dkbWZvYWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNDA5ODAsImV4cCI6MjEwNjcxNjk4MH0.x-ffpEFsjJ23LjOsUkiLAEUbqCszghknI5zjy-MgiQs"
).trim();

async function autorizar(req: Request) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return "Entre na conta para trocar as imagens.";
  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await sb.auth.getUser(token);
    if (error || !data.user) return "Sessão expirada. Entre de novo.";
    return null;
  } catch {
    return "Sessão expirada. Entre de novo.";
  }
}

export async function GET() {
  return NextResponse.json(await lerManifestoBanners());
}

export async function POST(req: Request) {
  try {
    const bloqueio = await autorizar(req);
    if (bloqueio) return NextResponse.json({ error: bloqueio }, { status: 401 });

    const corpo = (await req.json()) as { id?: string; jpeg?: string };
    const id = String(corpo.id || "");
    const jpeg = String(corpo.jpeg || "").replace(/^data:image\/jpeg;base64,/, "");
    if (!chaveBannerOk(id) || !jpeg) {
      return NextResponse.json({ error: "Arquivo inválido." }, { status: 400 });
    }
    const bytes = Buffer.from(jpeg, "base64");
    if (!bytes.length) {
      return NextResponse.json({ error: "Arquivo vazio." }, { status: 400 });
    }

    await gravarArquivoBanner(id, bytes);
    const mapa = await lerManifestoBanners();
    mapa[id] = urlBanner(id);
    await gravarManifestoBanners(mapa);
    return NextResponse.json({ ok: true, url: mapa[id] });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Falha ao gravar a imagem.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const bloqueio = await autorizar(req);
    if (bloqueio) return NextResponse.json({ error: bloqueio }, { status: 401 });

    const id = new URL(req.url).searchParams.get("id") || "";
    if (!chaveBannerOk(id)) return NextResponse.json({ error: "Identificador inválido." }, { status: 400 });

    await apagarArquivoBanner(id);
    const mapa = await lerManifestoBanners();
    delete mapa[id];
    await gravarManifestoBanners(mapa);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Falha ao restaurar.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
