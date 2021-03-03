import { App } from 'vue';
import { getStorage } from '@/utils/storage';
import { authDirective } from '@bwrong/auth-tool';
import AuthButton from '@/components/AuthButton/index.vue';
export default (app: App) => {
  let authMap: string[] | null = null;
  // 注册权限指令
  app.use(authDirective, {
    hasAuth(authValue: string) {
      authMap = authMap || getStorage('permissions') || [];
      return authMap?.includes(authValue);
    }
  });
  app.component('AuthButton', AuthButton);
};
