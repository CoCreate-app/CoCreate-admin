const CACHE_DYNAMIC_NAME = "dynamic-v2";

let cacheType = true

// ToDo: use indexeddb to store cache type as localstorage not supported and cocreateConfig does not exist whn service worker runs
// let cacheType
// const CoCreateConfig = globalThis['CoCreateConfig']
// if (CoCreateConfig)
//     cacheType = CoCreateConfig.cache
// if (cacheType === undefined || cacheType === null)
//     cacheType = true
//     cacheType = localStorage.getItem('cache') || true

function deleteCache(key) {
    return caches.delete(key);
}

self.addEventListener("install", (e) => {
    console.log('Service Worker Installing')
    self.skipWaiting();
});

self.addEventListener("activate", async (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener("fetch", (e) => {
    if (!(e.request.url.indexOf('http') === 0)) return;
    e.respondWith(
        caches
        .match(e.request)
        .then((cachesObj) => {
            if (!navigator.onLine && !!cachesObj)
                return cachesObj;
            
            if (cacheType && cacheType !== 'false' && !!cachesObj) {
                fetch(e.request).then((newResp) => {
                    caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                        if (newResp.status !== 206 && newResp.status !== 502 && newResp.status !== 504)
                            cache.put(e.request, newResp);
                    }).catch(() => {

                    });
                }).catch(() => {
                    return caches.match('./offline.html');
                })
                return cachesObj;
            } else {
                return fetch(e.request).then((newResp) => {
                        caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                            if (newResp.status !== 206)
                                cache.put(e.request, newResp);
                        }).catch(() => {});
                        return newResp.clone();
                    })
                    .catch(() => {
                        return caches.match('./offline.html');
                    })
                }
        })
        .catch(function() {
            console.log('Fetch failed retuned offline page! ')
            return caches.match('./offline.html');
        })
    );
});


// self.addEventListener('backgroundfetchsuccess', (event) => {
//     const bgFetch = event.registration;
  
//     event.waitUntil(async function() {
//       // Create/open a cache.
//       const cache = await caches.open(CACHE_DYNAMIC_NAME);
//       // Get all the records.
//       const records = await bgFetch.matchAll();
//       // Copy each request/response across.
//       const promises = records.map(async (record) => {
//         const response = await record.responseReady;
//         console.log('putting ')
//         await cache.put(record.request, response);
//       });
  
//       // Wait for the copying to complete
//       await Promise.all(promises);
  
//       // Update the progress notification.
//     //   event.updateUI({ title: 'Episode 5 ready to listen!' });
//     }());
//   });