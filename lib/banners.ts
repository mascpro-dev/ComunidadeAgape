const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nhaqognbizjswdmfoahx.supabase.co")
  .trim()
  .replace(/\/rest\/v1\/?$/, "")
  .replace(/\/$/, "");
const SUPABASE_ANON_KEY = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYXFvZ25iaXpqc3dkbWZvYWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNDA5ODAsImV4cCI6MjEwNjcxNjk4MH0.x-ffpEFsjJ23LjOsUkiLAEUbqCszghknI5zjy-MgiQs"
).trim();

export async function loadBannerOverrides(): Promise<Record<string, string>> {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/banners?select=chave,url`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      cache: "no-store",
    });
    if (!r.ok) return {};
    const rows = (await r.json()) as { chave: string; url: string }[];
    const out: Record<string, string> = {};
    for (const row of rows) {
      if (row.chave && row.url) out[row.chave] = row.url;
    }
    return out;
  } catch {
    return {};
  }
}

export function prepararBanner(file: File, largura: number, altura: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = largura;
      canvas.height = altura;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      const scale = Math.max(largura / img.width, altura / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (largura - w) / 2;
      const y = (altura - h) / 2;
      ctx.fillStyle = "#030b1f";
      ctx.fillRect(0, 0, largura, altura);
      ctx.drawImage(img, x, y, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("blob"))),
        "image/jpeg",
        0.82,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("imagem"));
    };
    img.src = url;
  });
}
