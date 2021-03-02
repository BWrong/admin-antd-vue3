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
<basis-table :action="action"></basis-table>
```
<br />

## API
### Props

属性|必须|说明|类型|默认值
:---:|:---:|:---:|:---:|:---:
action|false|按钮|Object|{}
rowKey|false|唯一标识|String|id
showIndex|false|是否显示序号列|Boolean|false


**注意：`Ant Design of Vue`的`Table`组件相关API同样适用该组件。**

[antdv表格文档](https://www.antdv.com/components/table-cn/)

### 属性举例说明

* action
```js
action: [
    {
        text: '删除',
        type: 'danger',
        click: this.changeDel,
    },
    {
        text: '更多',
        icon: 'caret-down',
        children: [
            {
                text: '查看',
                icon: 'search',
                click: this.changeSearch
            }
        ]
    }
]
```

    - 如果操作按钮中如果不传type,`按钮类型默认为link`
    - 更多操作按钮的子项`属性名必须为children`
    - 如上可见，click传值为function, `该方法可直接在父组件声明使用`

<br/>
