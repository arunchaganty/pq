// pq: paper queue

/**
 * @param {function(string)} callback - called when the current URL is
 * received.
 */
function getCurrentTab(callback) {
  chrome.tabs.query({'active': true, 'currentWindow': true},
      function(tabs) {
        callback(tabs[0]);
      });
}

function addToQueue(url) {
  chrome.storage.sync.set({'queue': url}, function() {
    message('settings saved.');
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTab(function(tab) {
    // Put the image URL in Google search.
    var url = tab.url;
    addToQueue(url);
    $('#status').html("Adding current page <b>" + tab.title + "</b> to queue.");
  });
});
