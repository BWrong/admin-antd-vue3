// createApp必须放在最前面，别问我为什么，我被坑过
import { createApp } from 'vue';
import { authPlugin } from '@bwrong/auth-tool';
import { createPinia } from 'pinia';

// import { configKeepScroll } from '@/composables/useKeepScroll'
import { setPaginationConfig } from '@/composables/usePagination';
import plugins from '@/plugins';

import App from './App.vue';
import router from './router';

import 'virtual:uno.css';
import '@/assets/styles/common.less';
setPaginationConfig({
  paginationExtConfig: {
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
    defaultPageSize: 10,
    size: 'small',
    hideOnSinglePage: true
  }
});
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(plugins); // 注册插件
app.use(authPlugin);
app.mount('#app');
// 配置记录滚动位置的滚动容器
// configKeepScroll('#app-main-scroller')

export default app;
