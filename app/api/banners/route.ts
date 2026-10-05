import { createClient } from "@supabase/supabase-js";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nhaqognbizjswdmfoahx.supabase.co")
  .trim()
  .replace(/\/rest\/v1\/?$/, "")
  .replace(/\/$/, "");
const SUPABASE_ANON_KEY = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYXFvZ25iaXpqc3dkbWZvYWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNDA5ODAsImV4cCI6MjEwNjcxNjk4MH0.x-ffpEFsjJ23LjOsUkiLAEUbqCszghknI5zjy-MgiQs"
).trim();

const pasta = join(process.cwd(), "public", "banners");
const manifestoPath = join(pasta, "manifest.json");

function chaveOk(id: string) {
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

async function lerManifesto(): Promise<Record<string, string>> {
  try {
    return JSON.parse(await readFile(manifestoPath, "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

async function gravarManifesto(mapa: Record<string, string>) {
  await mkdir(pasta, { recursive: true });
  await writeFile(manifestoPath, JSON.stringify(mapa, null, 2));
}

async function autorizar(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (!auth.toLowerCase().startsWith("bearer ")) return "Entre na conta para trocar as imagens.";
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data } = await sb.auth.getUser();
  if (!data.user) return "Sessão expirada. Entre de novo.";
  const painel = await sb.rpc("has_funcao", { fid: "painel" });
  const admin = await sb.rpc("has_funcao", { fid: "admin" });
  if (painel.error && admin.error) return null;
  if (painel.data === true || admin.data === true) return null;
  if (painel.data === false && admin.data === false) return "Sem permissão no painel.";
  return null;
}

export async function GET() {
  return NextResponse.json(await lerManifesto());
}

export async function POST(req: Request) {
  const bloqueio = await autorizar(req);
  if (bloqueio) return NextResponse.json({ error: bloqueio }, { status: 401 });

  const form = await req.formData();
  const id = String(form.get("id") || "");
  const file = form.get("file");
  if (!chaveOk(id) || !(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo inválido." }, { status: 400 });
  }

  await mkdir(pasta, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(join(pasta, `${id}.jpg`), bytes);

  const mapa = await lerManifesto();
  mapa[id] = `/banners/${id}.jpg?v=${Date.now()}`;
  await gravarManifesto(mapa);
  return NextResponse.json({ ok: true, url: mapa[id] });
}

export async function DELETE(req: Request) {
  const bloqueio = await autorizar(req);
  if (bloqueio) return NextResponse.json({ error: bloqueio }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id") || "";
  if (!chaveOk(id)) return NextResponse.json({ error: "Identificador inválido." }, { status: 400 });

  try {
    await unlink(join(pasta, `${id}.jpg`));
  } catch {
    /* já não existia */
  }
  const mapa = await lerManifesto();
  delete mapa[id];
  await gravarManifesto(mapa);
  return NextResponse.json({ ok: true });
}
