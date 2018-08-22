
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then(function (registration) {
                // 注册成功
                console.log(
                    'ServiceWorker registration successful with scope: ',
                     registration.scope)
            })
            .catch(function (err) {
                // 注册失败:(
                console.log('ServiceWorker registration failed: ', err)
            })
    })
}
//
// window.addEventListener('load', () => {
//     if (!('serviceWorker' in navigator)) {
//         // Service Worker isn't supported on this browser, disable or hide UI.
//         return
//     }
//
//     if (!('PushManager' in window)) {
//         // Push isn't supported on this browser, disable or hide UI.
//         return
//     }
//
//     let promiseChain = new Promise((resolve, reject) => {
//         const permissionPromise = Notification.requestPermission(result => {
//             resolve(result)
//         })
//
//         if (permissionPromise) {
//             permissionPromise.then(resolve)
//         }
//     })
//     .then(result => {
//         if (result === 'granted') {
//             execute()
//         }
//         else {
//             console.log('no permission')
//         }
//     })
// })
//
// function registerServiceWorker() {
//     return navigator.serviceWorker.register('sw.js')
//     .then(registration => {
//         console.log('Service worker successfully registered.')
//         return registration
//     })
//     .catch(err => {
//         console.error('Unable to register service worker.', err)
//     })
// }
//
// function execute() {
//     registerServiceWorker().then(registration => {
//         registration.showNotification('Hello World!', {
//             body: 'this is a push!',
//             icon: '32x32.png',
//             image: 'itachi.jpeg',
//             actions: [
//                 {
//                     action: 'foo-action',
//                     title: 'foo',
//                     icon: '32x32.png'
//                 }
//             ]
//         })
//     })
// }
