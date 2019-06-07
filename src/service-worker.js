var cacheName = 'weatherPWA-4';
var dataCacheName = "weatherData-1";

var filesToCache = [
    '/',
    '/index.html',
    '/main.js',
    '/polyfills.js',
    '/runtime.js',
    '/styles.js',
    '/vendor.js',
    '/assets/images/clear.png',
    '/assets/images/cloudy-scattered-showers.png',
    '/assets/images/cloudy.png',
    '/assets/images/fog.png',
    '/assets/images/ic_add_white_24px.svg',
    '/assets/images/ic_refresh_white_24px.svg',
    '/assets/images/partly-cloudy.png',
    '/assets/images/rain.png',
    '/assets/images/scattered-showers.png',
    '/assets/images/sleet.png',
    '/assets/images/snow.png',
    '/assets/images/thunderstorm.png',
    '/assets/images/wind.png'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = '/forecast/';
    if (e.request.url.includes(dataUrl)) {
        /*
         * When the request URL contains dataUrl, the app is asking for fresh
         * weather data. In this case, the service worker always goes to the
         * network and then caches the response. This is called the "Cache then
         * network" strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
         */
        e.respondWith(
            caches.open(dataCacheName).then(function (cache) {
                return fetch(e.request).then(function (response) {
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        /*
         * The app is asking for app shell files. In this scenario the app uses the
         * "Cache, falling back to the network" offline strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
         */
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});