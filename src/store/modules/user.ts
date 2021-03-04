import { setStorage, getStorage } from '@/utils/storage';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

const state = {
  name: '',
  avatar: '',
  roles: [] as string[],
  userinfo: {}
};
type TState = typeof state;
const mutations: MutationTree<TState> = {
  SET_USERINFO(state: TState, data: object) {
    state.userinfo = data;
    setStorage('userinfo', data);
  }
};
const getters: GetterTree<TState, object> = {
  userinfo(state: TState) {
    if (state.userinfo) return state.userinfo;
    let userInfo = getStorage('userinfo');
    state.userinfo = userInfo;
    return userInfo;
  }
};
const actions: ActionTree<TState, object> = {
  // 更新用户信息
  getUserinfo({ commit }) {
    let userInfo = getStorage('userinfo');
    commit('SET_USERINFO', userInfo);
    setStorage('userinfo', userInfo);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
