import { defineStore } from 'pinia';
import { getStorage, setStorage } from '@bwrong/storage';

interface IUserInfo {
  username: string;
}
export const useRootStore = defineStore('root', {
  state: () => ({
    userinfo: {} as IUserInfo
  }),
  getters: {
    userinfoGetter(state) {
      if (state.userinfo) return state.userinfo;
      const userInfo = getStorage<IUserInfo>('userinfo') || ({} as IUserInfo);
      state.userinfo = userInfo;
      return userInfo;
    }
  },
  actions: {
    // 更新用户信息
    setUserinfo(data: IUserInfo) {
      this.userinfo = data;
      setStorage('userinfo', data);
    },
    getUserinfo() {
      const userInfo = getStorage<IUserInfo>('userinfo') || ({} as IUserInfo);
      this.setUserinfo(userInfo);
    }
  }
});
