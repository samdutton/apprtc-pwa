importScripts('sw-lib.v0.0.17.min.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method cacheRevisionedAssets() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use sw-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
var fileManifest = [
  {
    "url": "/css/main.css",
    "revision": "db3dada626bebc92f4c5e8f2936c1dd2"
  },
  {
    "url": "/",
    "revision": "7dc407e58660c800a9ca28a2cf5fb4c7"
  },
  {
    "url": "/js/apprtc.debug.js",
    "revision": "0ca21f4e2275b396cf45b921a35ede15"
  }
];

self.goog.swlib.cacheRevisionedAssets(fileManifest);
