import { createApp } from 'vue';
import '@/assets/styles/common.less';
import App from './App.vue';
import router from './router';
import store from './store';
import antd from '@/plugins/antd';
import directives from '@/directives';
import config from '@/config';
import DeleteButton from '@/components/DeleteButton/index.vue';
import BasisTable from '@/components/BasisTable/index.vue';
const app = createApp(App);
app.use(store);
app.use(router);

app.use(antd);
app.use(directives);
// 注册全局组件
app.component('DeleteButton', DeleteButton);
app.component('BasisTable', BasisTable);
// 注入分页配置
app.provide('$pagination', config.pagination);
app.mount('#app');
export default app;
