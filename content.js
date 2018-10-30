'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let videos = document.getElementsByTagName('video');
  let videoExists = videos.length != 0;
  let currentRate = 0;

  if (!!request) {
    let { command } = request;
    switch (command) {
      case 'set_rate':
        let { rate } = request;
        if (videoExists) videos[0].playbackRate = rate;
        break;
      case 'query':
      default:
        currentRate = videos[0].playbackRate;
        sendResponse({ currentRate });
    }
  }
});
