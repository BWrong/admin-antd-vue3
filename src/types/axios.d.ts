import type { AxiosRequestConfig } from 'axios';
declare module 'axios' {
  interface AxiosRequestConfig {
    isNotIntercept?: boolean;
    isNotTips?: boolean;
    isNotRefreshToken?: boolean;
  }
  // TODO:优化
  export interface AxiosResponse<T = IPageData> {
    data: T;
    current: number;
    list: any[];
    size: number;
    total: number;
    [key: string]: any;
  }
  export interface IPageData {
    current: number;
    list: any[];
    size: number;
    total: number;
    [key: string]: any;
  }
}
