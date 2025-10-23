---
title: Uni App
description: TDesign UniApp 组件库。
spline: explain
---

## 预览

UniApp 组件示例小程序，请使用微信扫码预览 ↓
<br/>

<img width="260" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2025/10/own_mike_5nFZmp27arnbwnjQ.png" />

## 安装

### NPM 方式

```bash
npm i tdesign-uniapp -s
```

### UNI_MODULES 方式

已上传[插件](https://ext.dcloud.net.cn/plugin?id=25431)到 DCloud 插件市场，请打开插件详情页并点击`使用 HBuilderX 导入插件`。

## 使用

1. `main.ts` 中引入样式文件

```js
import 'tdesign-uniapp/common/style/theme/index.css';
```

2. 在文件中使用

```html
<template>
  <t-loading />
</template>

<script lang="ts" setup>
import TLoading from 'tdesign-uniapp/loading/loading.vue';
</script>
```

## 自动导入

在 `pages.json` 配置 [easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)，可实现自动导入。

### CLI 模式

使用 CLI 模式，即使用 `node_modules` 下的 `tdesign-uniapp` 时，配置如下。

```json
{
  "easycom": {
    "custom": {
      "^t-(.*)": "tdesign-uniapp/$1/$1.vue"
    }
  }
}
```

### UNI_MODULES 模式

使用 `uni_modules` 下的 `tdesign-uniapp` 时，配置如下。

```json
{
  "easycom": {
    "custom": {
      "^t-(.*)": "@/uni_modules/tdesign-uniapp/components/$1/$1.vue"
    }
  }
}
```

也可以使用我们提供的 [auto-import-resolver](https://www.npmjs.com/package/tdesign-uniapp-auto-import-resolver)，但是这种工具在小程序等平台下可能存在兼容性问题（uni-app 自身编译问题），不推荐使用。

## 支持平台

目前不支持 `nvue`。

已验证平台

1. H5
2. 微信小程序
3. iOS
4. 安卓

其他平台陆续验证中，欢迎共建。

## 开发

```bash
# 安装项目依赖
npm install

# 执行组件编译
npm run dev

# 小程序
npm run dev:mp
```

打开[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，把 `packages/demo/dist/dev` 目录添加进去就可以预览示例了。

## 小程序基础库版本

- 微信小程序：最低基础库版本`^2.12.0`

### 组件与微信小程序基础库版本对应关系

| 组件   | API | 最低基础库 | 描述 |
| -- | -- | -- | -- | 
| Upload | [wx.previewMedia](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewMedia.html)                                   | 2.12.0     | -    |
| Upload | [wx.chooseMedia](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)                                     | 2.10.0     | -    |
| Upload | [wx.chooseMessageFile](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html)                         | 2.5.0      | -    |
| Navbar | [wx.getMenuButtonBoundingClientRect](https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html) | 2.1.0      | -    |

## 适配说明

### 外部样式类

`tdesign-miniprogram` 中的 `externalClasses`，在 `tdesign-uniapp` 中被转成了 `props`。

传参方式不变，都是 `t-class="xxx-class"`。使用的时候要在样式文件中增加 `:deep` 标记，否则会因为 `scoped` 而失败，如果是非页面级别组件，需要增加 `options: { styleIsolation: 'shared' }`。

### 事件参数

`tdesign-miniprogram` 中的事件参数，在 `tdesign-uniapp` 中都被去掉了 `detail` 一层。以 Picker 组件为例，在 `tdesign-miniprogram` 中，这样获取参数

```js
onPickerChange(e) {
  console.log(e.detail.value);
}
```

在 `tdesign-uniapp` 中，需要去掉 `.detail`，即

```js
onPickerChange(e) {
  console.log(e.value);
}
```

这样做是为了简化使用。`tdesign-uniapp` 中所有组件都采用了这种方式。

## 兼容说明

`uniapp` 下不是所有端都有和微信小程序一样的 API，在其他端下，可能需要业务额外做一下事情，可能是传参、可能是监听。`tdesign-uniapp` 尽量保证业务额外做的事情最少，组件内部多做一些。

### onPageScroll

APP-PLUS 下，需要业务自己在页面中监听 `pageScroll` 事件，这是因为动态的监听不生效。这里给出一个最佳实践之一。

```js
// 页面 Vue 文件下，引入组件库提供的监听方法
// 该方法内部会通过 event-bus，传递参数给对应的组件
import { handlePageScroll } from 'tdesign-uniapp/mixins/page-scroll';

export default {
  onPageScroll(e) {
    handlePageScroll(e);
  },
}
```
