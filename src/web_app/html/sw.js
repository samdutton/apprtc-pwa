/*
  Copyright 2017 Google Inc. All Rights Reserved.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const FILES = [
  '/',
  'js/apprtc.debug.js',
  'js/init.js',
  '/callstats/callstats.min.js',
  '/callstats/sha.js',
  '/callstats/socket.io.js'
];

self.addEventListener('install', (event) => {
  console.log('Service worker:', event);
  event.waitUntil(installHandler(event));
});

self.addEventListener('activate', (event) => {
  console.log('Service worker:', event);
  clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log('Service worker:', event);
  event.respondWith(fetchHandler(event.request));
});

async function installHandler(event) {
  const cache = await caches.open('v1');
  cache.addAll(FILES);
  self.skipWaiting();
}

async function fetchHandler(request) {
  if (request.method !== 'GET') {
    return fetch(request);
  }
  const cache = await caches.open('v1');
  const cacheResult = await cache.match(request);
  if (cacheResult) {
    return cacheResult;
  }
  const fetchResult = await fetch(request);
  if (fetchResult.ok) {
    cache.put(request, fetchResult.clone());
  }
  return fetchResult;
}
