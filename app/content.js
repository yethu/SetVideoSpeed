'use strict';

import ACTIONS from './constants';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let { action, data } = request;
  switch (action) {
    case ACTIONS.REQUEST_SET_RATE:
      handleRequestSetState(data, action, sendResponse, setRate);
      break;
    case ACTIONS.REQUEST_SET_LOOP:
      handleRequestSetState(data, action, sendResponse, setLoop);
      break;
    case ACTIONS.REQUEST_QUERY:
    default:
      handleRequestQuery(sendResponse);
  }
});

const setRate = ({ rate }, video) => (video.playbackRate = rate);

const setLoop = ({ loop }, video) => (video.loop = loop);

const buildMessage = (action, success, data) => ({ action, success, data });

const handleRequestSetState = (prop, action, sendResponse, setVideoProp) => {
  let videos = document.getElementsByTagName('video');
  let videoExists = videos.length != 0;

  if (videoExists) {
    let currentVideo = videos.item(0);
    setVideoProp(prop, currentVideo);
  }

  sendResponse(buildMessage(action, videoExists, prop));
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
