/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:42:57
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-28 10:00:02
 */
import { createStore, Store } from 'vuex';

import app from './modules/application';
import editer from './modules/editer';

type IAppStore = {
  app: typeof app.state;
};

const store = createStore<IAppStore>({
  modules: {
    app,
    editer,
  },
});

export const useStore = (): Store<IAppStore> => store;

export default store;
