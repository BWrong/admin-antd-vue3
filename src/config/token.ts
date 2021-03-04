// token相关配置
export default {
  tokenKey: 'token', // token在cookie中的key
  refreshTokenKey: 'refresh_token', // 刷新token在cookie中的key
  tokenExpiresKey: 'token_expires', // token过期时间在cookie中的key
  refreshAheadTime: 1800000, // 在token过期时间前提前多久更新token
  tokenPrefix: 'Bearer'
};
