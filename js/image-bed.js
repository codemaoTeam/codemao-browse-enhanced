const timestamp = new Date().getTime();
const urlPath = 'community/' + btoa(`cbe_${timestamp}_${randomString()}`);

function upload() {
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
      formData.append('file', $('#image')[0].files[0]);
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
          alert(imageURL);
        },
        error: function (error) {
          alert(error.responseJSON.error);
        },
      });
    },
  });
}

$('#upload').click(upload);
