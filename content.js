'use strict';

const ACTIONS = {
  REQUEST_QUERY: 'REQUSET_QUERY',
  REQUEST_SET_RATE: 'REQUEST_SET_RATE',
  FULFILLED_QUERY: 'FULFILLED_QUERY',
  FULFILLED_SET_RATE: 'FULFILLED_SET_RATE',
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let videos = document.getElementsByTagName('video');
  let videoExists = videos.length != 0;
  let currentRate = 0;

  if (!!request) {
    let { action, data } = request;
    switch (action) {
      case ACTIONS.REQUEST_SET_RATE:
        let { rate } = data;
        if (videoExists) videos[0].playbackRate = rate;
        sendResponse({
          action: ACTIONS.FULFILLED_SET_STATE,
          success: videoExists,
          data: { rate },
        });
        break;
      case ACTIONS.REQUEST_QUERY:
      default:
        currentRate = videos[0].playbackRate;
        sendResponse({
          action: ACTIONS.FULFILLED_QUERY,
          success: videoExists,
          data: {
            rate: currentRate,
          },
        });
    }
  }
});
