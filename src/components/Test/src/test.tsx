/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 20:50:59
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-19 10:13:21
 */
import { defineComponent } from 'vue';
import type { JSXNode } from '../../_utils/types';

import '../style/index.scss';

export default defineComponent({
  name: 'QmTest',
  componentName: 'QmTest',
  render(): JSXNode {
    return <el-button icon="el-icon-delete">按钮</el-button>;
  },
});
