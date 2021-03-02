# admin-antdv-vue3
## 目录规划
```js
|- dist // 构建成果
|- mock // 数据mock
|- public
  |- index.html // 入口页面模板
|- src
  |- api // api接口管理
  |- assets  // 静态资源
  |- components // 组件
  |- config // 全局配置
  |- filters // 全局过滤器
  |- layouts // 布局组件
  |- mixins  // mixin
  |- plugins // 第三方插件
  |- router  // 路由
  |- store   // 状态
  |- utils   // 工具
  |- views   // 页面
  |- App.vue  // 根组件
  |- main.js
```
## 技术体系
- 基础：Html5 + Css3 + ES6
- 框架：VueJs + VueRouter + Vuex
- UI：ant-design-vue
- 构建系统：Webpack + Babel + Eslint + PostCss
- Http请求：Axios
- 依赖管理：NPM

## 使用说明
``` bash
# 安装依赖
npm install

# mock环境启动，第一次请使用该方式
npm run serve:mock

# 开发环境启动
npm run serve
# 或
npm run start

# 生产环境打包
npm run build

# 生产环境打包并生成构建依赖信息
npm run build:report
```
