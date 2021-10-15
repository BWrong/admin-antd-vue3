/*
 * @Author: wangwenbing
 * @Date: 2018-01-15 11:29:17
 * @Last Modified by: wangwenbing
 * @Last Modified time: 2019-05-24 13:53:33
 */
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { IPageData, IResponseData } from 'types/interface/common';
import request from './request';

interface IMethod {
  (url: string, params?: object, config?: AxiosRequestConfig): AxiosPromise<IPageData> | AxiosPromise<IResponseData>;
}

export default request;

export const get = (url, params = {}, config = {}) => request({ method: 'get', url, params, ...config });

export const post = (url, data = {}, config = {}) => request({ method: 'post', url, data, ...config });

export const put = (url, data = {}, config = {}) => request({ method: 'put', url, data, ...config });

export const patch = (url, data = {}, config = {}) => request({ method: 'patch', url, data, ...config });

export const del = (url, data = {}, config = {}) => request({ method: 'delete', url, data, ...config });
