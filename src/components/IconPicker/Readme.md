# 图标选择
`./data.json`中为图标配置列表，默认使用了[Ant Design for Vue的图标](https://www.antdv.com/components/icon-cn/)。

![效果图](https://gitee.com/letwrong/Picture/raw/master/20201217164946.png)
## 使用方法
```js
// 引入组件
import IconPicker from '@/components/IconPicker';
```
```js
// 注册组件
component: {
    IconPicker
}
```
```html
// 使用组件
<icon-picker v-model:value="icon" />
```
<br />

## API
### Props

属性|必须|说明|类型|默认值
:---:|:---:|:---:|:---:|:---:
v-model|false|当前选择的按钮名字|String|''
