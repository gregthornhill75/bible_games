// Kill-switch service worker. Any fork that previously registered a SW will,
// on next update check, replace the old SW with this one. On install/activate:
// clears caches, unregisters itself, and reloads open clients.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) {}
    try {
      await self.registration.unregister();
    } catch (e) {}
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.navigate(client.url);
      }
    } catch (e) {}
  })());
});

// Never intercept fetch — pass through to network.
self.addEventListener('fetch', () => {});
