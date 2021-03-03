import { RouteRecordRaw } from 'vue-router';
// 静态路由
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index.vue'),
    meta: {}
  },
  {
    path: '/err',
    name: 'err',
    component: () => import('@/views/err/Index.vue'),
    meta: {}
  }
];
export default routes;
// 未匹配到路由时显示的页面
export const noMatchRoute = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '/err'
};
