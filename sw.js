const C='money-v4-spec16',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
if(e.request.mode=='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r&&r.status===200){const c=r.clone();caches.open(C).then(x=>x.put('./index.html',c))}return r}).catch(()=>caches.match('./index.html',{ignoreSearch:true})));return}
e.respondWith(caches.match(e.request).then(hit=>{const net=fetch(e.request).then(rr=>{if(rr&&rr.status===200){const c=rr.clone();caches.open(C).then(x=>x.put(e.request,c))}return rr}).catch(()=>hit);return hit||net}))});
