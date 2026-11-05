const CACHE = 'inventario-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin || e.request.method !== 'GET') return; // la API de Apps Script va directo a la red
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
