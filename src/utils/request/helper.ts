import { AxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';
import appConfig from '@/config';
import auth from '@/api/auth';
import { computedExpires } from '@/utils/token';
/**
 * 刷新token
 * @param {string} refreshToken
 */
export function handleRefreshToken(refreshToken: string | undefined) {
  return new Promise((resolve, reject) => {
    auth
      .refreshToken({ refresh_token: refreshToken })
      .then((res: any) => {
        Cookie.set(appConfig.tokenKey, res.access_token);
        Cookie.set(appConfig.refreshTokenKey, res.refresh_token);
        Cookie.set(appConfig.tokenExpiresKey, String(computedExpires(res.data.expires_in)));
        resolve(res);
      })
      .catch(reject);
  });
}
/**
 * 生成存储的key
 * @param {object} config
 */
export function generateKey({ method, url, params }: AxiosRequestConfig) {
  const paramsStr = JSON.stringify(params);
  return `${method}-${url}-${paramsStr}`;
}
/**
 * 添加请求到暂存列表
 * @param {object} reqList - 请求缓存列表
 * @param {object} config 当前请求配置
 * @param {function} cancel - 请求中断函数
 */
export function addRequest(reqList: Map<string, boolean>, config: AxiosRequestConfig, cancel: any) {
  const key = generateKey(config);
  reqList.has(key) ? cancel('请求被取消,config:', config) : reqList.set(key, true);
}
/**
 * 从暂存列表删除请求，即释放拦截
 * @param {object} reqList 全部请求列表
 * @param {object} config 当前请求配置
 * @param {number} time 阻止时间
 */
export function removeRequest(reqList: Map<string, boolean>, config: AxiosRequestConfig, time = 500) {
  const key = generateKey(config);
  setTimeout(() => reqList.delete(key), time);
}
