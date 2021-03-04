
## 开发规范
### 命名
- 一般文件以`kebab-case`格式，vue文件及class为`kebabCase`格式。
- 私有变量或者私有方法建议以_开头命名。
- class类名采用`kebab-case`，对大小写不敏感。
### 样式
默认使用scss预处理器，如果需要定义全局变量和mixin，可以分别在`/src/assets/style/_variable.scss`和`/src/assets/style/_mixin.scss`,这两个文件会在每个scss文件自动引入，可以直接使用变量和mixin。
`common.css`为全局通用的样式。其他样式尽量采用`scoped`模式，尽量避免使用`important`更改优先级。

### Vue
- 每一个Vue组件（或模块）必须专注于解决一个单一的问题，它是独立、可复用、微小和可测试的。
- 组件名应该始终是多个单词的，根组件 App 除外，切勿使用保留字；原则上应该是有意义，简短和可读性的。
- 为组件样式设置作用域，以免污染全局样式。
- `.vue`单文件组件文件名采用大驼峰命名，模板中使用组件时使用`kebab-case`格式。
- 当在组件中使用 data 属性的时候 (除了 new Vue 外的任何地方)，它的值必须是返回一个对象的函数 `data() { return {...} }`。
- prop 的定义应该尽量详细，至少需要指定其类型。
- 布尔类型的 attribute， 为 true 时直接写属性值。
- 不要在computed中对vue变量进行操作。
- 应该优先通过 prop 和事件进行父子组件之间的通信，而不是 this.$parent 或改变 prop，谨慎使用this.$parent，this.$refs，因为会增加组件间的耦合性。
- 在组件上总是必须用 key 配合 v-for，以便维护内部组件及其子树的状态。
- v-if 和 v-for 不能同时使用
- 公共方法尽量不要挂到原型上, 可以写在 utils 文件，也可以使用 mixin 文件。不要将业务公共组件注册到全局。
- 不要将任何第三方插件挂载到 vue 原型上。
- 具有高度通用性的方法，要封装到 libs、全局组件或指令集里。
- 尽量使用指令缩写。
- 修改 state 中数据必须通过 mutations。
- 每一个可能发生改变的 state 必须同步创建一条或多条用来改变它的 mutations。
- 组件内不强制使用 mapGetters，因为你可能需要使用 getter 和 setter。
- 改变 state 的唯一方法就是提交 mutations (opens new window)。
- 组件内使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用。
- 每个页面模块或页面的子模块添加属性 namespaced: true。
具体规范可参考：[Vue.js 组件编码规范](https://pablohpsilva.github.io/vuejs-component-style-guide/#/chinese)，[VUE风格指南](https://cn.vuejs.org/v2/style-guide/)。
## Git管理规范
GIT管理规范不强制要求，仅做建议，以下仅做简单介绍，具体可以参考阮一峰前辈的[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)、[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
### 分支模型
#### master 分支
- master 为主分支，也是用于部署生产环境的分支，确保master分支稳定性。
- master 分支一般由develop以及hotfix分支合并而来，任何时候都不能直接修改该分支的代码。
#### develop分支
- develop 为开发分支，始终保持最新完成以及bug修复后的代码。
- 一般开发的新功能时，创建的feature分支都是基于develop分支的。
#### feature 分支
- 开发新功能时，以develop为基础创建feature分支。
- 分支命名: feature/开头的为特性分支， 命名如: `feature/user_module`、 `feature/cart_module`。
#### release分支
- release为预上线分支，发布提测阶段，会以release分支代码为基准提测。
- 当有一组feature开发完成，首先会合并到develop分支，进入提测时，会创建release分支。如果测试过程中若存在bug需要修复，则直接由开发者在release分支修复并提交。当测试完成之后，合并release分支到master和develop分支，此时master为最新代码，用作上线。
#### hotfix 分支
- 分支命名: hotfix/ 开头的为修复分支，它的命名规则与 feature 分支类似。
- 线上出现紧急问题时，需要及时修复，以master分支为基线，创建hotfix分支，修复完成后，需要合并到master分支和develop分支。
#### 版本备份分支
- 每发布一个版本，可以以版本号为名字（如：V3.1.1）创建一个版本备份分支。

其中master和develop分支为常设分支，远程仓库中也应包含这两个分支；版本备份分支主要用于版本存档，方便后期获取指定版本程序；其他的为临时性分支，使用完成后应该删除，也建议不要推送到远程仓库。
### 提交规范
GIT提交时的粒度应该是一个小功能点或者一个bugFix，这样进行恢复操作时能够将影响范围降到最低。

为了方便跟踪工程历史，编写良好的版本发布日志，我们应该编写一个良好的commit messages。建议采用当前广泛应用的`Angular Git Commit Guidelines`规范。

每次提交，Commit message 可以包括三个部分：Header，Body 和 Footer。
```
<type>(<scope>): <subject>  // header
// 空一行
<body>
// 空一行
<footer>
```
其中，Header 是必需的，Body 和 Footer 可以省略。不管是哪一个部分，任何一行都不得超过72个字符（或100个字符），这是为了避免自动换行影响日志查阅。

#### 1. Header

Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

**Type：**

type用于说明 commit 的类别，只允许使用下面7个标识：
- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

如果type为feat和fix，则该 commit 将肯定出现在 ChangeLog 之中。其他情况，如：docs、chore、style、refactor、test，根据实际情况决定是否放入 ChangeLog，建议不放入。

**Scope：**

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同，本项目建议采用模块区分，如：模版编辑、数据更新。

**Subject：**

subject是 commit 目的的简短描述，不超过50个字符；以动词开头，使用第一人称现在时，比如change，而不是changed或changes；第一个字母小写，结尾不加句号。

#### 2. Body

Body 部分是对本次 commit 的详细描述，可以分成多行。

#### 3. Footer

Footer 部分只用于不兼容变动或关闭 Issue。