/*
 * @Author: 焦质晔
 * @Date: 2021-10-19 10:04:22
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-19 10:08:05
 */
import { useStore } from '@/store';
import type { ComponentSize } from '@/utils/types';

export const useSize = (): ComponentSize => {
  const store = useStore();
  return store.state.app.size || localStorage.getItem('size') || 'medium';
};
