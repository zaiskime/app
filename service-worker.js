const CACHE_NAME = 'saulute-v1';
const FONT_CACHE = 'saulute-fonts-v1';

const ASSETS = [
  '/app/',
  '/app/index.html',
  '/app/style.css',
  '/app/js/data.js',
  '/app/js/phrases.js',
  '/app/js/audio.js',
  '/app/js/fx.js',
  '/app/js/mechanics/matching.js',
  '/app/js/mechanics/quiz.js',
  '/app/js/mechanics/dragdrop.js',
  '/app/js/mechanics/fill.js',
  '/app/js/mechanics/index.js',
  '/app/js/game.js',
  '/app/manifest.json',
  '/app/icons/icon-192.png',
  '/app/icons/icon-512.png',
  '/app/icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== FONT_CACHE)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.destination === 'font' || url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => {
        return cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => cached);
        });
      })
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok && event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/app/index.html');
          }
          return new Response('', { status: 504, statusText: 'Offline' });
        });
      })
    );
  }
});
