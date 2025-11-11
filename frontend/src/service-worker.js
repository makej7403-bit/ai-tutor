const CACHE = "ft-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/main.jsx", // dynamic; the build will rewrite files — this is a lightweight fallback
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((r) => r || fetch(event.request))
  );
});
