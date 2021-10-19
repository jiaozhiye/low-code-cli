/*
 * @Author: 焦质晔
 * @Date: 2021-10-19 10:17:56
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-19 10:21:39
 */
import { createDictList, createDictText } from '../mixins/dictMixin';

export const useDict = () => {
  return { createDictList, createDictText };
};
