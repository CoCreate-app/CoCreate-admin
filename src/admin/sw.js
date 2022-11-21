const CACHE_STATIC_NAME = "static-v1";
const CACHE_DYNAMIC_NAME = "dynamic-v2";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
const CACHE_TEMP = 'temp-cache';
const CACHE_DYNAMIC_LIMIT = 50;
const fetchedMap = []
const cacheType = 'cache'
const requestMap = new Map()

function deleteCache(key) {
    return caches.delete(key);
}

self.addEventListener("install", (e) => {
    console.log('Service Worker Installing')

    self.skipWaiting();
    // caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
    //     cache.keys().then((keys) => {
    //         keys.forEach(key => {
    //             fetchedMap.push(key.url)
    //         })
    //         deleteCache()
    //     })
    // })
});

self.addEventListener("activate", async (e) => {
    // console.log('sw activate Event!')
    // const bgFetch = await self.registration.backgroundFetch.fetch(new Date().toISOString(), fetchedMap);
    // console.log('backgfetch', bgFetch)

    // e.waitUntil(updateCache())
        // updateCache() 
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
            
            if (cacheType == 'cache' && !!cachesObj) {
                // console.log('returned from cache')
                requestMap.set(cachesObj, '')
                fetch(e.request).then((newResp) => {
                    caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                            cache.put(e.request, newResp);
                            // cleanCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
                    }).catch(() => {

                    });
                }).catch(() => {
                    return caches.match('./offline.html');
                })
                return cachesObj;
            } else {
                return fetch(e.request).then((newResp) => {
                        caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                            cache.put(e.request, newResp);
                            // cleanCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
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

async function updateCache(){
    console.log('updateCache!')
    caches.open(CACHE_DYNAMIC_NAME)
        .then((cache) => {
            console.log('added', fetchedMap)
            cache.addAll(fetchedMap)
        }
    )
}

self.addEventListener('backgroundfetchsuccess', (event) => {
    const bgFetch = event.registration;
  
    event.waitUntil(async function() {
      // Create/open a cache.
      const cache = await caches.open(CACHE_DYNAMIC_NAME);
      // Get all the records.
      const records = await bgFetch.matchAll();
      // Copy each request/response across.
      const promises = records.map(async (record) => {
        const response = await record.responseReady;
        console.log('putting ')
        await cache.put(record.request, response);
      });
  
      // Wait for the copying to complete
      await Promise.all(promises);
  
      // Update the progress notification.
    //   event.updateUI({ title: 'Episode 5 ready to listen!' });
    }());
  });