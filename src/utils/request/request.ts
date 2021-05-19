/*
 * @Author: wangwenbing
 * @Date: 2018-01-15 11:29:17
 * @Last Modified by: wangwenbing
 * @Last Modified time: 2019-05-24 13:53:33
 */
import axios, { AxiosError } from 'axios';
// import Qs from 'qs';
import message from './message';
import appConfig from '@/config';
import { HTTP_CODE } from '@/enums/http';
import { logout } from '@/router';
import { getToken } from '@/utils/token';
import { checkAndUpdateToken, removeRequest, ganerCancelToken, addRequest } from './helper';
const { apiHost, tokenPrefix } = appConfig;
const request = axios.create({
  timeout: 30000,
  baseURL: apiHost,
  // responseType: 'json',
  withCredentials: false, // 是否允许带cookie
  // paramsSerializer:(params) => Qs.stringify(params, {allowDots: true}), // 开启qs序列化
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// axios request拦截器
request.interceptors.request.use(
  (config) => {
    // 设置cancelToken对象，阻止重复请求。当上个请求未完成时，相同的请求不会进行
    //  config.cancelToken = ganerCancelToken(config);
    // 处理token
    const token = getToken();
    if (!token) return config;
    config.headers['Authorization'] = `${tokenPrefix} ${token}`;
    // 检查更新token
    // checkAndUpdateToken(config);
    return config;
  },
  (error) => Promise.reject(error)
);
// axios  respone拦截器，统一处理响应错误
request.interceptors.response.use(
  ({ config, data }) => {
    // 跳过拦截器
    if (config.isNotIntercept) {
      return Promise.resolve(data);
    }
    // 相同请求不得在短时间内重复发送
    // removeRequest(config);
    if (data.code === 200) {
      // if (['post', 'delete', 'put'].includes(config?.method as string) && !config.isNotTips) {
      //   data.message && message.success(data.message);
      // }
      return Promise.resolve(data.data);
    } else {
      const msg = data.msg || '请求失败'; // 返回接口返回提示信息
      message.error(msg);
      return Promise.reject(msg);
    }
  },
  (error: AxiosError) => {
    message.destroy();
    if (axios.isCancel(error)) return Promise.reject(error);
    // 相同请求不得在短时间内重复发送
    removeRequest(error.config);
    if (error.response) {
      if (error.response.status === 401) {
        message.destroy();
        message.error('登录失效，请重新登录');
        logout();
      } else {
        const tips = error.response.data.msg || HTTP_CODE[error.response.status];
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
