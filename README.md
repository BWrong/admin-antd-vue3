# antd-vue3

如果有任何问题请在仓库提交issues。

## 技术体系

- 核心：TypeScript + Vue + VueRouter + Pinia
- UI组件库：AntDesignVue
- 构建系统：Vite
- HTTP请求：Axios
- 依赖管理：pnpm

## 目录规划

```js
|- docs // 文档
|- dist // 构建成果
|- mock // 数据mock
|- public
|- src
  |- api // api接口管理
  |- assets  // 静态资源
  |- components // 全局组件
  |- config // 全局配置
  |- enums // 枚举值
  |- composables // 全局组合函数/hooks，用于抽离公用逻辑
  |- layouts // 布局组件
  |- plugins // 第三方插件
  |- router  // 路由
  |- store   // 状态
  |- types   // 类型声明
  |- utils   // 工具函数
  |- views   // 页面
  |- App.vue  // 根组件
  |- main.ts
|- index.html // 入口页面
```

## 开发工具

- 编辑器：VSCode
- 推荐插件：`Vue.volar`, `dbaeumer.vscode-eslint`,`esbenp.prettier-vscode`,`antfu.unocss`,`antfu.iconify`

如果已经安装Vetur，需要禁用或者卸载，否则会有冲突。

## 使用说明

```bash
# 安装依赖
pnpm install

# mock环境启动，第一次请使用该方式
pnpm run serve:mock

# 开发环境启动
pnpm run serve
# 或
pnpm run dev

# 生产环境打包
pnpm run build

```

## 更新日志

[更新日志](CHANGELOG.md)

## 主要功能

### 基础功能

- [x] 框架目录统一规划
- [x] UI框架集成
- [x] 路由管理集成
- [x] 状态管理集成
- [x] 数据请求、拦截器、接口鉴权、API管理
- [x] 数据Mock服务
- [x] 用户登录验证、路由拦截器
- [x] 路由、动态菜单、资源按钮
- [x] 跨域代理、多环境支持
- [x] 常用工具函数和组件
- [x] css预处理器支持及主题颜色更改
- [x] 字体图标支持

### 性能优化

- [x] Gzip压缩支持
- [x] 按需加载和依赖分包并行加载支持
- [x] 重复请求取消支持

### 开发规范

- [x] ESlint
- [x] 开发规范文档
- [x] Git分支策略
- [x] API接口约定

### 布局组件

- [x] 头部组件
- [x] 导航菜单
- [x] 面包屑
- [x] 工作区

### 其他

- [x] Git及版本信息埋点支持
