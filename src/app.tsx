/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:04:39
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-29 11:52:04
 */
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { RouterView } from 'vue-router';
import { SizeEnum } from '@/utils/types';
import type { JSXNode } from '@/utils/types';

import '@/assets/css/reset.scss';
import '@/assets/css/style.scss';
import '@/assets/css/iconfont.scss';
import '@/assets/css/lc-iconfont.scss';
import '@/assets/css/element-ui.scss';

export default defineComponent({
  name: 'App',
  computed: {
    ...mapState('app', ['size', 'lang', 'theme']),
  },
  render(): JSXNode {
    return (
      <qm-config-provider size={SizeEnum[this.size]} locale={this.lang}>
        <RouterView />
      </qm-config-provider>
    );
  },
});
