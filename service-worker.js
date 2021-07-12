var CACHE_NAME = "local-cache";
var STATIC_ASSETS =
    [
        "/",
        "css/bootstrap.min.css",
        "js/bootstrap/popper.min.js",
        "js/bootstrap/jquery-3.2.1.min.js",
        "js/bootstrap/bootstrap.min.js",
        "js/fetch-api/movie.main.js",
        "assets/logo/info-white.svg",
        "assets/logo/logo-dark.png",
        "assets/logo/logo-white.png",
        "assets/content/searching.png",
        "assets/content/result.png"
    ];

async function preCache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(STATIC_ASSETS);
}

self.addEventListener("install", (event) => {
    console.log("installed finished");
    event.waitUntil(preCache());
});


self.addEventListener("activate", (event) => {
    console.log("activated");
});

async function fetchAssets(event) {
    try {
        const response = await fetch(event.request);
        return response;
    } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request);
    }
}

self.addEventListener("fetch", (event) => {
    console.log("fetched finished");
    event.respondWith(fetchAssets(event));
});