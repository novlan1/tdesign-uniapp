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

1. 安装 `tdesign-uniapp`

```bash
npm i tdesign-uniapp -s
```

2. `main.ts` 中引入样式文件

```js
import 'tdesign-uniapp/common/style/theme/index.css';
```

3. 文件中使用

```html
<template>
  <t-loading />
</template>

<script lang="ts" setup>
import TLoading from 'tdesign-uniapp/loading/loading';
</script>
```

### UNI_MODULES 方式

敬请期待

## 支持平台

目前支持

1. H5
2. 微信小程序

其他平台陆续支持中，欢迎共建。

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

最低基础库版本`^2.12.0`

### 组件与小程序基础库版本对应关系

| 组件   | API                                                                                                                                        | 最低基础库 | 描述 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---- |
| Upload | [wx.previewMedia](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewMedia.html)                                   | 2.12.0     | -    |
| Upload | [wx.chooseMedia](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)                                     | 2.10.0     | -    |
| Upload | [wx.chooseMessageFile](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html)                         | 2.5.0      | -    |
| Navbar | [wx.getMenuButtonBoundingClientRect](https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html) | 2.1.0      | -    |

