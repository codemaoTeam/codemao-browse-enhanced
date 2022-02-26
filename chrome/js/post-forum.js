function edit(type) {
  // 内容发生变化
  function onchange() {
    iframeDoc.body.innerHTML = '';
    // 显示/隐藏相应内容
    if (select.value == '编程猫富文本') {
      editTextarea.style.display = 'none';
      editBCM.style.display = 'block';
    } else {
      editTextarea.style.display = 'block';
      editBCM.style.display = 'none';
      // 编辑器提示
      if (select.value == 'Markdown') {
        editTextarea.placeholder =
          '输入 Markdown 文本，在文章开始加入[TOC]可自动添加目录，如：\n\n[TOC]\n# Markdown\nxxx';
      } else if (select.value == 'html') {
        editTextarea.placeholder =
          '无需html、head、body等元素\n可随意导入样式，脚本等内容';
      }
      editTextarea.placeholder +=
        '\n\n\n警告：请勿尝试 XSS 攻击等危害网站安全的行为';
      // 标识帖子属于相应语法
      const sign = document.createElement('pre');
      sign.style = 'display: none;';
      sign.innerText = select.value;
      // 对没安装扩展的友好提示
      const explain = document.createElement('p');
      explain.innerHTML =
        '本文使用Chrome扩展（Codemao Browse Enhanced）编写，安装后查看渲染内容';
      // 存放代码
      const code = document.createElement('pre');
      if (select.value == 'html') {
        code.innerText = stringToEntity(editTextarea.value);
      } else {
        code.appendChild(document.createTextNode(editTextarea.value));
      }
      iframeDoc.body.appendChild(sign);
      iframeDoc.body.appendChild(explain);
      iframeDoc.body.appendChild(code);
    }
  }

  // 内容编辑表单
  const editBCM = $(`.${type}-forum_sender--form_item`)[1];
  // 贴子发布表单
  const forumContainer = $(`.${type}-forum_sender--container`)[0];
  // 帖子编辑 iframe
  const iframeDoc = $('#react-tinymce-0_ifr')[0].contentDocument;
  iframeDoc.body.innerHTML = '';

  // 文档语法选择框
  const select = document.createElement('select');
  select.style.height = '30px';
  const values = ['编程猫富文本', 'Markdown', 'html'];
  for (const value of values) {
    const option = document.createElement('option');
    option.value = value;
    option.appendChild(document.createTextNode(value));
    select.appendChild(option);
  }
  select.options[0].selected = true;
  select.onchange = onchange;
  select.style.width = '100%';
  select.style.border = '1px solid hsla(0,0%,40%,.28)';
  select.style.borderRadius = '4px';
  forumContainer.insertBefore(select, editBCM);

  // 帖子内容编辑器
  const editTextarea = document.createElement('textarea');
  editTextarea.id = 'editTextarea';
  editTextarea.onkeyup = onchange;
  editTextarea.style.display = 'none';
  editTextarea.style.width = '100%';
  editTextarea.style.height = '300px';
  editTextarea.style.marginBottom = '20px';
  editTextarea.style.resize = 'none';
  editTextarea.style.border = '1px solid hsla(0,0%,40%,.28)';
  editTextarea.style.borderRadius = '4px';
  forumContainer.insertBefore(editTextarea, editBCM);
}

function main() {
  const path = location.pathname;
  if (/^\/community\/?$/.test(path)) {
    // 论坛首页
    edit('r-community-c');
  } else if (/^\/work_shop\/\d+\/?$/.test(path)) {
    // 工作室
    edit('c-post_box');
  }
}

$('#react-tinymce-0_ifr').wait(main);
