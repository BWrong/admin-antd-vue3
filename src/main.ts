import { createApp } from 'vue';
import '@/assets/styles/common.less';
import App from './App.vue';
import store from './store';
import router from './router';
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
// 如果dev-tools不显示可通过如下方式开启
// if (process.env.NODE_ENV !== 'production' && '__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
//   window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
// }
export default app;
