import config from '@/config';
import Cookies from 'js-cookie';
const tokenKey = config.tokenKey;
const refreshAheadTime = config.refreshAheadTime;
/**
 * 获取token
 */
export function getToken() {
  return Cookies.get(tokenKey);
}
/**
 * 设置token
 * @param token
 */
export function setToken(token: string) {
  return Cookies.set(tokenKey, token);
}
/**
 * 移除token
 */
export function removeToken() {
  return Cookies.remove(tokenKey);
}
/**
 * 计算过期时间
 * @param expiresTime
 * @returns
 */
export function computedExpires(expiresTime: number) {
  return Date.now() + expiresTime * 1000 - refreshAheadTime;
}
