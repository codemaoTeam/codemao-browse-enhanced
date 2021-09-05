chrome.tabs.onUpdated.addListener(function (id, info, tab) {
  if (info.status == 'complete') {
    chrome.tabs.sendMessage(tab.id, 'pathChanged');
  }
});

chrome.runtime.onMessage.addListener((req) => {
  if (req.name == 'showNotification') {
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'images/logo/icon48.png',
      title: req.title,
      message: req.message,
    });
  }
});

chrome.contextMenus.create({
  type: 'normal',
  title: '处理屏蔽词：『%s』',
  contexts: ['selection'],
  documentUrlPatterns: [
    '*://shequ.codemao.cn/*',
    'about:blank', // 富文本编辑器内部
  ],
  id: 'blocked-word',
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == 'blocked-word') {
    chrome.tabs.sendMessage(tab.id, { name: 'blockedWord', info });
  }
});
