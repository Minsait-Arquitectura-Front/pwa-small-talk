// Files to cache
const cacheName = 'mi-cache';
const appShellFiles = [
  '/', // Raíz
  '/index.html',
  '/styles/style.css',
  '/scripts/main.js',
  '/data/f1-drivers.json',
];
const driversImages = [];
for (let i = 1; i <= 10; i++) {
  driversImages.push(`/data/images/${i}.jpeg`);
}
const contentToCache = appShellFiles.concat(driversImages);

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  // Cache http and https only, skip unsupported chrome-extension:// and file://...
  if (!(e.request.url.startsWith('http:') || e.request.url.startsWith('https:'))) {
    return;
  }

  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
