/* keeps Verb Invaders working offline (solo levels); always asks for the newest version first */
const C='verb-invaders-v1';const FILES=['verb-invaders.html','verb-invaders.webmanifest','vi-icon-192.png','vi-icon-512.png','vi-apple-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('verb-invaders-')&&k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(!FILES.some(f=>u.pathname.endsWith('/'+f)))return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
