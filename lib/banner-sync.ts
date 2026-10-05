import { getSessionUserId } from "@/lib/agape-db";
import { blobParaDataUrl } from "@/lib/banner-idb";
import { getSupabase } from "@/lib/supabase";

export const BANNER_SETUP_SQL = `create table if not exists public.banners (
  chave text primary key,
  url text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id) on delete set null
);
alter table public.banners enable row level security;
drop policy if exists "banners_ler" on public.banners;
create policy "banners_ler" on public.banners for select to anon, authenticated using (true);
drop policy if exists "banners_escrever" on public.banners;
create policy "banners_escrever" on public.banners for all to authenticated
using (public.has_funcao('painel') or public.has_funcao('admin'))
with check (public.has_funcao('painel') or public.has_funcao('admin'));
grant select on public.banners to anon, authenticated;
grant insert, update, delete on public.banners to authenticated;`;

function faltaTabela(msg: string, code?: string) {
  const t = `${code || ""} ${msg}`.toLowerCase();
  return /does not exist|schema cache|pgrst205|42p01|could not find the table/.test(t);
}

export async function tabelaBannersOk() {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from("banners").select("chave").limit(1);
  return !error;
}

export async function publicarBanner(id: string, blob: Blob) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase não configurado");
  const uid = await getSessionUserId();
  const path = `${id}.jpg`;
  let url = "";
  const up = await sb.storage.from("banners").upload(path, blob, {
    upsert: true,
    contentType: "image/jpeg",
    cacheControl: "60",
  });
  if (!up.error) {
    url = `${sb.storage.from("banners").getPublicUrl(path).data.publicUrl}?v=${Date.now()}`;
  } else {
    url = await blobParaDataUrl(blob);
  }
  const row = {
    chave: id,
    url,
    updated_at: new Date().toISOString(),
    updated_by: uid || null,
  };
  let { error } = await sb.from("banners").upsert(row);
  if (error && uid && /updated_by|foreign key/i.test(error.message)) {
    const retry = await sb.from("banners").upsert({ chave: id, url, updated_at: row.updated_at });
    error = retry.error;
  }
  if (error) {
    if (faltaTabela(error.message, error.code)) {
      throw new Error("Falta criar a tabela de banners no Supabase. Use Copiar SQL no topo do painel.");
    }
    throw new Error(error.message);
  }
  return url;
}

export async function removerBannerRemoto(id: string) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase não configurado");
  await sb.storage.from("banners").remove([`${id}.jpg`]);
  const { error } = await sb.from("banners").delete().eq("chave", id);
  if (error && !faltaTabela(error.message, error.code)) throw new Error(error.message);
}
