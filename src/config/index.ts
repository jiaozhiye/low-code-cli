/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 12:43:43
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-29 09:58:56
 */
import config from '../../config/app.conf';
import { t } from '@/locale';
import { ComponentSize, Language } from '@/utils/types';

type IConfig = {
  system: string;
  title: string;
  baseUrl: string;
  lang: Language;
  size: ComponentSize;
  prefix: string;
  useIframe: boolean;
  maxCacheNum: number;
  showBreadcrumb: boolean;
  showScreenFull: boolean;
  showCustomTheme: boolean;
  showLangSelect: boolean;
  showSizeSelect: boolean;
  showNotification: boolean;
  openBuryPoint: boolean;
};

export default {
  system: config.name,
  title: t('app.global.title'),
  baseUrl: process.env.ENV_CONFIG === 'gray' ? '/gray' : '',
  lang: 'zh-cn', // 语言
  size: 'medium', // 尺寸
  prefix: '/api', // ajax 请求前缀
  useIframe: false, // 是否使用 iframe 承载路由页面
  maxCacheNum: 10, // 路由组件最大缓存数量
  showBreadcrumb: false, // 是否显示面包屑
  showScreenFull: true, // 是否显示全屏按钮
  showHelperDoc: true, // 是否显示帮助文档
  showCustomTheme: true, // 是否显示自定义主题
  showLangSelect: true, // 是否显示多语言
  showSizeSelect: true, // 是否显示尺寸选择
  showNotification: true, // 是否显示通知
  openBuryPoint: false, // 是否开启埋点
} as IConfig;
