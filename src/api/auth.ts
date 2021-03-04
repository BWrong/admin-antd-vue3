import { get, post } from '../utils/request';
export default {
  login: (params: object) => post('/auth/login', params, { isNotRefreshToken: true, isNotTips: true }),
  refreshToken: (params: object) => post('/auth/refresh_token', params, { isNotRefreshToken: true, isNotTips: true }),
  getMenus: () => get('/auth/menus'),
  unloadCount: () => get('/auth/unreadCount')
};
