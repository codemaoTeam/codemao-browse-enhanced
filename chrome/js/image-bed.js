$('#image').fileinput({
  language: 'zh',
  allowedFileTypes: ['image'],
  showClose: false,
});

function genCard(status, content) {
  const card = document.createElement('div');
  card.className = 'card';
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  card.appendChild(cardHeader);
  const badge = document.createElement('span');
  badge.className = 'badge';
  cardHeader.appendChild(badge);
  if (status == 'success') {
    badge.innerText = '成功';
    badge.classList.add('badge-success');
    const link = document.createElement('a');
    link.href = content;
    link.target = '_blank';
    link.innerText = content;
    cardHeader.appendChild(link);
  } else {
    badge.innerText = '失败';
    badge.classList.add('badge-danger');
    const errorMsg = document.createElement('span');
    errorMsg.innerText = content;
    cardHeader.appendChild(errorMsg);
  }
  return card;
}

function upload() {
  $('.file-input').css('display', 'none');
  for (let file of $('#image')[0].files) {
    const timestamp = new Date().getTime();
    const urlPath = 'community/' + btoa(`${timestamp}_${randomString()}`);
    $.ajax({
      type: 'get',
      url: `https://open-service.codemao.cn/cdn/qi-niu/tokens/uploading?projectName=community_frontend&filePaths=${urlPath}&fileSign=p1&cdnName=qiniu`,
      dataType: 'json',
      success: function (response) {
        const bucketURL = response.bucket_url;
        const tokenData = response.tokens[0];
        const token = tokenData.token;
        // 文件位于编程猫图床的地址，用于上传
        const filePath = tokenData.file_path;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('token', token);
        formData.append('key', filePath);
        formData.append('fname', 'upload');

        $.ajax({
          type: 'post',
          url: 'https://upload.qiniup.com/',
          headers: {
            contentType:
              'multipart/form-data; boundary=----WebKitFormBoundaryB82exZ0BSOCEpEQS',
          },
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false,
          success: function (response) {
            const imageURL = bucketURL + response.key;
            const card = genCard('success', imageURL);
            $('.result').append(card);
            chrome.storage.local.get({ imageBedHistory: [] }, (data) => {
              const history = data.imageBedHistory;
              history.push(imageURL);
              chrome.storage.local.set({ imageBedHistory: history });
            });
          },
          error: function (error) {
            const card = genCard('error', error.responseJSON.error);
            $('.result').append(card);
          },
        });
      },
    });
  }
}

$('.fileinput-upload-button').click(upload);
