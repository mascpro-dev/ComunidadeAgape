export async function hashPassword(password: string) {
  const data = new TextEncoder().encode(`agape::${password}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const SESSION_KEY = "agape-session-id";

export function getSessionId() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(SESSION_KEY) || "";
}

export function setSession(id: string) {
  sessionStorage.setItem(SESSION_KEY, id);
  localStorage.setItem("agape-meu-id", id);
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
