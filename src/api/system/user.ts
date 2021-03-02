import { get } from '../../utils/request';
const prefix = '/system/user';
export default {
  list: (params: object) => get(`${prefix}`, params),
  info: (params: object) => get(`${prefix}/info`, params)
};
