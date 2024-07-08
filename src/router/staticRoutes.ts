import type { RouteRecordRaw } from 'vue-router';
// 静态路由
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index.vue'),
    meta: {}
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error/Index.vue'),
    meta: {}
  },
  {
    // 空白页，刷新tab页时用来做中转
    path: '/_empty',
    name: '_empty',
    component: () => import('@/views/error/Empty.vue')
  }
];
export default routes;
// 未匹配到路由时显示的页面
export const noMatchRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '/error'
};
