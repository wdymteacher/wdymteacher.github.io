/* keeps School Aces working offline (solo mode); always asks for the newest version first */
const C='school-aces-v1';const FILES=['school-aces.html','school-aces.webmanifest','sa-icon-192.png','sa-icon-512.png','sa-apple-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('school-aces-')&&k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(!FILES.some(f=>u.pathname.endsWith('/'+f)))return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
