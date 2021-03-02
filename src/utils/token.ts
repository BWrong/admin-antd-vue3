import config from '@/config';
import Cookies from 'js-cookie';
const tokenKey = config.tokenKey;
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
