import { Module } from 'vuex';
import { IState as IRootState } from '@/store';
import { setStorage, getStorage } from '@/utils/storage';
interface IState {
  name: string;
  avatar: string;
  roles: string[];
  userinfo: object;
}
export default {
  namespaced: true,
  state: {
    name: '',
    avatar: '',
    roles: [] as string[],
    userinfo: {}
  },
  mutations: {
    SET_USERINFO(state, data) {
      state.userinfo = data;
      setStorage('userinfo', data);
    }
  },
  getters: {
    userinfo(state) {
      if (state.userinfo) return state.userinfo;
      let userInfo = getStorage('userinfo');
      state.userinfo = userInfo;
      return userInfo;
    }
  },
  actions: {
    // 更新用户信息
    getUserinfo({ commit }) {
      let userInfo = getStorage('userinfo');
      commit('SET_USERINFO', userInfo);
      setStorage('userinfo', userInfo);
    }
  }
} as Module<IState, IRootState>;
