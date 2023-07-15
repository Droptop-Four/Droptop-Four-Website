// The name of the new cache your app uses.
const CACHE_NAME = "droptop-four-cache-v1";
// The list of static files your app needs to start.
const PRE_CACHED_RESOURCES = [
    "/",
    "/index.html",
    "/404.html",
    "/css/style.css",
    "/js/main.js",
    "/js/home.js",
    "/img/DroptopFourLogo.webp",
    "/img/help.webp",
    "/img/Home.webp",
    "/img/HomeButtons.webp",
    "/img/Image1.webp",
    "/img/Image2.webp",
    "/img/Image3.webp",
    "/img/Localization.webp",
    "/img/Lock.webp",
    "/img/Support.webp",
    "/img/warning.webp",
  ];

// Listen to the `install` event.
self.addEventListener("install", event => {
  async function preCacheResources() {
    // Open the app's cache.
    const cache = await caches.open(CACHE_NAME);
    // Cache the new static resources.
    cache.addAll(PRE_CACHED_RESOURCES);
  }

  event.waitUntil(preCacheResources());
});

// Listen to the `activate` event to clear old caches.
self.addEventListener("activate", event => {
  async function deleteOldCaches() {
    // List all caches by their names.
    const names = await caches.keys();
    await Promise.all(names.map(name => {
      if (name !== CACHE_NAME) {
        // If a cache's name is the current name, delete it.
        return caches.delete(name);
      }
    }));
  }

  event.waitUntil(deleteOldCaches());
});

