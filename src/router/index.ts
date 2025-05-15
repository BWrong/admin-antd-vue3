import { BProgress } from '@bprogress/core';
import { initAuth } from '@bwrong/auth-tool';
import { getStorage } from '@bwrong/storage';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// import { getMenusRequest } from '@/api/auth';
import config from '@/config';
import { getToken } from '@/utils/auth';

import dynamicRoutes from './dynamicRoutes';
import routes, { noMatchRoute } from './staticRoutes';

import '@bprogress/core/css';

// 配置BProgress组件的选项
BProgress.configure({
  showSpinner: false
});
let routerLoaded = false; // 动态路由是否已加载
let removeRouters: Array<() => void> = [];
const VITE_AUTH_CHECK = import.meta.env.VITE_AUTH_CHECK;
// 创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({
    top: 0,
    left: 0
  }),
  routes
});
router.beforeEach(async (to) => {
  // 如果不控制权，所有路由直接放行
  if (!VITE_AUTH_CHECK) return;
  BProgress.start();
  const token = getToken();
  // 其实路由拦截后所做跳转仅有以下几种情况：
  // 1.已登录时跳转到登录页（非登出的情况）需要重定向到根路径
  if (to.path === '/login' && token) return '/';
  // 2.路由在白名单，或者已经登录且动态路由已加载完成，均放行
  if (config.whiteRoutes.includes(to.path) || (token && routerLoaded)) return;
  // 3.未登录且不在白名单，重定向到登录页，带上回调地址，方便回归
  if (!token) return `/login?redirect=${encodeURIComponent(to.fullPath)}`;
  // 4.根据后台返回权限标识洗出有权限的路由，并将洗过的路由表动态添加到路由中
  const allowRoutes = await _getAllowRoutes(dynamicRoutes);
  allowRoutes.push(noMatchRoute);
  // 未加载则动态加载
  // TODO: 4.0移出路由方式调整了，这里需要修改
  removeRouters = allowRoutes.map((item) => router.addRoute(item));
  routerLoaded = true;
  return to.fullPath;
});

// 路由后置守卫
router.afterEach((to) => {
  BProgress.done();
  // 设置页面标题
  useTitle(to.meta?.title ? `${to.meta.title} - ${config.appTitle}` : `${config.appTitle}`);
});

// 获取路由
async function _getAllowRoutes(dynamicRoutes: RouteRecordRaw[]) {
  // 如果需要刷新页面更新菜单数据，可以去掉登录时获取，在这获取菜单数据
  // const menus = await getMenusRequest().then((res: any) => {
  //   setStorage('userinfo', res.detail);
  //   return res.menus;
  // });
  await Promise.resolve();
  const menus = getStorage<Record<string, unknown>[]>('rawMenu') || [];
  return _ganerRoutesAndMenus(dynamicRoutes, menus);
}
/**
 * 生成权限路由和菜单
 * @param {*} routes 需要鉴权的路由
 * @param {*} permissions 菜单和权限标识集
 */
function _ganerRoutesAndMenus(routes: Array<RouteRecordRaw>, permissions: Record<string, unknown>[]) {
  const { routes: filterRoutes } = initAuth({
    routes,
    permissions,
    authKey: 'permission'
  });
  return filterRoutes as RouteRecordRaw[];
}
// 重置路由
export function resetRouter() {
  removeRouters.map((item) => item());
  routerLoaded = false;
}
export default router;
