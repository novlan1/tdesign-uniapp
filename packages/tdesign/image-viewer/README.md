---
title: ImageViewer 图片预览
description: 图片全屏放大预览效果，包含全屏背景色、页码位置样式、增加操作等规范。
spline: data
isComponent: true
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TImageViewer from 'tdesign-uniapp/image-viewer/image-viewer.vue';
```

### 类型

#### 基础图片预览

{{ base }}

#### 带操作图片预览

顶部区域可以配置关闭按钮、页码信息、删除按钮。

{{ delete }}

> 当使用自定义导航栏的时候，顶部的操作按钮会被遮挡，此时需要开启 `using-custom-navbar` 来解决

## API

### ImageViewer Props

| 名称 | 类型 | 默认值 | 描述 | 必传 |
| -- | -- | -- | -- | -- |
| style | Object | - | 样式 | N |
| custom-style | Object | - | 样式，一般用于开启虚拟化组件节点场景 | N |
| background-color | String | - | 遮罩的背景颜色 | N |
| close-btn | String / Boolean / Object / Slot | false | 是否显示关闭操作，前提需要开启页码。值为字符串表示图标名称，值为 `true` 表示使用默认图标 `close`，值为 `Object` 类型，表示透传至 `icon` ，不传表示不显示图标。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/components/common/common.ts) | N |
| delete-btn | String / Boolean / Object / Slot | false | 是否显示删除操作，前提需要开启页码。值为字符串表示图标名称，值为 `true` 表示使用默认图标 `delete`，值为 `Object` 类型，表示透传至 `icon`，不传表示不显示图标。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/components/common/common.ts) | N |
| images | Array | [] | 图片数组。TS 类型：`Array<string>` | N |
| initial-index | Number | 0 | 初始化页码。TS 类型：`Number` | N |
| lazy | Boolean | true | `1.9.4`。是否开启图片懒加载。开启后会预加载当前图片、相邻图片 | N |
| show-index | Boolean | false | 是否显示页码 | N |
| using-custom-navbar | Boolean | false | `v1.1.4`。是否使用了自定义导航栏 | N |
| visible | Boolean | false | 隐藏/显示预览 | N |
| default-visible | Boolean | undefined | 隐藏/显示预览。非受控属性 | N |

### ImageViewer Events

| 名称 | 参数 | 描述 |
| -- | -- | -- | 
| change | `(index: number)` | 翻页时回调 |
| close | `(trigger: 'overlay' \| 'button', visible: Boolean, index: Number)` | 点击操作按钮button或者overlay时触发 |
| delete | `(index: number)` | 点击删除操作按钮时触发 |

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
| 名称 | 默认值 | 描述 |
| -- | -- | -- | 
| --td-image-viewer-close-margin-left | @spacer-1 | - |
| --td-image-viewer-delete-margin-right | @spacer-1 | - |
| --td-image-viewer-mask-bg-color | @mask-active | - |
| --td-image-viewer-nav-bg-color | #000 | - |
| --td-image-viewer-nav-color | @text-color-anti | - |
| --td-image-viewer-nav-height | 96rpx | - |
| --td-image-viewer-nav-index-font-size | @font-size-base | - |
| --td-image-viewer-top | @position-fixed-top | - |
