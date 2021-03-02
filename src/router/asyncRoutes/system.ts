// 系统管理
export default [
  {
    path: '/system',
    name: 'system',
    redirect: '/system/department',
    // component: () => import('@/layouts/DefaultLayout.vue'),
    component: () => import('@/layouts/VerticalLayout.vue'),
    meta: {
      permission: 'system'
    },
    children: [
      // 系统配置
      {
        path: '/system/config',
        name: 'config',
        component: () => import('@/views/system/config/List.vue'),
        meta: {
          permission: 'system/config'
        }
      },
      // 菜单管理
      {
        path: '/system/menu',
        name: 'menu',
        component: () => import('@/views/system/menu/List.vue'),
        meta: {
          permission: 'system/menu'
        }
      },
      // 部门管理
      {
        path: '/system/department',
        name: 'department',
        component: () => import('@/views/system/department/List.vue'),
        meta: {
          permission: 'system/department'
        }
      },
      // 角色管理
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/system/role/List.vue'),
        meta: {
          permission: 'system/role'
        }
      },
      // 用户管理
      {
        path: '/system/user',
        name: 'user',
        component: () => import('@/views/system/user/List.vue'),
        meta: {
          permission: 'system/user'
        }
      },
      // 站内消息
      {
        path: '/system/message',
        name: 'message',
        component: () => import('@/views/system/message/List.vue'),
        meta: {
          permission: 'system/message'
        }
      },
      // 用户日志
      {
        path: '/system/log',
        name: 'log',
        component: () => import('@/views/system/log/List.vue'),
        meta: {
          permission: 'system/log'
        }
      }
    ]
  }
];
