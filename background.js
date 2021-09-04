chrome.tabs.onUpdated.addListener(function (id, info, tab) {
  if (info.status == 'complete') {
    chrome.tabs.sendMessage(tab.id, 'pathChanged');
  }
});
