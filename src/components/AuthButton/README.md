## 权限按钮
### 使用方法
1. 组件注册（建议全局注册）
```js
// /src/main.js
import AuthButton from '@/components/AuthButton';
Vue.component('AuthButton', AuthButton);
```
2. 使用组件
```html
<auth-button @click="test" type="primary" auth="btn_ipBinding_edit">权限按钮</auth-button>
```
### API

#### Props

|属性|必须|说明|类型|默认值|
|---|---|---|---|---|
|auth|yes|按钮对应的权限标识符|String|''|

**注意：`Ant Design of Vue`的`Button`组件相关API同样适用该组件。**

[antdv按钮文档](https://www.antdv.com/components/button-cn/)

该组件主要实现对按钮类型资源的控制，还可以通过`v-auth`指令实现对更多其他类型资源的权限控制：
```html
<!-- 按钮 -->
 <a-button v-auth="'btn_ipBinding_edit'">权限资源</a-button>
<!-- 选项卡 -->
 <a-tabs default-active-key="1" @change="callback">
  <a-tab-pane key="1" tab="Tab 1">1</a-tab-pane>
  <a-tab-pane key="2" tab="Tab 2" v-auth="'btn_ipBinding_edit'">2</a-tab-pane>
  <a-tab-pane key="3" tab="Tab 3">3</a-tab-pane>
</a-tabs>
<!-- 更多 -->
```