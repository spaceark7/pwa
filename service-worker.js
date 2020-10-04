const CACHE_NAME = "SpaceARK7-v13a";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/index.css",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/home.html",
  "/css/materialize.min.css",
  "/css/home.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/icon.png",
  "/trash-can.png",
  "/css/fonts.css",
  "/jquery-3.5.1.js",
  '/assets/incomes.svg',
  '/assets/plastic.svg',
  '/assets/recycling-bag.svg',
  
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log(
            "Service Worker: Menggunakan aset dari cache: ",
            response.url
          );
          return response;
        }
        console.log(
          "Service Worker: Menggunakan aset dari server: ",
          event.request.url
        );

        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("Service Worker: cache " + cacheName + " dihapus!");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
