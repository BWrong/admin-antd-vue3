const menus = ({ query }) => {
  return {
    code: 200,
    msg: '登录成功',
    data: {
      menus: require('./menu.json'),
      btnPermissions: ['testAuth'],
      detail: {
        email: '8888888@qq.com',
        id: '12341234',
        idNumber: '410221199402261',
        nickName: '超级管理员',
        remark: 'vvv',
        sex: 1,
        status: 0,
        telphone: '15528308524',
        username: 'admin'
      }
    }
  };
};
const login = ({ body }) => {
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
      role: body.role
    }
  };
};
const refreshToken = {
  code: 200,
  msg: '',
  data: {
    token: '@guid',
    access_token: '@guid',
    expires_in: 100000
  }
};
const unloadCount = {
  code: 200,
  msg: '请求成功',
  data: 2019
};

module.exports = [
  {
    url: '/auth/login',
    method: 'post',
    response: login
  },
  {
    url: '/auth/menus',
    response: menus
  },
  {
    url: '/auth/refresh_token',
    method: 'post',
    response: refreshToken
  },
  {
    url: '/auth/unreadCount',
    response: unloadCount
  }
];
