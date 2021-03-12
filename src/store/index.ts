import { createStore } from 'vuex';

import user from './modules/user';
import config from '@/config';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    theme: config.theme
  },
  mutations: {},
  actions: {},
  modules: {
    user
  }
});
