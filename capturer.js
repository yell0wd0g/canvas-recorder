var canvases = document.querySelectorAll("canvas");

console.log("# canvases " + canvases.length);

var theCanvas = canvases[0];
var theStream = theCanvas.captureStream();
var theRecorder;
var recordedChunks = [];

try {
  theRecorder = new MediaRecorder(theStream);
} catch (e) {
  console.assert(false, 'Exception while creating MediaRecorder: ' + e);
}

theRecorder.ondataavailable = function(event) {
  recordedChunks.push(event.data);
}
theRecorder.onstop = function() {
  console.log('stopping!');
  theStream.getVideoTracks()[0].stop();
  saveByteArray(recordedChunks, 'test.webm');
}
theRecorder.start();
console.log('recording!');

function saveByteArray(data, name) {
  var blob = new Blob(data, {type: "video/webm"});
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    theRecorder.stop();
  }
);
