import { getToken } from '@/utils/token';
import { setStorage, getStorage } from '@/utils/storage';
import { Action, ActionContext, Store, useStore } from 'vuex';

/**
 * 获取管理用户信息
 * TOKEN: 临时密钥
 * NAME: 姓名
 * AVATAR: 头像地址
 * ROLES: 权限角色类型
 */
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [] as string[],
  userinfo: {}
};
type TState = typeof state;
const mutations = {
  SET_TOKEN(state: TState, token: string) {
    state.token = token;
  },
  SET_NAME(state: TState, name: string) {
    state.name = name;
  },
  SET_AVATAR(state: TState, avatar: string) {
    state.avatar = avatar;
  },
  SET_ROLES(state: TState, roles: string[]) {
    state.roles = roles;
  },
  SET_USERINFO(state: TState, data: object) {
    state.userinfo = data;
    setStorage('userinfo', data);
  }
};
const getters = {
  // TODO
  userinfo(state: TState) {
    if (state.userinfo) return state.userinfo;
    let userInfo = getStorage('userinfo');
    if (userInfo) {
      state.userinfo = JSON.parse(userInfo);
      return state.userinfo;
    }
    return {};
  }
};
const actions = {
  // 更新用户信息
  getUserinfo({ commit }: any) {
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
