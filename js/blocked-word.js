chrome.runtime.onMessage.addListener((message) => {
  if (message.name == 'blockedWord') {
    const delimiter = '\u200b';
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
