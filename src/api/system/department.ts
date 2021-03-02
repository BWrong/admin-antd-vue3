import { get } from '../../utils/request';
const prefix = '/system/department';
export default {
  list: (params: object) => get(`${prefix}`, params)
};
