# 基础表格
## 使用方法
```js
// 引入组件
import BasisTable from '@/components/BasisTable';
```
```js
// 注册组件
component: {
    BasisTable
}
```
```html
// 使用组件
<basis-table :data="data" :pagination="pagination"></basis-table>
```
<br />

## API
### Props

属性|必须|说明|类型|默认值
:---:|:---:|:---:|:---:|:---:
rowKey|false|唯一标识|String|id
showIndex|false|是否显示序号列|Boolean|false
columns|true|列信息|Array|-
pagination|false|分页设置|[Object, Boolean]|null


**注意：`Ant Design of Vue`的`Table`组件相关API同样适用该组件。**

[antdv表格文档](https://2x.antdv.com/components/table-cn)
