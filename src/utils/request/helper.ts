import type { RequestConfig } from '@bwrong/request';
import { message } from 'ant-design-vue';
import axios, { type AxiosError } from 'axios';
import Cookie from 'js-cookie';

import { refreshTokenRequest } from '@/api/auth';
import appConfig from '@/config';
import { logout, saveAuthData } from '@/utils/auth';

import type { ResponseType } from '.';

const { tokenExpiresKey, refreshTokenKey } = appConfig;

let refreshPromise: Promise<void> | null = null;

/**
 * 刷新token（并发请求共享同一个刷新 Promise）
 * @param {string} refreshToken
 */
export function handleRefreshToken(refreshToken?: string): Promise<void> {
  if (refreshPromise) return refreshPromise;
  if (!refreshToken) {
    logout();
    return Promise.reject(new axios.CanceledError('登录状态已失效，请重新登录'));
  }
  refreshPromise = refreshTokenRequest({ refresh_token: refreshToken })
    .then((res) => {
      saveAuthData(res);
    })
    .catch((err) => {
      // 刷新请求自身已走响应拦截器提示错误，这里取消等待中的请求以免携带旧 Token 发出及重复提示
      return Promise.reject(new axios.CanceledError(err?.msg || err?.message || '刷新 Token 失败'));
    })
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
}
/**
 * 检查更新token
 * @param config
 */
export async function handleCheckAuth(config: RequestConfig) {
  if (config.skipCheckAuth) return;
  const tokenExpires = Cookie.get(tokenExpiresKey);
  if (!tokenExpires) return;
  const expires = Number(tokenExpires);
  if (!Number.isNaN(expires) && expires <= Date.now()) {
    await handleRefreshToken(Cookie.get(refreshTokenKey));
  }
}
// 信息提示适配器，使用不同的UI组件库，配置有差异
export const messageAdaptor = {
  destroy: message.destroy,

  error: message.error,

  success: message.success,

  warn: message.warning
};
/**
 * 处理自动提示，post、delete、put方法自动提示，可以通过接口中传递skipShowTips配置关闭该提示
 * @param data
 * @param config
 */
export function handleShowTips(data: ResponseType, config: RequestConfig) {
  if (config?.method?.match(/(post|delete|put)/i) && !config.skipShowTips) {
    messageAdaptor.destroy();
    messageAdaptor.success(data.msg || data.message || '操作成功');
  }
}
// HTTP状态码及对应提示
const statusMap = {
  400: '请求参数错误',
  401: '未授权, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  409: '请求发生冲突',
  410: '请求的资源已删除',
  413: '请求体过大，服务器无法处理',
  414: '请求url过长',
  415: '不支持的媒体类型',
  429: '请求次数超过限制',
  500: '服务器端内部错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网络错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
};
/**
 * 网络错误处理
 * @param error
 * @returns
 */
export function handleNetworkError(error: AxiosError<ResponseType>) {
  messageAdaptor.destroy();
  const status = error.response?.status as keyof typeof statusMap;
  const tips = error.response?.data?.msg || (status && statusMap[status]) || `请求失败: ${error.response?.data?.msg}`;
  messageAdaptor.error(tips);
  // 如果status为401，说明认证信息失效，退出登录
  if (error.response?.status === 401) logout();
}
// 业务错误及提示, 根据自己业务扩展
const errMap: Record<number, string> = {
  10031: '登录失效，需要重新登录', // token 失效
  10032: '您太久没登录，请重新登录~', // token 过期
  10033: '账户未绑定角色，请联系管理员绑定角色',
  10034: '该用户未注册，请联系管理员注册用户',
  10035: 'code 无法获取对应第三方平台用户',
  10036: '该账户未关联员工，请联系管理员做关联',
  10037: '账号已无效',
  10038: '账号未找到'
};
/**
 * 业务错误处理
 * @param data
 */
export function handleBusinessError(data: ResponseType) {
  messageAdaptor.destroy();
  // 返回接口返回提示信息
  const msg = data?.msg || errMap[data?.code] || '请求失败，请联系管理员';
  messageAdaptor.error(msg);
}
