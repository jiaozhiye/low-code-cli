<script lang="tsx">
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 11:05:12
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-27 08:28:04
 */
import { defineComponent } from 'vue';
import config from '@/config';
import { currentSize } from '@/mixins/sizeMixin';
import type { JSXNode } from '@/utils/types';

import AppHeader from '@/components/AppHeader';
import AppMain from '@/components/AppMain';

export default defineComponent({
  name: 'GlobalLayout',
  mixins: [currentSize],
  render(): JSXNode {
    return (
      <div class="app-layout">
        <AppHeader />
        <AppMain>{this.$slots.default()}</AppMain>
      </div>
    );
  },
});
</script>

<style lang="scss">
.app-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
