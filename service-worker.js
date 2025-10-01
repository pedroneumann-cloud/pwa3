self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("pwa-cache").then(cache => {
      return cache.addAll([
        "./index.html",
        "./style.css",
        "./script.js",
        "./manifest.json",
        "./icons/icon-192.png",
        "./icons/icon-512.png",
        "./icons/handshake.png",
        "./icons/check.gif"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});