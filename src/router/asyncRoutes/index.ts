import { RouteRecordRaw } from 'vue-router';
import system from './system';
// 注意：为了方便和后台返回菜单合并，提取url，path需要填写完整路径
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: () => import('@/layouts/VerticalLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  ...system
];
export default routes;
