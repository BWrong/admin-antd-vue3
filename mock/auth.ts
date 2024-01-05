import type { MockMethod } from 'vite-plugin-mock';
import menus from './menu.json';
export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }: any) => {
      if (body.username !== 'admin') {
        return {
          code: 500,
          msg: `${body.username} 用户不存在`,
          data: {}
        };
      }
      // 根据参数做验证
      return {
        code: 200,
        msg: '登录成功',
        data: {
          username: body.username,
          access_token: '@guid',
          refresh_token: '@guid',
          expires_in: 100000,
          sex: 1,
          role: body.role,
          email: '8888888@qq.com',
          id: '12341234',
          nickName: '超级管理员',
          status: 0,
          phone: '15528308524',
        }
      };
    }
  },
  {
    url: '/api/auth/menus',
    response: {
      code: 200,
      msg: '登录成功',
      data: menus
    }
  },
  {
    url: '/api/auth/refresh_token',
    method: 'post',
    response: {
      code: 200,
      msg: '',
      data: {
        token: '@guid',
        access_token: '@guid',
        expires_in: 100000
      }
    }
  },
  {
    url: '/api/auth/unreadCount',
    response: {
      code: 200,
      msg: '请求成功',
      data: 2019
    }
  }
] as MockMethod[];
