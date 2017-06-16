/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* More information about these options at jshint.com/docs/options */

'use strict';

var appController;

function initialize() {
// We don't want to continue if this is triggered from Chrome prerendering,
// since it will register the user to GAE without cleaning it up, causing
// the real navigation to get a "full room" error. Instead we'll initialize
// once the visibility state changes to non-prerender.
if (document.visibilityState === 'prerender') {
  document.addEventListener('visibilitychange', onVisibilityChange);
  return;
}
  appController = new AppController(loadingParams);

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js")["catch"](function(err) {
      console.error("Service worker: unable to register", err);
    });
  }

}

function onVisibilityChange() {
  if (document.visibilityState === 'prerender') {
    return;
  }
  document.removeEventListener('visibilitychange', onVisibilityChange);
  initialize();
}

initialize();
