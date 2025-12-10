self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("running-cache-v1").then(cache => { // Changement de version pour forcer la mise à jour
      return cache.addAll([
        "./", // Cache la page principale
        "index.html",
        "manifest.json",
        // Ajoutez ici tous les fichiers d'icônes que vous avez
        "icon-192.png",
        "icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      // Stratégie "Cache First" : retourne la version en cache si elle existe
      return resp || fetch(event.request);
    })
  );
});
