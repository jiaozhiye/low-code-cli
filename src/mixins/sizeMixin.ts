/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 23:18:21
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-19 10:50:00
 */
import store from '@/store';
import type { ComponentSize } from '@/utils/types';

export const currentSize = {
  computed: {
    $size(): ComponentSize {
      return store.state.app.size || localStorage.getItem('size') || 'medium';
    },
  },
};
