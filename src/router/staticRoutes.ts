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
    component: () => import('@/views/common/Error.vue'),
    meta: {}
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('@/views/common/Redirect.vue')
  }
];
export default routes;
// 未匹配到路由时显示的页面
export const noMatchRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '/error'
};
