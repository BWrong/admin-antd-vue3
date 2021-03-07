import { RouteRecordRaw } from 'vue-router';
// 静态路由
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index1.vue'),
    meta: {}
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error/Index.vue'),
    meta: {}
  }
];
export default routes;
// 未匹配到路由时显示的页面
export const noMatchRoute = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '/error'
};
