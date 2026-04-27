const CACHE_NAME = 'bau-protokoll-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.png',
    './logo.png' // <-- Hier wird das neue Logo für Offline mitgespeichert
];

// Installieren und Dateien in den Cache laden
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Offline-Abruf
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});