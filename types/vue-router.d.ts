import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    permission?: string; // 权限标识
    title?: string; // 路由title
    activeMenu?: string; // 手动设置激活的菜单
    hideBreadcrumb?: boolean; // 在面包屑中隐藏
    keepAlive?: boolean; // 是否缓存组件
    icon?: string; // 图标
    isIframe?: boolean; // 是否为iframe页面
    url?: string; // 自定义url，用于iframe页面
    isBlank?: boolean; // src是否在新窗口打开
  }
}
