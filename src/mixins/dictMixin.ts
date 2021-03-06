/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:05:20
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-19 10:20:44
 */
import store from '@/store';
import type { Dictionary, Nullable } from '@/utils/types';

/**
 * @description 获取本地存储的数据字典
 * @param
 * @returns {object}
 */
const getLocalDict = (): Record<string, Dictionary[]> => {
  return Object.keys(store.state.app.dict).length
    ? store.state.app.dict
    : JSON.parse(localStorage.getItem('dict') as string) || {};
};

/**
 * @description 创建数据字典列表，支持过滤
 * @param {string} code 数据字典的 code 码
 * @param {array} excludes 需要过滤数据字典项的 code 值
 * @param {bool} showStoped 是否显示已停用的数据字典，默认 false
 * @returns {array}
 */
export const createDictList = (
  code: string,
  excludes: string[] | string = [],
  showStoped = false
): Dictionary[] => {
  const vals: string[] = Array.isArray(excludes) ? excludes : [excludes];
  const dict = getLocalDict();
  let res: Dictionary[] = [];
  if (Array.isArray(dict[code])) {
    // 过滤已停用的数据字典项
    res = !showStoped ? dict[code].filter((x) => (x as any).stoped !== '1') : dict[code];
    res = res.map((x) => ({ text: x.text, value: x.value }));
    res = res.filter((x) => !vals.includes(x.value.toString()));
  }
  return res;
};

/**
 * @description 数据字典的翻译
 * @param {string|number} val 数据的值
 * @param {string} code 数据字典的编码
 * @param {bool} showStoped 是否显示已停用的数据字典，默认 false
 * @returns {string} 翻译后的文本
 */
export const createDictText = (val: string | number, code: string, showStoped = false): string => {
  let res = '';
  if (!code) {
    return res;
  }
  const dict = getLocalDict();
  if (Array.isArray(dict[code])) {
    // 过滤已停用的数据字典项
    const dicts: Dictionary[] = !showStoped
      ? dict[code].filter((x) => (x as any).stoped !== '1')
      : dict[code];
    const target: Nullable<Dictionary> = dicts.find((x) => x.value == val) || null;
    res = target ? target.text : val.toString();
  }
  return res;
};

export const dictionary = {
  methods: {
    createDictList,
    createDictText,
  },
};
