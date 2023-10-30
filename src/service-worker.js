/********************************************************************************
 * Copyright (C) 2023 CoCreate and Contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 ********************************************************************************/

/**
 * Commercial Licensing Information:
 * For commercial use of this software without the copyleft provisions of the AGPLv3,
 * you must obtain a commercial license from CoCreate LLC.
 * For details, visit <https://cocreate.app/licenses/> or contact us at sales@cocreate.app.
 */

const cacheName = "dynamic-v2";
let organization_id = ""
let storage = true
let returnedFromCache = {};

const queryString = self.location.search;
const queryParams = new URLSearchParams(queryString);
let cacheType = queryParams.get('cache');

self.addEventListener("install", (e) => {
    console.log('Service Worker Installing')
    self.skipWaiting();
});

self.addEventListener("activate", async (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener("fetch", async (e) => {
    if (!(e.request.url.indexOf('http') === 0) || e.request.method === 'POST') return;

    e.respondWith(
        caches
            .match(e.request)
            .then(async (cacheResponse) => {
                if (!navigator.onLine || !!cacheResponse && cacheType !== 'false') {
                    const organization = cacheResponse.headers.get('organization')
                    const lastModified = cacheResponse.headers.get('last-modified')

                    returnedFromCache[e.request.url] = { organization, lastModified }
                    return cacheResponse;
                } else {
                    const networkResponse = await fetch(e.request);

                    if (!organization_id)
                        organization_id = networkResponse.headers.get('organization')

                    let storageHeader = networkResponse.headers.get('storage')
                    if (storageHeader)
                        storage = storageHeader

                    if (cacheType && cacheType !== 'false') {
                        console.log('caching')

                        caches.open(cacheName).then((cache) => {
                            if (networkResponse.status !== 206 && networkResponse.status !== 502) {
                                const networkModified = networkResponse.headers.get('last-modified');
                                // if (!networkModified) {
                                //     networkResponse.headers.set('Last-Modified', new Date().toISOString());
                                // }
                                cache.put(e.request, networkResponse);
                                if (cacheType === 'reload' || cacheType === 'prompt') {
                                    const cacheModified = cacheResponse.headers.get('last-modified');
                                    if (networkModified !== cacheModified) {
                                        self.clients.matchAll().then((clients) => {
                                            clients.forEach((client) => {
                                                client.postMessage({ action: 'cacheType', cacheType }); // Send a custom message
                                                console.log(`file ${cacheType} has been triggered`)
                                            });
                                        });
                                    }
                                }
                            }
                        }).catch(() => {

                        });
                    }

                    if (!cacheResponse || cacheType === 'false' || cacheType === 'offline') {
                        return networkResponse.clone();
                    }

                }

                if (!!cacheResponse && cacheType !== 'false' && cacheType !== 'offline') {
                    return cacheResponse;
                }

            })
            .catch(function () {
                return caches.match('./offline.html');
            })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'getOrganization')
        event.source.postMessage({ action: 'getOrganization', organization_id });
    else if (event.data.action === 'checkCache') {
        event.source.postMessage({ action: 'checkCache', returnedFromCache: { ...returnedFromCache } });
        returnedFromCache = {}
    }
});


self.addEventListener('push', (event) => {
    const pushData = event.data.json(); // Assuming the push payload is JSON data

    // Process the push notification data as needed
    const { socketUrl, _id } = pushData;

    // Establish a WebSocket connection
    const socket = new WebSocket(socketUrl);

    // Handle WebSocket events
    socket.addEventListener('open', () => {
        // The WebSocket connection is open, send the message to the server
        socket.send(JSON.stringify({ method: 'read.object', array: 'files', object: { _id }, uid: '' }));
    });

    socket.addEventListener('message', (event) => {
        // Handle messages received from the server over the WebSocket
        const serverData = JSON.parse(event.data);
        if (serverData.uid === uid) {
            // TODO: add file to cache and close socket
        }
    });

    socket.addEventListener('close', () => {
        // Handle the WebSocket connection being closed
        console.log('WebSocket connection closed.');
    });

    socket.addEventListener('error', (error) => {
        // Handle WebSocket errors
        console.error('WebSocket error:', error);
    });

    // Ensure that the service worker stays active until the WebSocket connection is closed
    event.waitUntil(
        new Promise((resolve) => {
            socket.addEventListener('close', () => {
                resolve();
            });
        })
    );
});

// self.addEventListener('backgroundfetchsuccess', (event) => {
//     const bgFetch = event.registration;

//     event.waitUntil(async function() {
//       // Create/open a cache.
//       const cache = await caches.open(cacheName);
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
