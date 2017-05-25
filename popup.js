function click(e) {
  //  chrome.tabs.executeScript(null,
  //  {code:"console.log('" + e.target.id + "')"});
  if (e.target.id == "on") {
    //chrome.browserAction.setBadgeText({text: '\u25CF'});
    chrome.browserAction.setIcon({ path: 'recording.png' });
    chrome.tabs.executeScript(null, {file: "capturer.js"});
  } else {
    // https://developer.chrome.com/extensions/messaging
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"});
    });
    //chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setIcon({ path: 'icon.png' });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});