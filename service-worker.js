// Menambahkan nama cache
var CACHE_NAME = "local-cache";
// File yang akan di simpan pada cacha
var STATIC_ASSETS =
    [
        // root
        "/",
        // css
        "css/bootstrap.min.css",
        // js
        "js/bootstrap/popper.min.js",
        "js/bootstrap/jquery-3.2.1.min.js",
        "js/bootstrap/bootstrap.min.js",
        "js/fetch-api/movie.main.js",
        // assets image logo
        "assets/logo/info-white.svg",
        "assets/logo/logo-dark.png",
        "assets/logo/logo-white.png",
        // assets content
        "assets/content/searching.png",
        "assets/content/result.png"
    ];

async function preCache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(STATIC_ASSETS);
}

// Untuk menambahkan opsi instalasi
self.addEventListener("install", (event) => {
    console.log("installed finished");
    event.waitUntil(preCache());
});
self.addEventListener("activate", (event) => {
    console.log("activated");
});

// fetch assets
async function fetchAssets(event) {
    try {
        const response = await fetch(event.request);
        return response;
    } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request);
    }
}

// fetch
self.addEventListener("fetch", (event) => {
    console.log("fetched finished");
    event.respondWith(fetchAssets(event));
});