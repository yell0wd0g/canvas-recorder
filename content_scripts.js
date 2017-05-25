chrome.browserAction.setBadgeText({text: '▶'});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {file: "capturer.js"});
  chrome.browserAction.setBadgeText({text: '\u25CF'});
});

chrome.runtime.onStartup.addListener(function() {
  console.log('Doing startup stuff.');

});


