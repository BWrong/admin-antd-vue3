/*
 * @Author: wangwenbing
 * @Date: 2018-01-15 11:29:17
 * @Last Modified by: wangwenbing
 * @Last Modified time: 2019-05-24 13:53:33
 */
import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, IResponseData } from 'axios';
import Cookie from 'js-cookie';
// import Qs from 'qs';
import message from './message';
import appConfig from '@/config';
import { HTTP_CODE } from '@/enums/http';
import { logout } from '@/router';
import { getToken } from '@/utils/token';
import { handleRefreshToken, removeRequest, addRequest } from './helper';
const { NODE_ENV, VUE_APP_API_HOST, VUE_APP_API_PREFIX } = process.env;
const baseURL = NODE_ENV === 'production' ? VUE_APP_API_HOST : VUE_APP_API_PREFIX;

let refreshDoing = false; // 刷新token加锁
let requestCache: Map<string, boolean> = new Map(); // 请求暂存列表，列表中的请求会被取消
const request = axios.create({
  timeout: 30000,
  baseURL,
  // responseType: 'json',
  withCredentials: false, // 是否允许带cookie
  // paramsSerializer:(params) => Qs.stringify(params, {allowDots: true}), // qs序列化
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// axios request拦截器
request.interceptors.request.use(
  (config) => {
    // 设置cancelToken对象，阻止重复请求。当上个请求未完成时，相同的请求不会进行
    //  config.cancelToken = new axios.CancelToken((cancel) => addRequest(requestCache, config, cancel));
    // 处理token
    const token = getToken();
    if (!token) return config;
    config.headers['Authorization'] = `${appConfig.tokenPrefix} ${token}`;
    // token即将过期，刷新token
    // const tokenExpires = Cookie.get(appConfig.tokenExpiresKey);
    // if (Number(tokenExpires) <= Date.now() && !config.isNotRefreshToken && !refreshDoing) {
    //   refreshDoing = true; // 加锁，防止重复刷新
    //   const refreshToken = Cookie.get(appConfig.refreshTokenKey);
    //   handleRefreshToken(refreshToken).then(() => (refreshDoing = false));
    // }
    return config;
  },
  (error) => Promise.reject(error)
);
// axios  respone拦截器，统一处理响应错误
request.interceptors.response.use(
  ({ config, data }: AxiosResponse<IResponseData>) => {
    // 跳过拦截器
    if (config.isNotIntercept) {
      return Promise.resolve(data);
    }
    // 相同请求不得在短时间内重复发送
    removeRequest(requestCache, config);
    if (data.code === 200) {
      // if (['post', 'delete', 'put'].includes(config?.method as string) && !config.isNotTips) {
      //   data.message && message.success(data.message);
      // }
      return Promise.resolve(data.data);
    } else {
      const msg = data.message || '请求失败'; // 返回接口返回提示信息
      message.error(msg);
      return Promise.reject(msg);
    }
  },
  (error: AxiosError) => {
    message.destroy();
    if (axios.isCancel(error)) return Promise.reject(error);
    // 相同请求不得在短时间内重复发送
    removeRequest(requestCache, error.config);
    if (error.response) {
      if (error.response.status === 401) {
        message.destroy();
        message.error('登录失效，请重新登录');
        logout();
      } else {
        const tips = error.response.data.message || HTTP_CODE[error.response.status];
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

export const get = (url: string, params = {}, config: AxiosRequestConfig = {}) => request({ method: 'get', url, params, ...config });
export const post = (url: string, data = {}, config: AxiosRequestConfig = {}) => request({ method: 'post', url, data, ...config });
export const put = (url: string, data = {}, config: AxiosRequestConfig = {}) => request({ method: 'put', url, data, ...config });
export const patch = (url: string, data = {}, config: AxiosRequestConfig = {}) => request({ method: 'patch', url, data, ...config });
export const del = (url: string, data = {}, config: AxiosRequestConfig = {}) => request({ method: 'delete', url, data, ...config });
