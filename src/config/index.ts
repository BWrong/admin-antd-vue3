const { VITE_TITLE } = import.meta.env;
import pkg from '../../package.json';
export default {
  // 基础配置
  appTitle: VITE_TITLE, // 应用名称，用于显示在浏览器标签
  appVersion: pkg.version,
  cryptoKey: '', // 密码加密使用的盐
  // token相关配置
  tokenKey: 'auth_token', // token在cookie中的key
  refreshTokenKey: 'refresh_token', // 刷新token在cookie中的key
  tokenExpiresKey: 'token_expires', // token过期时间在cookie中的key
  refreshAheadTime: 1800000, // 在token过期时间前提前多久更新token
  tokenPrefix: 'Bearer',
  // 路由相关配置
  homePage: '/home', // 登入应用默认的页面
  whiteRoutes: ['/login', '/err', '/redirect'] // 路由白名单
  // lang: 'zh_CN'
};
