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
<div class="icon-picker-wrap">
    <icon-picker v-model:value="form.icon" />
</div>
```


## API
### Props

属性|必须|说明|类型|默认值
:---:|:---:|:---:|:---:|:---:
v-model|false|当前选择的按钮名字|String|''

**注意：**
- 为了更加灵活，该组件只是作为图标列表展示，仅包含列表内的样式，所以一般还需要自己设置容器及其样式。如：
```css
.icon-picker-wrap {
  width: 400px;
  height: 400px;
  overflow-y: auto;
}
```