self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("agape-v4").then((cache) =>
      cache.addAll(["/icon.svg", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png", "/logo-marca.png", "/logo-horizontal.png"]),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== "agape-v4").map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  const isPage =
    event.request.mode === "navigate" ||
    event.request.destination === "document" ||
    (event.request.headers.get("accept") || "").includes("text/html");

  if (isPage) {
    event.respondWith(fetch(event.request).catch(() => caches.match("/icon-192.png")));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open("agape-v4").then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
