import { getStorage, setStorage } from '@bwrong/storage';
import { defineStore } from 'pinia';

interface IUserInfo {
  username: string;
}
export const useRootStore = defineStore('root', {
  state: () => ({ userinfo: {} as IUserInfo }),
  getters: {
    userinfoGetter(state): IUserInfo {
      if (state.userinfo && Object.keys(state.userinfo).length > 0) return state.userinfo;
      const userInfo = getStorage<IUserInfo>('userinfo');
      if (userInfo && Object.keys(userInfo).length > 0) {
        state.userinfo = userInfo;
        return userInfo;
      }
      return state.userinfo || ({} as IUserInfo);
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
