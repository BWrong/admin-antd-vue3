# 搜索按钮
## 使用方法
```js
// 引入组件
import SearchButton from '@/components/SearchButton';
```
```js
// 注册组件
component: {
    SearchButton
}
```
```html
// 使用组件
 <search-button @search="handleSearch" @reset="handleReset" placeholder="请输入搜索关键词"/>
```

## API
### Props

属性|必须|说明|类型|默认值
:---:|:---:|:---:|:---:|:---:
placeholder|false|placeholder|String|'请输入搜索关键词'
modelValue(v-model)|false|输入框值，可使用`v-model`|String|''
loading|false|搜索按钮loading|Boolean|false
inputWidth|false|输入框长度|String|200px



### Events

事件名称|说明|回调参数
:---:|:---:|:---:
handleSearch|点击搜索按钮触发|搜索关键词
handleReset|点击重置按钮触发|-
