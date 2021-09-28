/*
 * @Author: 焦质晔
 * @Date: 2021-08-20 15:08:38
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-08-20 15:43:44
 */
(function () {
  function isIE() {
    return /MSIE|Trident/.test(navigator.userAgent);
  }
  function createTextNode(text) {
    var oNewDiv = document.createElement('div');
    oNewDiv.innerHTML = text;
    return oNewDiv.children[0];
  }
  if (isIE()) {
    var __html__ = [
      '<div style="position: absolute; width: 100%; text-align: center; line-height: 1.5; z-index: 2;">',
      '您使用的浏览器版本过旧，为了更好的访问体验，请升级浏览器至',
      '<a href="https://dl.google.com/release2/chrome/fejcpc2evcdxizklwogngmmrbi_92.0.4515.159/92.0.4515.159_chrome_installer.exe">',
      '谷歌浏览器',
      '</a>',
      '</div>',
    ].join('');
    document.body.insertBefore(createTextNode(__html__), document.getElementById('app'));
  }
})();
