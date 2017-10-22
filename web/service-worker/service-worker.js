var CACHE_NAME = 'tennis';

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        'bundle.js',
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});


this.addEventListener('fetch', function(event) {
  console.log('SW fetching', event.request)
  //console.log(caches);
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      console.log('does this exist?', resp);
      return resp || fetch(event.request).then(function(response) {
        console.log('fetching', event.request)
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});
