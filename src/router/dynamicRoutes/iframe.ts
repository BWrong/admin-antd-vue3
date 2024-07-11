import type { RouteRecordRaw } from 'vue-router';
// 系统管理
export default [
  {
    path: '/example',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      // 菜单管理
      {
        path: '/example/iframe',
        component: () => import('@/views/system/menu/List.vue'),
        meta: { permission: 'system/menu', keepAlive: true }
      }
    ]
  }
] as RouteRecordRaw[];
