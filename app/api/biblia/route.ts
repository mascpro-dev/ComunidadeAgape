import { bibleBooks } from "@/lib/bible-books";
import { bibleVersions, type BibleVersionId } from "@/lib/bible-versions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const bookN = Number(url.searchParams.get("book") || "43");
  const chapter = Number(url.searchParams.get("chapter") || "1");
  const versaoId = (url.searchParams.get("versao") || "almeida") as BibleVersionId;
  const version = bibleVersions.find((v) => v.id === versaoId) || bibleVersions[0];
  const book = bibleBooks.find((b) => b.n === bookN) || bibleBooks[42];
  const cap = Math.min(Math.max(1, chapter), book.caps);

  let verses = await fromBolls(version.bolls, book.n, cap);
  if (!verses?.length && "bibleApi" in version && version.bibleApi) {
    verses = await fromBibleApi(book.slug, cap, version.bibleApi);
  }
  if (!verses?.length) {
    return NextResponse.json({ error: "Capítulo indisponível nesta versão agora." }, { status: 502 });
  }

  return NextResponse.json({
    livro: book.nome,
    capitulo: cap,
    versiculos: verses,
    versao: version.nome,
  });
}

async function fromBolls(slug: string, book: number, chapter: number) {
  try {
    const res = await fetch(`https://bolls.life/get-text/${slug}/${book}/${chapter}/`, {
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

async function fromBibleApi(slug: string, chapter: number, translation: string) {
  try {
    const res = await fetch(`https://bible-api.com/${slug}+${chapter}?translation=${translation}`, {
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
