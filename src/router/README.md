# 路由
整个系统的的路由分为两类：
- 静态路由`/src/router/constRoutes`: 该类路由一般是一些不需要登录就可以访问的，如登录、注册、错误页等，此外，还需要在白名单（`/src/config/index.js` => `routerConfig.whiteRoutes`）中添加，阻止路由拦截器拦截该类路由。
- 动态路由`/src/router/asyncRoutes`: 该类路由是需要用户登录后才能访问的页面，会在用户登录后动态注册到路由系统。一般情况下会由接口根据登录用户的角色权限动态返回权限集，然后根据权限集（权限集和路由通过`mate.permission`关联）清洗出相关路由并注册。
大致流程如下：
![](https://gitee.com/letwrong/Picture/raw/master/20201204093426.jpg)

> 整个权限处理流程都是封装在[`@bwrong/auth-tool`](https://github.com/BWrong/auth-tool)中, 路由相关拦截处理在`/src/router/index.js`中。

**建议：**
- 权限标识命名`permission`包含业务模块结构信息，如:`sys/dictionary`。
- 如果动态路由较多，建议按照业务模块拆分，每个模块一个文件，最后由`/src/router/asyncRoutes/index.js`统一导出，静态路由也可以遵循此建议。
- 一些路由基本配置可在`/src/config/index.js` => `routerConfig`中更改。