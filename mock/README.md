有的时候，为了赶进度，需要前后端同时开发，接口出来之前，就需要前端进行数据Mock，等接口出来再进行联调。

数据Mock一般有如下几种方式：

- 使用在线mock服务，如[Easy-mock](https://www.easy-mock.com/)、[Yapi](https://hellosean1025.github.io/yapi/)、[Apizza](https://apizza.net/pro/#/)。
- 基于[json-server](https://github.com/typicode/json-server)提供本地服务。
- 请求拦截，基于[MockJs](http://mockjs.com/)创建本地mock服务。

我在项目中一般会使用第三种请求拦截，这里就简单分享下我项目中的做法。主要使用[@bwrong/mock](https://www.npmjs.com/package/@bwrong/mock)，利用webpack-dev-server的before钩子来做数据mock，以vue项目为例：

实现了如下功能：

- mock的文件更新，会自动重载
- 支持接收请求参数，动态处理返回数据
- 延迟响应：可以设置延迟响应时间，应对调试loading的场景
- 自定义header：可以全局设置header，也可以为某个mock接口设置header
- 可以使用mockjs语法

```bash
npm i -D @bwrong/mock
```



```js
// webpack.config.js
const mockServer = require('@bwrong/mock');

module.exports = {
    // ...
    devServer: {
        before(app) {
          mockServer(app, resolve('./mock/'), {
            pattern: '**/[^_]*.js',
            delay: 0,
            prefix: '/api',
            debug: true,
            headers: {},
            watchOptions: {}
          });
        }
    }
}
```

在mock目录中，`index.js`用来做文件自动载入，而其他文件则为模拟数据，每个功能模块可以分割为一个文件，模块化管理。

*提示：mock的这些文件是在webpack中使用的，需要遵循commonjs规范。*

```js
const list = {
  code: 0,
  msg: '',
  'data|10': [
    {
      id: '@id',
      name: '@cname',
      des: '@csentence',
      web: '@url',
      photo: '@image',
      address: '@county(true)',
      email: '@email',
      lastIp: '@ip',
      date: '@datetime(yyyy-MM-dd hh:mm:ss)'
    }
  ]
};
const info = {
  code: 0,
  msg: '',
  data: {
    id: '@id',
    name: '@cname',
    department: 'xxx',
    jibTitle: 'yyy',
    org: 'zzzzz',
    count: {
      sum: '@integer(0,10000)',
      score: '@float(0,5,0,2)',
      today: '@integer(0,200)',
      reservation: '@integer(0,200)'
    }
  }
};
module.exports = [
  {
    url: '/user',
    response: list
  },
  {
    url: '/testhtml',
    method: 'get',
    headers: {
      'Content-Type': 'text/html'
    },
    response: '<html><h1>html测试</h1><a href="https://www.bwrong.com">bwrong</a></html>'
  },
  {
    url: '/user/info/:id',
    response: (req,res) => {
      return {
        ...info,
        id: req.params.id
      }
    }
  }
];
```
