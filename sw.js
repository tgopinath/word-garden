// Word Garden service worker: network first, cached copy when offline.
const CACHE = 'word-garden-v4';
const CORE = ['./', './index.html', './app.css', './app.js', './kolam/tokens.css', './kolam/kolam.css', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png', './photos/photos.js', './photos/credits.json'];
// The card pictures (img/index.json lists them; regenerate it with tools/img-index.mjs) are cached too, so the game works offline.
// Cartoons (img/index.json) and photos (photos/index.json) are cached on install so every picture works offline.
const cacheList = (c, dir) => fetch(dir + 'index.json').then(r => r.json()).then(list => c.addAll(list.map(f => dir + f))).catch(() => {});
const withImages = c => Promise.all([cacheList(c, './img/'), cacheList(c, './photos/')]);
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).then(() => withImages(c))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  e.respondWith(fetch(r).then(res => {
    if (res.ok && (new URL(r.url).origin === location.origin || r.url.startsWith('https://fonts.'))) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
    return res;
  }).catch(() => caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('./index.html') : undefined))));
});
