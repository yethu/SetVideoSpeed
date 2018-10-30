chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let videos = document.getElementsByTagName('video');
  let videoExists = videos.length != 0;
  let currentRate = 0;

  if (videoExists) {
    currentRate = videos[0].playbackRate;
  }

  sendResponse({ videoExists, currentRate });
});
