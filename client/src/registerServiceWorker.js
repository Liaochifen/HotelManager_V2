import { register } from 'register-service-worker'


// //var CACHE_STATIC_NAME = 'static-v1';
// //var STATIC_FILES = [
// //  '/',
// //  '/img/icons/android-chrome-192x192.png'
// //];


// //console.log(cacheNames.precache);
// //console.log(cacheNames.runtime);
// //console.log(cacheNames.googleAnalytics);

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            //      console.log(
            //        '[Service Worker Ready] App is being served from cache by a service worker.\n' +
            //        'For more details, visit https://goo.gl/AFskqB'
            //      )
            //      console.log(event)
        },
        registered() {
            console.log('successful')
            //      console.log('[Service Worker Registered] Service worker has been registered.')
            //      console.log(event)

            //      caches.open(CACHE_STATIC_NAME)
            //        .then((cache) => {
            //          console.log('[Service Worker] Precaching App Shell...');
            //          cache.addAll(STATIC_FILES);
            //        })
        },
        cached() {
            //      console.log('[Service Worker Cached] Content has been cached for offline use.')
            //      console.log()


        },
        updatefound() {
            //      console.log('[Service Worker Update Found] New content is downloading.')
            //      console.log(event)
        },
        updated() {
            //     console.log('[Service Worker Updated] New content is available; please refresh.')
            //      console.log(event)
        },
        offline() {
            //      console.log('[Service Worker Offline] No internet connection found. App is running in offline mode.')
            //      console.log(event)
        },
        error() {
            //      console.error('Error during service worker registration:', error)
        }
    })
}
