/// <reference types="vite/client" />
// 环境变量
interface ImportMetaEnv {
  // Auto generate by env-parse
  /**
   * 通用配置: 以VITE_GLOBAL开头的变量会注入到全局，方便在打包后进行修改，而不必重新打包
   * 应用名称
   */
  readonly VITE_TITLE: string
  /**
   * 用作路由baseurl、vite的base
   */
  readonly VITE_BASE_URL: string
  /**
   * 打包目录
   */
  readonly VITE_OUT_DIR: string
  /**
   * 运行端口
   */
  readonly VITE_PORT: number
  /**
   * 接口请求地址，会设置到 axios 的 baseURL 参数上
   */
  readonly VITE_API_PREFIX: string
  /**
   * 开发环境配置
   */
  readonly VITE_API_HOST: string
  /**
   * 图标地址，一定要换成自己iconfont项目地址，https://www.iconfont.cn/
   */
  readonly VITE_ICONFONT_URL: string
  /**
   * 开启权限控制，如果不开启将不会进行路由拦截
   */
  readonly VITE_AUTH_CHECK: boolean
  /**
   * 配色方案 auto: 跟随系统，dark：深色模式 light：浅色模式
   */
  readonly VITE_GLOBAL_COLOR_SCHEME: string
  /**
   * 布局方式，可选：side、top、mix
   */
  readonly VITE_GLOBAL_LAYOUT: string
  /**
   * 开启更新提示
   */
  readonly VITE_UPDATE_NOTICE: boolean
  /**
   * 开启多标签页
   */
  readonly VITE_MULTI_TAB: boolean
  /**
   * 开启打包可视化分析报告,会增加打包时间，不需要可以关闭
   */
  readonly VITE_BUILD_REPORT: boolean
  /**
   * 是否在打包时开启gzip压缩
   */
  readonly VITE_BUILD_COMPRESS: boolean
  /**
   * 是否移除console、debugger
   */
  readonly VITE_DROP_CONSOLE: boolean
}
// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }
