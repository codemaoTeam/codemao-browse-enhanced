chrome.runtime.onMessage.addListener((message) => {
  if (message == 'pathChanged') resetTitle();
});

pathDict = {
  '/course': '课程',
  '/discover': '发现',
  '/work_shop': '工作室',
  '/community': '论坛',
  '/mall': '素材',
  '/gallery': '活动',
  '/download': '下载',
  '/work': '作品',
  '/publish': '发布作品',
  '/my': '作品管理',
  '/user': '用户',
  '/setting': '设置',
  '/message': '信息箱',
  '/friendly_protocol': '用户等级',
  '/detection': '活动',
  '/jobs': '校园招聘',
  '/detection': '设备检测',
};

function resetTitle() {
  if (location.host == 'shequ.codemao.cn') {
    pathname = location.pathname;

    for (let pn in pathDict) {
      if (pathname.startsWith(pn)) {
        setTitle(pathDict[pn]);
        return;
      }
    }
  }
}

function setTitle(name) {
  document.title = `${name} | 编程猫社区`;
}
