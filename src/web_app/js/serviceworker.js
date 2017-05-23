if (navigator.serviceWorker) {
  console.log('Service Worker supported');
  navigator.serviceWorker.register('/sw.js')
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}
