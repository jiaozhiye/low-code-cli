/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 20:11:18
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-26 12:12:26
 */
import router from '@/router';
import config from '@/config';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

// 设置 NProgress 样式
NProgress.configure({ showSpinner: false });

// 访问白名单
const whiteList: string[] = ['/login', '/public'];

// 权限白名单
const whiteAuth: string[] = ['/home', '/iframe', '/redirect', '/404', '/test', '/layout', '/print'];

const isMatch = (arr: string[], path: string): boolean => {
  return arr.some((x) => path.startsWith(x));
};

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (isMatch([...whiteList, ...whiteAuth], to.path)) {
    next();
  } else {
    next({ path: '/404' });
  }
});

router.afterEach((to) => {
  const title = to.meta?.title || '404';
  document.title = `${config.title}-${title}`;
  NProgress.done();
});
