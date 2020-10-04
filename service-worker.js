const CACHE_NAME = "SpaceARK7-v3";
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
  "/fonts/poppins-v13-latin",
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
