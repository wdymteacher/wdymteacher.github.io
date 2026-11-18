/* keeps Save Sagwa! working offline */
const C='save-sagwa-v2';const FILES=['save-sagwa.html','save-sagwa.webmanifest','sagwa-icon-192.png','sagwa-icon-512.png','sagwa-apple-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('save-sagwa-')&&k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(!FILES.some(f=>u.pathname.endsWith('/'+f)))return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
