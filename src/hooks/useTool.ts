/*
 * @Author: 焦质晔
 * @Date: 2021-10-19 10:22:28
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-19 10:37:01
 */
import { useStore } from '@/store';

export const useTool = () => {
  const { dispatch } = useStore();
  return {
    openView: (url: string) => dispatch('app/openView', url),
    reloadView: () => dispatch('app/reloadView'),
  };
};
