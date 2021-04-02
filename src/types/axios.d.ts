import type { AxiosRequestConfig } from 'axios';
declare module 'axios' {
  interface AxiosRequestConfig {
    isNotIntercept?: boolean;
    isNotTips?: boolean;
    isNotRefreshToken?: boolean;
  }
  // 优化
  export interface AxiosResponse<T = IResponseData> {
    data: T;
    currentPage?: string;
    items?: any;
    pageSize?: string;
    totalPage?: string;
    totalRows?: string;
    [key: string]: any;
  }
  interface IResponseData {
    code: number;
    status: number;
    message: string;
    data: any;
  }
}
