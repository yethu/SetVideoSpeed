'use strict';

let playbackRate = document.getElementById('playbackRate');
let setPlaybackRate = document.getElementById('setPlaybackRate');
let resetPlaybackRate = document.getElementById('resetPlaybackRate');
let closePopUp = document.getElementById('closePopUp');

const DEFAULT_RATE = 1;

const setRate = rate => {
  let code = `document.getElementsByTagName('video')[0].playbackRate = ${rate}`;
  chrome.tabs.executeScript({ code });
};

const setRateFromInput = val => {
  if (isNaN(val)) return;

  setRate(val);
};

resetPlaybackRate.addEventListener('click', _ => {
  setRate(DEFAULT_RATE);
  playbackRate.value = DEFAULT_RATE;
});

setPlaybackRate.addEventListener('click', _ =>
  setRateFromInput(playbackRate.value)
);

closePopUp.addEventListener('click', _ => window.close());

playbackRate.addEventListener('keypress', e => {
  if (e.key === 'Enter') setRateFromInput(playbackRate.value);
});
