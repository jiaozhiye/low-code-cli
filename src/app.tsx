/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:04:39
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-09 11:41:59
 */
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { RouterView } from 'vue-router';
import { SizeEnum, JSXNode } from '@/utils/types';

import '@/assets/css/reset.scss';
import '@/assets/css/style.scss';
import '@/assets/css/iconfont.scss';
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
