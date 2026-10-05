const DB = "agape-banners";
const STORE = "capas";

function abrir(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error("indexedDB"));
  });
}

export async function blobParaDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => resolve(String(leitor.result || ""));
    leitor.onerror = () => reject(leitor.error || new Error("leitura"));
    leitor.readAsDataURL(blob);
  });
}

export async function salvarBannerLocal(id: string, dataUrl: string) {
  const db = await abrir();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error("gravação"));
    tx.objectStore(STORE).put(dataUrl, id);
  });
  db.close();
}

export async function apagarBannerLocal(id: string) {
  const db = await abrir();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error("exclusão"));
    tx.objectStore(STORE).delete(id);
  });
  db.close();
}

export async function lerBannersLocais(): Promise<Record<string, string>> {
  const db = await abrir();
  const out: Record<string, string> = await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const st = tx.objectStore(STORE);
    const req = st.openCursor();
    const mapa: Record<string, string> = {};
    req.onsuccess = () => {
      const cursor = req.result;
      if (!cursor) {
        resolve(mapa);
        return;
      }
      if (typeof cursor.key === "string" && typeof cursor.value === "string") {
        mapa[cursor.key] = cursor.value;
      }
      cursor.continue();
    };
    req.onerror = () => reject(req.error || new Error("leitura"));
  });
  db.close();
  return out;
}
