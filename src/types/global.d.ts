declare global {
  interface Window {
    __VUE_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}
export {}; // 扩展全局对象时必须添加
