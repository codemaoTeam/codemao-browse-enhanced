// 将图片逐个添加到页面
function createImage(data) {
  const history = data.imageBedHistory;
  if (history.length > 0) {
    $('.empty').css('display', 'none');
    for (const url of history) {
      const col = $(
        `<div class="col-lg-3">
            <div class="image" data-url="${url}"></div>
        </div>`
      );
      col.children('.image').css('background-image', `url(${url})`);
      col.click(() => {
        navigator.clipboard.writeText(url);
        alert('复制成功');
      });
      $('.row').prepend(col);
    }
  }
}

// 清除所有图片上传数据
function clearImage() {
  chrome.storage.local.set({ imageBedHistory: [] });
  location.reload();
}

const history = chrome.storage.local.get({ imageBedHistory: [] }, createImage);

$(function () {
  $('#clear-btn').click(clearImage);
});
