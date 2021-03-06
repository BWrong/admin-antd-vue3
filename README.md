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
  |- enums // 枚举值
  |- hooks // 全局hooks
  |- layouts // 布局组件
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

## TODO
### 框架基础功能
- [x] 目录结构规划
- [x] UI框架
- [x] 路由管理
- [x] 状态管理
- [x] 数据请求、拦截器、接口鉴权、API管理
- [x] 数据Mock服务
- [x] 用户登录验证、路由拦截器
- [x] 路由、动态菜单、资源按钮
- [x] 跨域代理
- [x] 常用工具函数
- [x] css预处理器
### 优化
- [] 静态资源及图标优化
- [x] Gzip
- [x] Cdn
- [x] 分包及按需加载
- [] 接口缓存
- [x] 请求取消

### 开发规范
- [x] ESlint
- [x] 开发规范文档
- [x] git分支策略
- [x] api接口约定

### 布局组件
- [x] 多种布局: 暂时提供了两种
- [] 多页签
- [x] 头部组件
- [x] 导航菜单
- [x] 面包屑
- [x] 工作区