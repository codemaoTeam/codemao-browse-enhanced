const delimiter = '\u200b';

chrome.runtime.onMessage.addListener((message) => {
  if (message.name == 'blockedWord') {
    text = message.info.selectionText;
    var processedText = '';
    for (let char of text) {
      processedText += char + delimiter;
    }

    navigator.clipboard.writeText(processedText);
    chrome.runtime.sendMessage({
      name: 'showNotification',
      title: 'Codemao Browse Enhanced',
      message: '已将处理文本存入剪贴板\n请按下CTRL+V（粘贴）切换原有内容',
    });
  }
});

// 发生复制事件时，去掉屏蔽分隔符
function removeDelimiter(e) {
  navigator.clipboard.readText().then((text) => {
    navigator.clipboard.writeText(text.split(delimiter).join(''));
  });
}

document.addEventListener('copy', removeDelimiter, true);
