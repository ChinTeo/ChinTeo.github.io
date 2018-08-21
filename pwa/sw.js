const CACHE_KEY = 'v1'
const cacheList = [
    '/js/jquery.js',
    '/style/reset.css'
]
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_KEY).then((cache) => {
            return cache.addAll(cacheList)
        })
    )
})
