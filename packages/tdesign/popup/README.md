---
title: Popup 弹出层
description: 由其他控件触发，屏幕滑出或弹出一块自定义内容区域。
spline: message
isComponent: true
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TPopup from 'tdesign-uniapp/popup/popup.vue';
```

### 组件类型

基础弹出层

{{ base }}

### 组件示例

应用示例

{{ with-title }}

{{ custom-close }}

## API

### Popup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
customStyle | Object | - | 自定义样式 | N
closeBtn | Boolean / TNode | - | 关闭按钮，值类型为 Boolean 时表示是否显示关闭按钮。也可以自定义关闭按钮。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/novlan1/tdesign-uniapp/blob/develop/packages/tdesign/common/common.ts) | N
closeOnOverlayClick | Boolean | true | 点击遮罩层是否关闭 | N
content | String / TNode | - | 浮层里面的内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/novlan1/tdesign-uniapp/blob/develop/packages/tdesign/common/common.ts) | N
duration | Number | 240 | 动画过渡时间 | N
overlayProps | Object | {} | 遮罩层的属性，透传至 overlay。TS 类型：`OverlayProps`，[Overlay API Documents](./overlay?tab=api)。[详细类型定义](https://github.com/novlan1/tdesign-uniapp/blob/develop/packages/tdesign/popup/type.ts) | N
placement | String | top | 浮层出现位置。可选项：top/left/right/bottom/center | N
preventScrollThrough | Boolean | true | 是否阻止背景滚动 | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
usingCustomNavbar | Boolean | false | 是否使用了自定义导航栏 | N
visible | Boolean | - | 是否显示浮层。支持语法糖 `v-model:visible`。TS 类型：`boolean` | N
defaultVisible | Boolean | - | 是否显示浮层。非受控属性。TS 类型：`boolean` | N
zIndex | Number | 11500 | 组件层级，Web 侧样式默认为 5500，移动端样式默认为 1500，小程序样式默认为11500 | N

### Popup Events

名称 | 参数 | 描述
-- | -- | --
visible-change | `(visible: boolean, trigger: PopupSource) ` | 当浮层隐藏或显示时触发。[详细类型定义](https://github.com/novlan1/tdesign-uniapp/blob/develop/packages/tdesign/popup/type.ts)。<br/>`type PopupSource = 'close-btn' \| 'overlay'`<br/>

### Popup Slots

名称 | 描述
-- | --
- | 默认插槽，作用同 `content` 插槽

### Popup External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
| 名称 | 默认值 | 描述 |
| -- | -- | -- | 
| --td-popup-bg-color | @bg-color-container | - |
| --td-popup-border-radius | @radius-extraLarge | - |
| --td-popup-close-btn-color | @text-color-primary | - |
| --td-popup-distance-top | 0) | - |
| --td-popup-transition | all 300ms ease | - |