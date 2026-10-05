import { NextResponse } from "next/server";
import { chaveBannerOk, lerArquivoBanner } from "@/lib/banner-fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!chaveBannerOk(id)) {
    return NextResponse.json({ error: "Identificador inválido." }, { status: 400 });
  }
  try {
    const bytes = await lerArquivoBanner(id);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Imagem não encontrada." }, { status: 404 });
  }
}
