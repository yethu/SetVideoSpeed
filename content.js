'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let { action, data } = request;
  switch (action) {
    case ACTIONS.REQUEST_SET_RATE:
      handleRequestSetRate(data, sendResponse);
      break;
    case ACTIONS.REQUEST_SET_LOOP:
      handleRequestSetLoop(data, sendResponse);
      break;
    case ACTIONS.REQUEST_QUERY:
    default:
      handleRequestQuery(sendResponse);
  }
});

const buildMessage = (action, success, data) => ({ action, success, data });

const handleRequestSetRate = ({ rate }, sendResponse) => {
  let videos = document.getElementsByTagName('video');
  let videoExists = videos.length != 0;

  if (videoExists) {
    let currentVideo = videos.item(0);
    currentVideo.playbackRate = rate;
  }

  sendResponse(buildMessage(ACTIONS.FULFILLED_SET_RATE, videoExists, { rate }));
};

const handleRequestSetLoop = ({ loop }, sendResponse) => {
  let videos = document.getElementsByTagName('video');
  let videoExists = videos.length != 0;

  if (videoExists) {
    let currentVideo = videos.item(0);
    currentVideo.loop = loop;
  }

  sendResponse(buildMessage(ACTIONS.FULFILLED_SET_LOOP, videoExists, { loop }));
};

const handleRequestQuery = sendResponse => {
  let videos = document.getElementsByTagName('video');
  let videoExists = videos.length != 0;
  let currentRate = 1;
  let currentLoop = false;

  if (videoExists) {
    let currentVideo = videos.item(0);
    currentRate = currentVideo.playbackRate;
    currentLoop = currentVideo.loop;
  }

  sendResponse(
    buildMessage(ACTIONS.FULFILLED_QUERY, videoExists, {
      rate: currentRate,
      loop: currentLoop,
    })
  );
};
