import { get, post } from '../utils/request';
import type { IRecordBase } from './types';

export interface IUser {
  username: string;
  sex: 1 | 2;
  role: string;
  email: string;
  id: string;
  nickName: string;
  status: 0 | 1;
  phone: string;
}
export interface LoginRes extends IUser {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
interface LoginParams {
  username: string;
  password: string;
  code: string;
}
// 菜单
export interface IMenu extends IRecordBase {
  title: string;
  path: string;
  url?: string;
  icon?: Iconfont;
  type?: number;
  hide?: boolean;
  children?: IMenu[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K: string]: any;
}

export const loginRequest = (params: LoginParams) =>
  post<LoginRes, LoginParams>('/auth/login', params, {
    skipCheckAuth: true,
    skipShowTips: true
  });
export const refreshTokenRequest = (params: object) =>
  post<LoginRes>('/auth/refresh_token', params, {
    skipCheckAuth: true,
    skipShowTips: true
  });
export const getMenusRequest = (params?) => get<IMenu[]>('/auth/menus', params);
