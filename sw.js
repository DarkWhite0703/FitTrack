/**
 * FitTrack — Service Worker
 * Gère la mise en cache et le mode hors-ligne (Offline First)
 */

// Nom et version du cache — incrémenter la version force une mise à jour
const CACHE_NAME = 'fittrack-v1.0.0';

// Liste de tous les fichiers à mettre en cache lors de l'installation
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

// ─── Événement INSTALL ──────────────────────────────────────────────────────
// Déclenché une seule fois lors de la première installation du SW.
// On pré-cache tous les assets statiques.
self.addEventListener('install', (event) => {
  console.log('[SW] Installation en cours...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Mise en cache des assets statiques');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      // Force le nouveau SW à devenir actif sans attendre la fermeture des onglets
      return self.skipWaiting();
    })
  );
});

// ─── Événement ACTIVATE ─────────────────────────────────────────────────────
// Déclenché quand le SW prend le contrôle.
// On supprime les anciens caches pour libérer de l'espace.
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation et nettoyage des anciens caches...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME) // Garde uniquement le cache actuel
          .map((name) => {
            console.log(`[SW] Suppression du cache obsolète : ${name}`);
            return caches.delete(name);
          })
      );
    }).then(() => {
      // Prend immédiatement le contrôle de tous les clients ouverts
      return self.clients.claim();
    })
  );
});

// ─── Événement FETCH ────────────────────────────────────────────────────────
// Intercepte toutes les requêtes réseau.
// Stratégie : Cache First → si non trouvé, réseau → puis mise en cache.
self.addEventListener('fetch', (event) => {
  // On ignore les requêtes non-GET (POST, etc.)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // ✅ Trouvé dans le cache → retour immédiat (mode offline possible)
      if (cachedResponse) {
        return cachedResponse;
      }

      // 🌐 Pas dans le cache → requête réseau
      return fetch(event.request).then((networkResponse) => {
        // Vérification que la réponse est valide avant de la cacher
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // On clone la réponse car elle ne peut être consommée qu'une fois
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // En cas d'échec réseau total, on retourne index.html (fallback)
        return caches.match('/index.html');
      });
    })
  );
});
