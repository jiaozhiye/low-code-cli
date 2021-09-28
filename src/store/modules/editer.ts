/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:47:03
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-28 16:33:04
 */
import * as types from '../types';
import config from '@/config';

type IFormPanel = {
  name: string;
  id?: string;
  list?: any[];
};

type IFormItem = {
  type: string;
  label: string;
};

type IState = {
  formPanelTemplate: IFormPanel[];
  formItemTemplate: IFormItem[];
  formPanelList: IFormPanel[];
};

// state
const state = {
  formPanelTemplate: [
    {
      name: 'qm-form',
    },
  ],
  formItemTemplate: [
    {
      type: 'INPUT',
      label: '文本框',
    },
    {
      type: 'INPUT_NUMBER',
      label: '数字框',
    },
  ],
  formPanelList: [],
} as IState;

// actions
const actions = {
  createFormPanelList({ commit, state }, params): void {
    commit({
      type: types.FORM_PANEL,
      data: params || [],
    });
  },
  createFormItemList({ commit, state }, params): void {
    commit({
      type: types.FORM_ITEM,
      data: params.list,
      id: params.id,
    });
  },
};

// mutations
const mutations = {
  [types.FORM_PANEL](state, { data }): void {
    state.formPanelList = data;
  },
  [types.FORM_ITEM](state, { data, id }): void {
    state.formPanelList.find((x) => x.id === id).list = data;
  },
};

// getters
const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
