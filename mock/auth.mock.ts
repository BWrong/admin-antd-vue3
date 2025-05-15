import { fakerZH_CN as faker } from '@faker-js/faker';
import { defineMock } from 'vite-plugin-mock-dev-server';
export default defineMock([
  {
    url: '/api/auth/login',
    method: 'POST',
    body: ({ body }: any) => {
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
          access_token: faker.internet.jwt(),
          refresh_token: faker.internet.jwt(),
          expires_in: 100000,
          sex: faker.person.sex(),
          role: body.role,
          email: faker.internet.email(),
          id: faker.string.uuid(),
          nickName: faker.internet.username(),
          status: 0,
          phone: faker.phone.number()
        }
      };
    }
  },
  {
    url: '/api/auth/menus',
    method: 'GET',
    body: {
      code: 200,
      msg: '登录成功',
      data: [
        {
          id: 1,
          permission: 'home',
          title: '首页',
          type: 0,
          icon: 'icon-home',
          url: '/home',
          parentId: 0
        },
        {
          id: 2,
          permission: 'system',
          title: '系统管理',
          type: 0,
          icon: 'icon-setting',
          parentId: 0
        },
        {
          id: 3,
          permission: 'system/menu',
          title: '菜单管理',
          type: 0,
          icon: 'icon-menu',
          parentId: 2
        },
        {
          id: 4,
          title: '案例展示',
          type: 0,
          icon: 'icon-setting',
          parentId: 0
        },
        {
          id: 5,
          title: '外链页面',
          type: 0,
          icon: 'icon-menu',
          isLink: true,
          url: 'https://www.baidu.com',
          parentId: 4
        }
      ]
    }
  },
  {
    url: '/api/auth/refresh_token',
    method: 'POST',
    body: {
      code: 200,
      msg: '',
      data: {
        token: faker.internet.jwt(),
        access_token: faker.internet.jwt(),
        expires_in: 100000
      }
    }
  },
  {
    url: '/api/auth/unreadCount',
    method: 'GET',
    body: {
      code: 200,
      msg: '请求成功',
      data: faker.number.int({ min: 0, max: 100 })
    }
  },
  {
    url: '/api/auth/test',
    method: 'GET',
    delay: 500,
    body: ({ query }: any) => {
      const size = Number(query.pageSize || 10);
      const total = size * 10;
      const list = Array.from({ length: size }, () => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        image: faker.image.avatarGitHub()
      }));
      return {
        code: 200,
        msg: '',
        data: {
          current: Number(query.current || 1),
          pageSize: size,
          total: total,
          list
        }
      };
    }
  }
]);
