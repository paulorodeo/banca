const CACHE_VERSION = "banca-pwa-v1";
const OFFLINE_CACHE = `${CACHE_VERSION}-offline`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

const NEVER_CACHE_PATHS = [
  "/admin",
  "/api/",
  "/contato",
  "/plantao-criminal",
  "/ads.txt",
  "/robots.txt",
  "/sitemap.xml",
  "/rss",
  "/feed",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(OFFLINE_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("banca-pwa-") && ![OFFLINE_CACHE, STATIC_CACHE].includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

function isExcluded(url) {
  return NEVER_CACHE_PATHS.some((path) => url.pathname === path || url.pathname.startsWith(path));
}

function isSafeStaticRequest(request, url) {
  if (request.method !== "GET" || url.origin !== self.location.origin || isExcluded(url)) return false;
  return url.pathname.startsWith("/assets/") || url.pathname.startsWith("/fonts/");
}

async function cacheSafeStatic(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  const cacheControl = response.headers.get("cache-control") ?? "";
  const cacheable =
    response.ok &&
    response.type === "basic" &&
    !response.headers.has("set-cookie") &&
    !/(?:no-store|private)/i.test(cacheControl);
  if (cacheable) {
    const cache = await caches.open(STATIC_CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    if (request.method !== "GET" || url.origin !== self.location.origin || isExcluded(url)) return;
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  if (isSafeStaticRequest(request, url)) event.respondWith(cacheSafeStatic(request));
});
