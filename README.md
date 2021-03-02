# admin-antdv-vue3
## 目录规划
```js
|- docs // 文档
|- dist // 构建成果
|- mock // 数据mock
|- public
  |- index.html // 入口页面模板
|- src
  |- api // api接口管理
  |- assets  // 静态资源
  |- components // 组件
  |- config // 全局配置
  |- directives // 全局指令
  |- hooks // 全局hooks
  |- layouts // 布局组件
  |- mixins  // mixin
  |- plugins // 第三方插件
  |- router  // 路由
  |- store   // 状态
  |- types   // 类型声明
  |- utils   // 工具
  |- views   // 页面
  |- App.vue  // 根组件
  |- main.ts
```
## 技术体系
- 基础：HTML5 + CSS3 + TypeScript
- 框架：VueJs3.0 + VueRouter4.0 + Vuex4.0
- UI：AntDesignVue2.0
- 构建系统：Webpack + Babel + ESLint + PostCss
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
