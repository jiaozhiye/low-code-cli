/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:47:03
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-30 15:25:08
 */
import * as types from '../types';
import { isEqual } from 'lodash';
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
  current: {
    id: string;
    name: string;
  };
};

// state
const state = {
  formPanelTemplate: [
    {
      name: 'Form',
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
  current: {
    id: '',
    name: '',
  },
} as IState;

// actions
const actions = {
  createFormPanelList({ commit, state }, params) {
    commit({
      type: types.FORM_PANEL_LIST,
      data: params || [],
    });
  },
  createFormItemList({ commit, state }, params) {
    commit({
      type: types.FORM_ITEM_LIST,
      data: params.list,
      id: params.id,
    });
  },
  createCurrentAction({ commit, state }, params) {
    if (isEqual(state.current, params)) return;
    commit({
      type: types.CURRENT_ACTION,
      data: params,
    });
  },
  setFormPanel({ commit, state }, params) {
    commit({
      type: types.FORM_PANEL,
      data: params.data,
      id: params.id,
    });
  },
};

// mutations
const mutations = {
  [types.FORM_PANEL_LIST](state, { data }) {
    state.formPanelList = data;
  },
  [types.FORM_ITEM_LIST](state, { data, id }) {
    state.formPanelList.find((x) => x.id === id).list = data;
  },
  [types.CURRENT_ACTION](state, { data }) {
    state.current = data;
  },
  [types.FORM_PANEL](state, { data, id }) {
    const index = state.formPanelList.findIndex((x) => x.id === id);
    state.formPanelList.splice(index, 1, data);
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
