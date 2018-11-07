'use strict';

let playbackRate = document.getElementById('playbackRate');
let loopControl = document.getElementById('loopControl');
let setPlaybackRate = document.getElementById('setPlaybackRate');
let resetPlaybackRate = document.getElementById('resetPlaybackRate');
let closePopUp = document.getElementById('closePopUp');

const DEFAULT_RATE = 1;

const updateUI = () =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(
      activeTab.id,
      { action: ACTIONS.REQUEST_QUERY, data: {} },
      response => {
        try {
          const { action, success, data } = objectContract(response);
          if (action == ACTIONS.FULFILLED_QUERY && success) {
            playbackRate.value = data.rate;
            loopControl.checked = data.loop;
          }
        } catch (e) {
          console.warn('Received invalid message.');
        }
      }
    );
  });

updateUI();

const setRate = rate => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      action: ACTIONS.REQUEST_SET_RATE,
      data: { rate },
    });
  });
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

loopControl.addEventListener('click', e =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    let activeTab = tabs[0];
    console.log(e.target.checked);
    chrome.tabs.sendMessage(activeTab.id, {
      action: ACTIONS.REQUEST_SET_LOOP,
      data: { loop: e.target.checked },
    });
  })
);
