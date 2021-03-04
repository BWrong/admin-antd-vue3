import { AxiosRequestConfig, AxiosResponse } from 'axios';
declare module 'axios' {
  interface AxiosRequestConfig {
    isNotIntercept?: boolean;
    isNotTips?: boolean;
    isNotRefreshToken?: boolean;
  }
}