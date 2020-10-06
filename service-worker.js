const CACHE_NAME = "SpaceARK7-v15b";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/index.css",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/home.html",
  "/pages/howto.html",
  "/css/materialize.min.css",
  "/css/home.css",
  "/css/howto.css",
  "/css/contact.css",
  "/css/about.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/trash-can.png",
  "/css/fonts.css",
  "/jquery-3.5.1.js",
  "/assets/incomes.svg",
  "/assets/plastic.svg",
  "/assets/recycling-bag.svg",
  "/assets/okay.svg",
  "/assets/house.svg",
  "/assets/recycling.svg",
  "/assets/rupiah.svg",
  "/assets/v1-logokartana.png",
  "/assets/teamwork.svg",
  "/assets/united.svg",
  "/assets/facebook.svg",
  "/assets/instagram.svg",
  "/rc.png",
  "/rc258.png",
  "/rc128.png",
  "/manifest.json",
  "/fonts/poppins-v13-latin-regular.woff2",
  "/fonts/poppins-v13-latin-regular.woff",
  "/fonts/poppins-v13-latin-500.woff",
  "/fonts/poppins-v13-latin-500.woff2",
  "/fonts/poppins-v13-latin-800.woff2",
  "/fonts/poppins-v13-latin-700.woff2",
  "/fonts/poppins-v13-latin-600.woff2",
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
