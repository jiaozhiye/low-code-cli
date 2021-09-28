/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:47:03
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-13 19:03:35
 */
import { RouteRecordRaw } from 'vue-router';
import { uniqWith, isEqual } from 'lodash-es';
import * as types from '../types';
import config from '@/config';
import { t, changeLocale } from '@/locale';
import router from '@/router';
import { setToken, setUserName, removeToken } from '@/utils/cookies';
import localDict from '@/utils/localDict';
import {
  getNavList,
  getAllDict,
  getStarMenuList,
  getCommonMenuList,
  createMenuPoint,
} from '@/api/application';
// 自定义主题
import client from 'webpack-custom-theme/client';
import forElementUI from 'webpack-custom-theme/forElementUI';
import { Dictionary, ComponentSize, Language, AnyObject, Nullable } from '@/utils/types';

type INavItem = {
  key: string;
  title: string;
  icon?: string;
  parentKey?: string;
  hideInMenu?: boolean;
  permission?: string[];
  children?: INavItem[];
};

type IState = {
  lang: Language;
  size: ComponentSize;
  theme: string;
  originNavData: INavItem[];
  navList: INavItem[];
  menuList: Array<Omit<INavItem, 'icon' | 'children'>>;
  tabNavList: Array<{ key: string; title: string }>;
  starMenuList: Array<{ key: string; title: string }>;
  commonMenuList: Array<{ key: string; title: string }>;
  keepAliveList: Array<{ key: string; value: string }>;
  iframeList: Array<{ key: string; value: string }>;
  loginInfo: Record<string, string>;
  dict: Record<string, Dictionary[] | number>;
  weChat: AnyObject<string>;
};

const deepMapRoute = (arr: RouteRecordRaw[], mark: string): Nullable<RouteRecordRaw> => {
  let res: Nullable<RouteRecordRaw> = null;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i].children)) {
      res = deepMapRoute(arr[i].children as RouteRecordRaw[], mark);
    }
    if (res) {
      return res;
    }
    if (arr[i].path === mark) {
      return arr[i];
    }
  }
  return res;
};

const createMenuList = (list: IState['navList']) => {
  const res: IState['navList'] = [];
  list.forEach((x) => {
    if (Array.isArray(x.children)) {
      res.push(...createMenuList(x.children));
    } else {
      res.push(x);
    }
  });
  return res;
};

const formatNavData = (list: IState['navList'], routes: RouteRecordRaw[]) => {
  list.forEach((x) => {
    if (Array.isArray(x.children) && x.children.length) {
      x.children.forEach((sub) => (sub.parentKey = x.key));
      formatNavData(x.children, routes);
    }
    const target = deepMapRoute(routes, x.key);
    if (target) {
      target.meta && (target.meta.title = x.title);
      (target as any).hideInMenu && (x.hideInMenu = true);
    }
  });
};

// state
const state = {
  lang: localStorage.getItem('lang') || config.lang, // 多语言
  size: localStorage.getItem('size') || config.size, // 尺寸
  theme: process.env.THEME_COLOR, // 主题色
  originNavData: [], // 原始导航数据
  navList: [], // 导航菜单树
  menuList: [], // 可点击(三级)的子菜单列表
  tabNavList: [], // 导航选项卡列表
  starMenuList: [], // 收藏导航
  commonMenuList: [], // 常用导航
  keepAliveList: [], // 路由组件缓存列表
  iframeList: [], // iframe 列表
  loginInfo: {}, // 用户信息
  dict: {}, // 数据字典
  weChat: {}, // 微信登录信息
} as IState;

// actions
const actions = {
  createLoginInfo({ commit, state }, params): void {
    setToken(params.token);
    setUserName(params.name);
    commit({
      type: types.LOGININFO,
      data: {
        name: params.name,
      },
    });
  },
  createLogout({ dispatch, commit, state }, params): void {
    removeToken();
    commit({
      type: types.LOGOUT,
      data: {},
    });
    dispatch('createTabNavList', []);
    // 刷新浏览器，释放内存
    setTimeout(() => window.parent.postMessage({ type: 'logout', data: '' }, '*'), 400);
  },
  createWeChat({ commit, state }, params): void {
    commit({
      type: types.WECHAT,
      data: params || {},
    });
  },
  createMenuAndNav({ commit, state }, params): void {
    let data: IState['navList'] = params.value || state.originNavData;
    // 主应用 - 四级菜单
    if (config.system === 'app') {
      const key: string = params.key || localStorage.getItem('system') || data[0].key;
      data = data.find((x) => x.key === key)?.children || [];
      localStorage.setItem('system', key);
    }
    commit({ type: types.NAVLIST, data });
    commit({ type: types.MENULIST, data: createMenuList(data) });
  },
  async createNavList({ dispatch, commit, state }, params): Promise<boolean> {
    if (state.navList.length) {
      return !1;
    }
    let data = [{ title: t('app.global.dashboard'), key: '/home', hideInMenu: true }];
    if (process.env.MOCK_DATA === 'true') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const res = require('@/mock/sideMenu').default;
      data = res;
    } else {
      try {
        const res: any = await getNavList({ app: config.system });
        if (res.code === 200) {
          data = Array.isArray(res.data) && res.data.length ? res.data : data;
        }
      } catch (err) {
        return !!dispatch('createLogout');
      }
    }
    formatNavData(data, router.options.routes);
    commit({ type: types.ORIGIN_DATA, data });
    dispatch('createMenuAndNav', { key: '', value: data });
    // return bool
    return !0;
  },
  async createStarMenuList({ commit, state }, params): Promise<void> {
    if (state.starMenuList.length) return;
    let data = [];
    if (process.env.MOCK_DATA === 'true') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const res = require('@/mock/starMenu').default;
      data = res;
    } else {
      const res: any = await getStarMenuList({});
      if (res.code === 200) {
        data = res.data?.filter((x) => state.menuList.some((k) => k.key === x.key)) ?? [];
      }
    }
    commit({ type: types.STAR_MENU, data });
  },
  async createCommonMenuList({ commit, state }, params): Promise<void> {
    if (state.commonMenuList.length) return;
    let data = [];
    if (process.env.MOCK_DATA === 'true') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const res = require('@/mock/starMenu').default;
      data = res;
    } else {
      const res: any = await getCommonMenuList({});
      if (res.code === 200) {
        data = res.data?.filter((x) => state.menuList.some((k) => k.key === x.key)) ?? [];
      }
    }
    commit({ type: types.COMMON_MENU, data });
  },
  createTabNavList({ commit, state }, params): void {
    const routes = params.filter((x) => x.key !== '/404');
    state.iframeList
      .filter((x) => !routes.some((k) => k.key === x.key))
      .forEach((x) => commit({ type: types.DEL_IFRAME, data: x.key }));
    commit({
      type: types.TAB_NAVLIST,
      data: routes,
    });
    localStorage.setItem('tab_nav', JSON.stringify(routes));
  },
  checkAuthority({ commit, state }, params: string): boolean {
    return state.menuList.some((x) => x.key === params);
  },
  async createDictData({ commit, state }, params): Promise<void> {
    if (Object.keys(state.dict).length) return;
    // 每隔 24h 获取一次数据字典
    const lastTime: number = JSON.parse(localStorage.getItem('dict') as string)?._t ?? 0;
    if (+new Date() - lastTime < 24 * 3600 * 1000) return;
    // 数据
    let data: Record<string, Array<Dictionary> | number> = {};
    if (process.env.MOCK_DATA === 'true') {
      data = { _t: +new Date(), ...localDict };
    } else {
      const res: any = await getAllDict({});
      if (res.code === 200) {
        // 数据字典规则：如果有重复的 Code，服务端覆盖客户端
        data = {
          _t: +new Date(),
          ...localDict,
          ...res.data.dict,
        };
      }
    }
    // 数据字典本地存储
    localStorage.setItem('dict', JSON.stringify(data));
    // vuex 状态存储
    commit({ type: types.DICT_DATA, data });
  },
  async createMenuRecord({ commit, state }, params): Promise<void> {
    if (process.env.MOCK_DATA === 'true') return;
    await createMenuPoint({ vpath: params.path, vcaseName: params.title });
  },
  addKeepAliveCache({ commit, state }, params): void {
    if (state.keepAliveList.some((x) => x.value === params.value)) return;
    commit({
      type: types.ADD_CACHE,
      data: params,
    });
  },
  removeKeepAliveCache({ commit, state }, params: string): void {
    commit({
      type: types.DEL_CACHE,
      data: params,
    });
  },
  clearKeepAliveCache({ commit, state }, params): void {
    commit({
      type: types.CLEAR_CACHE,
      data: [],
    });
  },
  createIframeList({ commit, state }, params): void {
    if (state.iframeList.some((x) => x.key === params.key)) return;
    commit({
      type: types.ADD_IFRAME,
      data: params,
    });
  },
  addStarMenuList({ commit, state }, params): void {
    commit({
      type: types.ADD_STAR_MENU,
      data: params,
    });
  },
  removeStarMenuList({ commit, state }, params: string): void {
    commit({
      type: types.DEL_STAR_MENU,
      data: params,
    });
  },
  emitOutsideClick({ commit, state }, params): void {
    window.parent.postMessage({ type: 'outside_click', data: '' }, '*');
  },
  openView({ commit, state }, params: string): void {
    window.parent.postMessage({ type: 'open', data: params }, '*');
  },
  reloadView({ commit, state }, params): void {
    window.parent.postMessage({ type: 'refresh', data: '' }, '*');
  },
  createMouseEvent({ commit, state }, params): void {
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    document.body.click();
  },
  refreshView({ dispatch, commit, state }, { path, query = {} }): void {
    let $iframe: Nullable<HTMLIFrameElement> = document.getElementById(path) as HTMLIFrameElement;
    if ($iframe) {
      // 释放 iframe 内存
      $iframe.src = 'about:blank';
      try {
        $iframe.contentWindow?.document.write('');
        $iframe.contentWindow?.document.clear();
      } catch (e) {
        // ...
      }
      $iframe.parentNode?.removeChild($iframe);
      $iframe = null;
      // 释放 iframe 内存 END
      const data = state.iframeList.find((x) => x.key === path);
      commit({ type: types.DEL_IFRAME, data: path });
      setTimeout(() => commit({ type: types.ADD_IFRAME, data }), 10);
    } else {
      router.replace({ path: `/redirect${path}`, query });
    }
    dispatch('removeKeepAliveCache', path);
  },
  emitLanguage({ commit, state }, params: Language): void {
    state.iframeList.forEach((x) => {
      const $iframe: HTMLIFrameElement = document.getElementById(x.key) as HTMLIFrameElement;
      if (!$iframe) return;
      $iframe.contentWindow?.postMessage({ type: 'lang', data: params }, '*');
    });
  },
  createLanguage({ commit, state }, params): void {
    commit({
      type: types.LANGUAGE,
      data: params,
    });
    changeLocale(params);
    // 本地存储
    localStorage.setItem('lang', params);
  },
  emitElementSize({ commit, state }, params: ComponentSize): void {
    state.iframeList.forEach((x) => {
      const $iframe: HTMLIFrameElement = document.getElementById(x.key) as HTMLIFrameElement;
      if (!$iframe) return;
      $iframe.contentWindow?.postMessage({ type: 'size', data: params }, '*');
    });
  },
  createElementSize({ commit, state }, params): void {
    commit({
      type: types.SIZE,
      data: params,
    });
    // 本地存储
    localStorage.setItem('size', params);
  },
  emitThemeColor({ commit, state }, params: string): void {
    state.iframeList.forEach((x) => {
      const $iframe: HTMLIFrameElement = document.getElementById(x.key) as HTMLIFrameElement;
      if (!$iframe) return;
      $iframe.contentWindow?.postMessage({ type: 'theme', data: params }, '*');
    });
  },
  createThemeColor({ commit, state }, params: string): void {
    const options = {
      newColors: [...forElementUI.getElementUISeries(params), params],
      // 当 router 不是 hash mode 时，它需要将 url 更改为绝对路径(以 / 开头)
      changeUrl: (cssUrl) => `${config.baseUrl}/${cssUrl}`,
      openLocalStorage: false,
    };
    commit({
      type: types.THEME,
      data: params,
    });
    client.changer.changeColor(options, Promise).then(() => localStorage.setItem('theme', params));
  },
};

// mutations
const mutations = {
  [types.LOGININFO](state, { data }): void {
    state.loginInfo = data;
  },
  [types.LOGOUT](state, { data }): void {
    state.loginInfo = data;
  },
  [types.WECHAT](state, { data }): void {
    state.weChat = data;
  },
  [types.ORIGIN_DATA](state, { data }): void {
    state.originNavData = data;
  },
  [types.NAVLIST](state, { data }): void {
    state.navList = data;
  },
  [types.STAR_MENU](state, { data }): void {
    state.starMenuList = data;
  },
  [types.COMMON_MENU](state, { data }): void {
    state.commonMenuList = data;
  },
  [types.MENULIST](state, { data }): void {
    state.menuList = data;
  },
  [types.TAB_NAVLIST](state, { data }): void {
    state.tabNavList = data;
  },
  [types.DICT_DATA](state, { data }): void {
    state.dict = data;
  },
  [types.ADD_CACHE](state, { data }): void {
    state.keepAliveList = [...state.keepAliveList, data];
  },
  [types.DEL_CACHE](state, { data }): void {
    state.keepAliveList = state.keepAliveList.filter((x) => x.key !== data);
  },
  [types.CLEAR_CACHE](state, { data }): void {
    state.keepAliveList = data;
  },
  [types.ADD_IFRAME](state, { data }): void {
    state.iframeList = [...state.iframeList, data];
  },
  [types.DEL_IFRAME](state, { data }): void {
    state.iframeList = state.iframeList.filter((x) => x.key !== data);
  },
  [types.ADD_STAR_MENU](state, { data }): void {
    state.starMenuList = uniqWith([...state.starMenuList, data], isEqual);
  },
  [types.DEL_STAR_MENU](state, { data }): void {
    state.starMenuList = state.starMenuList.filter((x) => x.key !== data);
  },
  [types.LANGUAGE](state, { data }): void {
    state.lang = data;
  },
  [types.SIZE](state, { data }): void {
    state.size = data;
  },
  [types.THEME](state, { data }): void {
    state.theme = data;
  },
};

// getters
const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
