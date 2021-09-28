/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:02:43
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-31 13:29:33
 */
import { App } from 'vue';
import i18n from '@/locale';
import router from '@/router';
import store from '@/store';
import directive from '@/directive';
import '@/router/permission';

import QmDesign from '@jiaozhiye/qm-design';
import '@/assets/css/design-variables.scss';

import CustomComps from '../components';

export const use = <T extends App>(app: T): T => {
  return app
    .use(i18n)
    .use(store)
    .use(router)
    .use(directive)
    .use(
      QmDesign,
      {
        zIndex: 1000,
        i18n: i18n.global.t,
      },
      {
        print: {
          leftLogo: require('../assets/img/logo_l.png'),
          rightLogo: require('../assets/img/logo_r.png'),
        },
        tinymceScriptSrc: '/static/tinymce/tinymce.min.js',
      }
    )
    .use(CustomComps);
};
