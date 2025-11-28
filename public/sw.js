// Teilen PWA Service Worker
const CACHE_NAME = 'teilen-v1'
const RUNTIME_CACHE = 'teilen-runtime'

// Assets críticos para cachear en instalación
const PRECACHE_ASSETS = [
  '/',
  '/hero.webp',
  '/teilen-og.png',
  '/favicon.ico',
]

// Instalación: pre-cachea assets críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activación: limpia caches antiguos
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE]
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName))
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete)
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch: estrategia Network First con fallback a Cache
self.addEventListener('fetch', (event) => {
  // Solo cachea GET requests
  if (event.request.method !== 'GET') return

  // Skip para requests de APIs externas y analytics
  const url = new URL(event.request.url)
  if (
    url.origin !== location.origin ||
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('google-analytics') ||
    url.hostname.includes('googletagmanager')
  ) {
    return
  }

  event.respondWith(
    caches.open(RUNTIME_CACHE).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          // Cachea respuestas exitosas
          if (response.status === 200) {
            cache.put(event.request, response.clone())
          }
          return response
        })
        .catch(() => {
          // Si falla la red, intenta con el cache
          return cache.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            // Fallback para páginas HTML
            if (event.request.headers.get('accept').includes('text/html')) {
              return cache.match('/')
            }
          })
        })
    })
  )
})
