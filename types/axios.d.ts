// import { AxiosRequestConfig } from 'axios';

import 'axios';
import '@bwrong/request';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipIntercept?: boolean;
    skipShowTips?: boolean;
    skipCheckAuth?: boolean;
  }
}
// declare module '@bwrong/request' {
// interface RequestConfig extends AxiosRequestConfig {
// skipIntercept?: boolean;
// skipShowTips?: boolean;
// skipCheckAuth?: boolean;
// }
// }
