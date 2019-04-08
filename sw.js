console.log('Hello SW123!');
const cacheName = 'cache';
self.addEventListener('install', function (e) {

    e.waitUntil(caches.open(cacheName).then(function (cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/bundle.js',
            '/vendors.js'
        ]);
    }));
});

self.addEventListener('fetch', function (event) {
    // let go non GET requests
    if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                event.waitUntil(update(event.request));
                return response;
            }

            return fetch(event.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        }));
})


function update(request) {
    return caches.open(cacheName).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
} 