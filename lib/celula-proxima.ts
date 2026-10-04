import { celulas } from "@/lib/content";

type Ponto = { lat: number; lng: number };

const cache = new Map<string, Ponto | null>();

function norm(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function haversine(a: Ponto, b: Ponto) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

async function coordsDeCep(cep: string): Promise<Ponto | null> {
  const d = cep.replace(/\D/g, "");
  if (d.length !== 8) return null;
  if (cache.has(d)) return cache.get(d) || null;
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${d}`);
    const data = (await res.json()) as {
      location?: { coordinates?: { latitude?: string | number; longitude?: string | number } };
    };
    const lat = Number(data.location?.coordinates?.latitude);
    const lng = Number(data.location?.coordinates?.longitude);
    const ponto = Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
    cache.set(d, ponto);
    return ponto;
  } catch {
    cache.set(d, null);
    return null;
  }
}

export async function celulaMaisPerto(me?: { cep?: string; bairro?: string; endereco?: string } | null) {
  if (!celulas.length) return "";
  const bairro = norm(me?.bairro || "");
  const porBairro = bairro
    ? celulas.filter((c) => {
        const b = norm(c.bairro);
        return b && (bairro === b || bairro.includes(b) || b.includes(bairro));
      })
    : [];

  const eu = me?.cep ? await coordsDeCep(me.cep) : null;
  if (eu) {
    const lista = porBairro.length ? porBairro : celulas;
    const pontos = await Promise.all(
      lista.map(async (c) => ({ id: c.id, ponto: c.cep ? await coordsDeCep(c.cep) : null })),
    );
    let melhor = lista[0]?.id || celulas[0].id;
    let dist = Infinity;
    for (const p of pontos) {
      if (!p.ponto) continue;
      const d = haversine(eu, p.ponto);
      if (d < dist) {
        dist = d;
        melhor = p.id;
      }
    }
    if (dist !== Infinity) return melhor;
  }

  if (porBairro[0]) return porBairro[0].id;
  return celulas[0].id;
}
