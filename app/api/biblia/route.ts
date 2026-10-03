import { bibleBooks } from "@/lib/bible-books";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const bookN = Number(url.searchParams.get("book") || "43");
  const chapter = Number(url.searchParams.get("chapter") || "1");
  const book = bibleBooks.find((b) => b.n === bookN) || bibleBooks[42];
  const cap = Math.min(Math.max(1, chapter), book.caps);

  const verses = (await fromBolls(book.n, cap)) || (await fromBibleApi(book.slug, cap));
  if (!verses?.length) {
    return NextResponse.json({ error: "Capítulo indisponível agora." }, { status: 502 });
  }

  return NextResponse.json({
    livro: book.nome,
    capitulo: cap,
    versiculos: verses,
    versao: "Almeida",
  });
}

async function fromBolls(book: number, chapter: number) {
  try {
    const res = await fetch(`https://bolls.life/get-text/ALM/${book}/${chapter}/`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { verse: number; text: string }[];
    if (!Array.isArray(data) || !data.length) return null;
    return data.map((v) => ({ n: v.verse, texto: clean(v.text) }));
  } catch {
    return null;
  }
}

async function fromBibleApi(slug: string, chapter: number) {
  try {
    const res = await fetch(`https://bible-api.com/${slug}+${chapter}?translation=almeida`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { verses?: { verse: number; text: string }[] };
    if (!data.verses?.length) return null;
    return data.verses.map((v) => ({ n: v.verse, texto: clean(v.text) }));
  } catch {
    return null;
  }
}

function clean(text: string) {
  return text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
