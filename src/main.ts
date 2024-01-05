import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';

import directives from '@/directives';
import plugins from '@/plugins';
import 'virtual:uno.css';
import '@/assets/styles/common.less';

import App from './App.vue';
import { authPlugin } from '@bwrong/auth-tool';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(plugins); // 注册插件
app.use(directives); // 注册指令
app.use(authPlugin);
app.mount('#app');
export default app;
