import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { join } from "path";

export const pastaBanners = join(process.cwd(), "data", "banners");
export const manifestoBanners = join(pastaBanners, "manifest.json");

export function chaveBannerOk(id: string) {
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

export function urlBanner(id: string, versao = Date.now()) {
  return `/api/banners/arquivo/${id}?v=${versao}`;
}

export async function lerManifestoBanners(): Promise<Record<string, string>> {
  try {
    return JSON.parse(await readFile(manifestoBanners, "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

export async function gravarManifestoBanners(mapa: Record<string, string>) {
  await mkdir(pastaBanners, { recursive: true });
  await writeFile(manifestoBanners, JSON.stringify(mapa, null, 2));
}

export async function gravarArquivoBanner(id: string, bytes: Buffer) {
  await mkdir(pastaBanners, { recursive: true });
  await writeFile(join(pastaBanners, `${id}.jpg`), bytes);
}

export async function lerArquivoBanner(id: string) {
  return readFile(join(pastaBanners, `${id}.jpg`));
}

export async function apagarArquivoBanner(id: string) {
  try {
    await unlink(join(pastaBanners, `${id}.jpg`));
  } catch {
    /* já não existia */
  }
}
