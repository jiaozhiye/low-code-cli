/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:53:34
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-26 12:13:02
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { t } from '@/locale';
import config from '@/config';
import moduleRoutes from './routes';

const BasicLayout = () => import('@/layout/BasicLayout.vue');
const RouteView = () => import('@/layout/RouteView.vue');
const Dashboard = () => import('@/pages/dashboard/index.vue');
const Redirect = () => import('@/pages/redirect/index.vue');
const Nomatch = () => import('@/pages/nomatch/index.vue');

const routes: Array<RouteRecordRaw> = [
  ...moduleRoutes.map((x) => x.public).flat(),
  ...moduleRoutes
    .map((x) => x.routes)
    .flat()
    .map((x) => ({
      path: '/iframe' + x.path,
      props: x.props,
      component: x.component,
    })),
  {
    path: '/iframe/:path(.*)',
    component: Nomatch,
  },
  {
    path: '/',
    meta: { title: t('app.global.home') },
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        meta: { title: t('app.global.dashboard'), affix: true, bgColor: true, keepAlive: false },
        component: Dashboard,
      },
      ...moduleRoutes
        .map((x) => x.routes)
        .flat()
        .map((x) => {
          if (config.useIframe || x.iframeRoutePath) {
            return {
              path: x.path,
              meta: {
                ...x.meta,
                iframe: x.iframeRoutePath || config.baseUrl + '/iframe' + x.path,
              },
              component: RouteView,
            };
          }
          return x;
        }),
      {
        path: '/redirect/:path(.*)',
        component: Redirect,
      },
      {
        path: '/404',
        meta: { title: '404' },
        component: Nomatch,
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
];

const router = createRouter({
  history: createWebHistory(`${config.baseUrl}/`),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
