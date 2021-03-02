/*
 * @Author: wangwenbing
 * @Date: 2018-01-15 11:29:17
 * @Last Modified by: wangwenbing
 * @Last Modified time: 2019-05-24 13:53:33
 */
import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
import Cookie from 'js-cookie';
// import Qs from 'qs';
import appConfig from '@/config';
import auth from '@/api/auth';
import { logout } from '@/router';
import { getToken } from '@/utils/token';
const { NODE_ENV, VUE_APP_API_HOST, VUE_APP_API_PREFIX } = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';
const baseURL = IS_PRODUCTION ? VUE_APP_API_HOST : VUE_APP_API_PREFIX;
// HTTP状态码
const HTTP_CODE = {
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
let refreshDoing = false; // 刷新token加锁
let reqCache = new Map(); // 请求暂存列表，列表中的请求会被取消
const request = axios.create({
  timeout: 30000,
  baseURL,
  // responseType: 'json',
  withCredentials: true, // 是否允许带cookie
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
// axios request拦截器
request.interceptors.request.use(
  (config) => {
    // 设置cancelToken对象，阻止重复请求。当上个请求未完成时，相同的请求不会进行
    //  config.cancelToken = new axios.CancelToken((cancel) => _addRequest(reqCache, config, cancel));
    // 处理token
    const token = getToken();
    if (!token) return config;
    config.headers['Authorization'] = `Bearer ${token}`;
    // const tokenExpires = Cookie.get(appConfig.tokenExpiresKey);
    //  token即将过期，刷新token
    // if (Number(tokenExpires) <= Date.now() && !config._noRefresh && !refreshDoing) {
    //   refreshDoing = true; // 加锁，防止重复刷新
    //   const refreshToken = Cookie.get(appConfig.refreshTokenKey);
    //   _handleRefreshToken(refreshToken).then(() => (refreshDoing = false));
    // }
    return config;
  },
  (error) => Promise.reject(error)
);
// axios  respone拦截器，统一处理响应错误
request.interceptors.response.use(
  ({ config, data }) => {
    // 跳过拦截器
    // if (config._noIntercept) {
    //   return Promise.resolve(data);
    // }
    // 增加延迟，相同请求不得在短时间内重复发送
    _removeRequest(reqCache, config);
    if (data.code === 200) {
      // if (['post', 'delete', 'put'].includes(config.method) && !config._noTips) {
      //   data.msg && message.success(data.msg);
      // }
      return Promise.resolve(data.data);
    } else {
      const msg = data.msg; // 返回接口返回提示信息
      message.error(msg);
      return Promise.reject(msg);
    }
  },
  (error) => {
    message.destroy();
    if (axios.isCancel(error)) return Promise.reject(error);
    // 相同请求不得在短时间内重复发送
    _removeRequest(reqCache, error.config);
    if (error.response) {
      if (error.response.status === 401) {
        message.destroy();
        message.error('登录失效，请重新登录');
        logout();
      } else {
        const tips = error.response.data.msg || (HTTP_CODE as any)[error.response.status];
        tips && message.error(tips);
      }
      return Promise.reject(error);
    } else {
      message.error('请求超时, 请刷新重试');
      return Promise.reject(new Error('请求超时, 请刷新重试'));
    }
  }
);
export default request;

export const get = (url: string, params = {}, config = {}) => request({ method: 'get', url, params, ...config });
export const post = (url: string, data = {}, config = {}) => request({ method: 'post', url, data, ...config });
// 如果接口不能使用json，需要使用qs序列化
// export const post = (url, data = {}, config = {}) => request({ method: 'post', url, data: Qs.stringify({ ...data,token:getToken() }, { allowDots: true }), ...config });
export const put = (url: string, data = {}, config = {}) => request({ method: 'put', url, data, ...config });
export const patch = (url: string, data = {}, config = {}) => request({ method: 'put', url, data, ...config });
export const del = (url: string, data = {}, config = {}) => request({ method: 'delete', url, data, ...config });
/**
 * 刷新token
 * @param {string} refreshToken
 */
function _handleRefreshToken(refreshToken: string) {
  return new Promise((resolve, reject) => {
    auth
      .refreshToken({ refresh_token: refreshToken })
      .then((res: any) => {
        Cookie.set(appConfig.tokenKey, res.access_token);
        Cookie.set(appConfig.refreshTokenKey, res.refresh_token);
        // Cookie.set(appConfig.tokenExpiresKey, Date.now() + res.data.expires_in * 1000 - appConfig.refreshAheadTime);
        resolve(true);
      })
      .catch(reject);
  });
}
/**
 * 添加请求到暂存列表
 * @param {object} reqList - 请求缓存列表
 * @param {object} config 当前请求配置
 * @param {function} cancel - 请求中断函数
 */
function _addRequest(reqList: Map<string, boolean>, config: AxiosRequestConfig, cancel: any) {
  const key = _generateKey(config);
  reqList.has(key) ? cancel('请求被取消,config:', config) : reqList.set(key, true);
}
/**
 * 从暂存列表删除请求，即释放拦截
 * @param {object} reqList 全部请求列表
 * @param {object} config 当前请求配置
 * @param {number} time 阻止时间
 */
function _removeRequest(reqList: Map<string, boolean>, config: AxiosRequestConfig, time = 500) {
  const key = _generateKey(config);
  setTimeout(() => reqList.delete(key), time);
}
/**
 * 生成存储的key
 * @param {object} config
 */
function _generateKey({ method, url, params }: AxiosRequestConfig) {
  const paramsStr = JSON.stringify(params);
  return `${method}-${url}-${paramsStr}`;
}
