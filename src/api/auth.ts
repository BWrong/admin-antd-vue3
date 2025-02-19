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
  // path: string;
  url?: string;
  icon?: Iconfont;
  type?: 0 | 1;
  hide?: boolean;
  children?: IMenu[];
  parentId?: string;
  permission?: string;
  priority?: number;
  isLink?: boolean;
  // [K: string]: any;
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
export const getMenusRequest = () => get<IMenu[]>('/auth/menus');
