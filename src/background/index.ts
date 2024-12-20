import './sw_omnibox';
import './sw_tips';

console.log("I am service_worker");


chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

export {}