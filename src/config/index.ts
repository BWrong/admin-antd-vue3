const env = process.env;
const IS_PRODUCTION = env.NODE_ENV === 'production';
const apiHost = IS_PRODUCTION ? env.VUE_APP_API_HOST : env.VUE_APP_API_PREFIX;
const pkg = require('../../package');
const baseConfig = {
  appTitle: env.VUE_APP_API_TITLE, // 应用名称，用于显示在浏览器标签
  appVersion: pkg.version,
  cryptoKey: '', // 密码加密使用的盐
  apiHost //接口服务器地址
};
// token相关配置
const tokenConfig = {
  tokenKey: 'token', // token在cookie中的key
  refreshTokenKey: 'refresh_token', // 刷新token在cookie中的key
  tokenExpiresKey: 'token_expires', // token过期时间在cookie中的key
  refreshAheadTime: 1800000, // 在token过期时间前提前多久更新token
  tokenPrefix: 'Bearer'
};
// 路由相关配置
const routerConfig = {
  homePage: '/home', // 登入应用默认的页面
  whiteRoutes: ['/login', '/err'] // 路由白名单
};
// 样式相关配置
const styleConfig = {
  theme: 'light',
  // lang: 'zh_CN',
  pagination: {
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
    size: 'small',
    current: 1,
    defaultPageSize: 10,
    pageSize: 10,
    total: 0
  }
};
export default {
  ...baseConfig,
  ...tokenConfig,
  ...routerConfig,
  ...styleConfig
};
