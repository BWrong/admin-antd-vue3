# 删除按钮
## 使用方法
```js
// 引入组件
import DeleteButton from '@/components/DeleteButton';
```
```js
// 注册组件
component: {
    DeleteButton
}
```
```html
// 使用组件
 <delete-button @confirm="handleDel(row)" :title="row.title">删除</delete-button>
```

## API
### Props

属性|必须|说明|类型|默认值
:---:|:---:|:---:|:---:|:---:
title|false|删除数据的名称|String|''
type|false|按钮类型，可为`button`、`icon`|String|`button`

该组件同样接收[`Button`](https://element.eleme.cn/#/zh-CN/component/button)的`Attributes`

### Events

事件名称|说明|回调参数
:---:|:---:|:---:
confirm|确认删除回调|
