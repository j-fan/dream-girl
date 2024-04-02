const d = [
  "/dream-girl/_app/immutable/assets/_layout-d4c9131f.css",
  "/dream-girl/_app/immutable/chunks/singletons-eaab4530.js",
  "/dream-girl/_app/immutable/chunks/_layout-da46b06b.js",
  "/dream-girl/_app/immutable/chunks/0-475b7b80.js",
  "/dream-girl/_app/immutable/chunks/1-df704fba.js",
  "/dream-girl/_app/immutable/modules/pages/_layout.ts-9cbb603b.js",
  "/dream-girl/_app/immutable/chunks/2-3ae5cd15.js",
  "/dream-girl/_app/immutable/components/error.svelte-58c02497.js",
  "/dream-girl/_app/immutable/components/pages/_page.svelte-fc35fa0a.js",
  "/dream-girl/_app/immutable/components/pages/_layout.svelte-028883c6.js",
  "/dream-girl/_app/immutable/chunks/index-6f941af0.js",
  "/dream-girl/_app/immutable/start-9b4f7bbd.js"
], m = [
  "/dream-girl/.nojekyll",
  "/dream-girl/favicon.png",
  "/dream-girl/icon/icon-192x192.png",
  "/dream-girl/icon/icon-256x256.png",
  "/dream-girl/icon/icon-384x384.png",
  "/dream-girl/icon/icon-512x512.png",
  "/dream-girl/manifest.json",
  "/dream-girl/robots.txt"
], r = "1712059033842", c = self, o = `cache${r}`, i = d.concat(
  // Exclude this github pages related file, breaks the service worker
  m.filter((e) => e !== "/.nojekyll")
), p = new Set(i);
c.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(o).then(async (a) => {
      try {
        await a.addAll(i);
      } catch {
        console.warn("cache.addAll failed, attempting to add files individually");
        for await (const s of i)
          try {
            await a.add(s);
          } catch {
            console.warn("This file could not be added:", s);
          }
      }
    }).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (a) => {
      for (const t of a)
        t !== o && await caches.delete(t);
      c.clients.claim();
    })
  );
});
async function h(e) {
  const a = await caches.open(`offline${r}`);
  try {
    const t = await fetch(e);
    return a.put(e, t.clone()), t;
  } catch (t) {
    const s = await a.match(e);
    if (s)
      return s;
    throw t;
  }
}
c.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const a = new URL(e.request.url), t = a.protocol.startsWith("http"), s = a.hostname === self.location.hostname && a.port !== self.location.port, n = a.host === self.location.host && p.has(a.pathname), l = e.request.cache === "only-if-cached" && !n;
  t && !s && !l && e.respondWith(
    (async () => n && await caches.match(e.request) || h(e.request))()
  );
});
