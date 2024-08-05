/// <reference types="vite/client" />
// 环境变量
interface ImportMetaEnv {
  // Auto generate by env-parse
  /**
   * 通用配置
   * 应用名称
   */
  readonly VITE_TITLE: string;
  /**
   * 用作路由baseurl、vite的base
   */
  readonly VITE_BASE_URL: string;
  /**
   * 运行端口
   */
  readonly VITE_PORT: number;
  /**
   * 接口请求地址，会设置到 axios 的 baseURL 参数上
   */
  readonly VITE_API_PREFIX: string;
  /**
   * 图标地址，一定要换成自己iconfont项目地址，https://www.iconfont.cn/，********* 切记换成自己的，不要直接用模板中的地址*******
   */
  readonly VITE_ICONFONT_URL: string;
  /**
   * 开启权限控制，如果不开启将不会进行路由拦截
   */
  readonly VITE_AUTH_CHECK: boolean;
  /**
   * 配色方案 auto: 跟随系统，dark：深色模式 light：浅色模式
   */
  readonly VITE_COLOR_SCHEME: string;
  /**
   * 开启更新提示
   */
  readonly VITE_UPDATE_NOTICE: boolean;
  /**
   * 开启 devtools
   */
  readonly VITE_DEVTOOLS: boolean;
  /**
   * 开启多标签页
   */
  readonly VITE_MULTI_TAB: boolean;
}
// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }
