/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:23:01
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-30 14:10:23
 */
import type { Dictionary } from '@/utils/types';

const localDict: Record<string, Array<Dictionary>> = {
  sex: [
    { text: '男', value: '1' },
    { text: '女', value: '0' },
  ],
  formType: [
    { text: '表单', value: 'default' },
    { text: '筛选器', value: 'search' },
    { text: '只读表单', value: 'onlyShow' },
  ],
};

export default localDict;
