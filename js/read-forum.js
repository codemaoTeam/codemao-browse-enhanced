// 修改帖子页面的 HTML 为 Markdown 渲染后的 HTML

function modify() {
  // 获取帖子内容
  const forumContent = $('.r-community-r-detail--forum_content')[0];
  const data = $('.r-community-r-detail--forum_content pre');
  if (data.length == 2) {
    const sign = data[0].innerText;
    let forumText = data[1].innerText;
    forumContent.innerHTML = '';
    if (sign == 'Markdown') {
      // 把 Markdown 代码加载到文档中
      const textarea = document.createElement('textarea');
      textarea.style = 'display: none;';
      textarea.appendChild(document.createTextNode(forumText));
      forumContent.appendChild(textarea);
      forumContent.className = 'markdown-body editormd-html-preview';
      forumContent.id = 'markdown';
      // 渲染 Markdown 为 HTML
      editormd.markdownToHTML('markdown');
    } else if (sign == 'html') {
      forumText = entityToString(forumText);
      // 用 iframe 包装 HTML 内容，以防 XSS 攻击
      const container = document.createElement('iframe');
      forumContent.appendChild(container);
      container.src = 'about:blank';
      container.width = '750px';
      container.onload = function () {
        container.contentDocument.body.innerHTML = forumText;
        // iframe 框高度调整为内容高度
        container.height = container.contentWindow.document.body.scrollHeight;
      };
    }
  }
}

function main() {
  const path = location.pathname;
  if (/^\/community\/\d+\/?$/.test(path)) modify();
}

$('.r-community-r-detail--forum_content').wait(main);
