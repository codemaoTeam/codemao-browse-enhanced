const options =
  '.r-community-r-detail--right_options .r-community-r-detail--options';

function upPost() {
  const postID = location.pathname.match(/^\/community\/(\d+)\/?$/)[1];
  $.ajax({
    type: 'post',
    url: `https://api.codemao.cn/web/forums/posts/${postID}/replies`,
    data: JSON.stringify({ content: 'ddd' }),
    dataType: 'json',
    contentType: 'application/json',
    xhrFields: {
      withCredentials: true,
    },
    success: function (response) {
      const replyID = response.id;
      const isDelete = confirm(
        '顶贴成功！\n选择“确认”以删除回帖，“取消”以保留回帖'
      );
      if (isDelete) {
        $.ajax({
          type: 'delete',
          url: `https://api.codemao.cn/web/forums/replies/${replyID}`,
          xhrFields: {
            withCredentials: true,
          },
          success: function () {
            alert('删除成功！');
          },
          error: function () {
            alert('删除失败！');
          },
        });
      } else {
        location.reload();
      }
    },
    error: function () {
      alert('顶贴失败');
    },
  });
}

function addBtn() {
  const upPostBtn = $('<a>顶贴</a>');
  upPostBtn.click(upPost);
  $(options).append(upPostBtn);
}

function main() {
  const path = location.pathname;
  if (/^\/community\/\d+\/?$/.test(path)) addBtn();
}

$(options).wait(main);
