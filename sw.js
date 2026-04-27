const CACHE_NAME = 'bau-protokoll-v2'; // WICHTIG: Auf v2 geändert!
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.png',
    './logo.png',
    // Die PDF Bibliothek offline abspeichern:
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js' 
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