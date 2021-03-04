// 基础配置
const env = process.env;
const IS_PRODUCTION = env.NODE_ENV === 'production';
const baseUrl = IS_PRODUCTION ? env.VUE_APP_API_HOST : env.VUE_APP_API_ROOT;
const pkg = require('../../package');
export default {
  appTitle: env.VUE_APP_API_TITLE, // 应用名称，用于显示在浏览器标签
  appVersion: pkg.version,
  cryptoKey: '', // 密码加密使用的盐
  baseUrl
};
