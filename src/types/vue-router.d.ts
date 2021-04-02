import { RouteRecordRaw } from 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    permission?: string; // 权限标识
    title?: string; // 路由title
    activeMenu?: string; // 手动设置激活的菜单
    hideBreadcrumb?: boolean; // 在面包屑中隐藏
  }
  interface RouteRecordRaw extends RouteRecordRaw {
    meta: RouteMeta;
  }
}
