import type { RouteRecordRaw } from 'vue-router';
// 系统管理
export default [
  {
    path: '/system',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: { permission: 'system' },
    children: [
      // 菜单管理
      {
        path: '/system/menu',
        component: () => import('@/views/system/menu/List.vue'),
        meta: { permission: 'system/menu', keepAlive: true }
      },
      {
        path: '/system/menu/edit',
        component: () => import('@/views/system/menu/Edit.vue'),
        meta: {
          activeMenu: '/system/menu',
          // hideBreadcrumb: true,
          title: '详情'
        }
      }
    ]
  }
] as RouteRecordRaw[];
