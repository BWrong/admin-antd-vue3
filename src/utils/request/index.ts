/*
 * @Author: wangwenbing
 * @Date: 2018-01-15 11:29:17
 * @Last Modified by: wangwenbing
 * @Last Modified time: 2019-05-24 13:53:33
 */
import { AxiosRequestConfig } from 'axios';
import request from './request';
export default request;

export const get = (url: string, params = {}, config: AxiosRequestConfig = {}) => request({ method: 'get', url, params, ...config });

export const post = (url: string, data = {}, config: AxiosRequestConfig = {}) => request({ method: 'post', url, data, ...config });

export const put = (url: string, data = {}, config: AxiosRequestConfig = {}) => request({ method: 'put', url, data, ...config });

export const patch = (url: string, data = {}, config: AxiosRequestConfig = {}) => request({ method: 'patch', url, data, ...config });

export const del = (url: string, data = {}, config: AxiosRequestConfig = {}) => request({ method: 'delete', url, data, ...config });
