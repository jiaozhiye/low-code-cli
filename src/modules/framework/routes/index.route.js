/*
 * @Author: 焦质晔
 * @Date: 2020-05-17 09:36:33
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-26 12:21:48
 */
import { defineAsyncComponent } from 'vue';
import ErrorComponent from '@/pages/errorLoad';
import LoadingComponent from '@/pages/loading';

const getAsyncComponent = (loader) => {
  return defineAsyncComponent({
    loader,
    delay: 0,
    timeout: 30000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
  });
};

export default {
  // webpackChunkName -> webpack 在打包编译时，生成的文件路径(名)，格式：模块名称/用例名称 service/spt1001
  routes: [
    {
      path: '/layout',
      meta: { keepAlive: true },
      component: getAsyncComponent(() =>
        import(/* webpackChunkName: "framework/layout" */ '@framework/pages/layout/index')
      ),
    },
    {
      path: '/print',
      meta: { keepAlive: true },
      component: getAsyncComponent(() =>
        import(/* webpackChunkName: "framework/print" */ '@framework/pages/print/index')
      ),
    },
  ],
  public: [],
};
