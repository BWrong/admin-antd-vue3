import type { AxiosRequestConfig } from 'axios';
declare module 'axios' {
  interface AxiosRequestConfig {
    isNotIntercept?: boolean;
    isNotTips?: boolean;
    isNotRefreshToken?: boolean;
  }
  // interface AxiosResponse {
  //   data: IResponseData;
  //   // current: number;
  //   // list: any[];
  //   // size: number;
  //   // total: number;
  //   // [key: string]: any;
  // }
  // interface IPageData {
  //   current: number;
  //   list: any[];
  //   size: number;
  //   total: number;
  //   [key: string]: any;
  // }
}
