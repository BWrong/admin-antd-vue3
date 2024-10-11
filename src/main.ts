import { authPlugin } from '@bwrong/auth-tool';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import directives from '@/directives';
import plugins from '@/plugins';

import App from './App.vue';
import router from './router';

import 'virtual:uno.css';
import '@/assets/styles/common.less';
// import { configKeepScroll } from '@/composables/useKeepScroll'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(plugins); // 注册插件
app.use(directives); // 注册指令
app.use(authPlugin);
app.mount('#app');
// 配置记录滚动位置的滚动容器
// configKeepScroll('#app-main-scroller')

export default app;
