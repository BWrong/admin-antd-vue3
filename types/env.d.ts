/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// 环境变量
interface ImportMetaEnv {
  VITE_BASE_URL: string;
  VITE_TITLE: string;
  VITE_API_PREFIX: string;
  VITE_API_HOST: string;
  VITE_PORT: number;
  VITE_OUT_DIR: string;
  VITE_MOCK_PRODUCTION: boolean;
  VITE_BUILD_REPORT: boolean;
  VITE_BUILD_COMPRESS: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_DROP_DEBUGGER: boolean;
  VITE_AUTH_CHECK: boolean | string;
  VITE_ICONFONT_URL: string;
  VITE_COLOR_SCHEME: 'auto' | 'light' | 'dark';
  VITE_UPDATE_NOTICE: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

