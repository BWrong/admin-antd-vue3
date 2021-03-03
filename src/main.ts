import { createApp } from 'vue';
import '@/assets/styles/common.less';
import App from './App.vue';
import router from './router';
import store from './store';
import plugins from '@/plugins';
import directives from '@/directives';
import components from '@/components';
import config from '@/config';
const app = createApp(App);
app.use(router);
app.use(store);
app.use(plugins); // 注册插件
app.use(directives); // 注册指令
app.use(components); // 注册全局组件
app.provide('$pagination', config.pagination); // 注入分页配置
app.mount('#app');
// 开启dev-tools
if (process.env.NODE_ENV === 'development' && '__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
  (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
}
export default app;
