# 自定义图标

ant2.0 开始，为了减少文件体积，采用了按需加载的方式，而且图标仓库独立了。但是针对菜单类的动态图标就无法处理了，所以这里采用了自定义图标，可以引入[`iconfont`](https://www.iconfont.cn/)中的图标，更加通用灵活。

## 使用方法

在`index.html`中设置图标文件地址，可以是下载到本地后映射的地址，也可以直接填线上图标库的地址。

```html
<script src="<%= BASE_URL %>iconfont/iconfont.js"></script>
```

```js
// 引入组件
import IconFont from '@/components/IconFont';
```

```js
// 注册组件
component: {
  IconFont;
}
```

```html
// 使用组件 <icon-font type="icon-setting" />
```

<br />

## API

### Props

|   属性   | 必须  |                说明                 |  类型  |   默认值    |
| :------: | :---: | :---------------------------------: | :----: | :---------: |
|   type   | true  |              图标名字               | String |
| fontSize | false |              图标大小               | String | `'inherit'` |
|  color   | false |              图标颜色               | String | `'inherit'` |
|  style   | false | 样式，优先级比 fontSize、color 更高 | Object |     {}      |
