import { createStore } from 'vuex';

import user from './modules/user';
import config from '@/config';
export interface IState {
  theme: string;
}
export default createStore<IState>({
  strict: process.env.NODE_ENV !== 'production',
  devtools: process.env.NODE_ENV !== 'production',
  state: {
    theme: config.theme
  },
  mutations: {},
  actions: {},
  modules: {
    user
  }
});
