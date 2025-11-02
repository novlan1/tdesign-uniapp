
<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/novlan1/tdesign-uniapp/blob/develop/LICENSE">
    <img src="https://img.shields.io/npm/l/tdesign-uniapp.svg?sanitize=true" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-uniapp">
    <img src="https://img.shields.io/npm/v/tdesign-uniapp.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-uniapp">
    <img src="https://img.shields.io/npm/dm/tdesign-uniapp" alt="Downloads">
  </a>
</p>

[TDesign](https://github.com/Tencent/tdesign) 适配 [uniapp](https://uniapp.dcloud.net.cn/) 的组件库。

## 预览

扫码查看 ↓

<img src="https://cdn.uwayfly.com/tdesign-uniapp/tdesign-uniapp-qrcodes.png?a=3" width="600" />

（注：其他平台同样支持，仅因平台审核等原因未能上架预览，不影响组件库正常使用。）

## 安装

### NPM 方式

```bash
npm i tdesign-uniapp
```

### UNI_MODULES 方式

已上传 [插件](https://ext.dcloud.net.cn/plugin?id=25431) 到 DCloud 插件市场，请打开插件详情页并点击`使用 HBuilderX 导入插件`。

## 使用

1. 在 `main.ts` 中引入样式文件

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

## 平台兼容性

| 平台         | Vue2 | Vue3 | H5  | Android | iOS | App-nvue | 微信小程序 | QQ小程序 |
| ------------ | ---- | ---- | --- | ------- | --- | -------- | ---------- | -------- |
| **支持情况** | ✅    | ✅    | ✅   | ✅       | ✅   | ⚠️        | ✅          | ✅        |

| 平台         | 支付宝小程序 | 抖音小程序 | 百度小程序 | 快手小程序 | 小红书小程序 | 京东小程序 |
| ------------ | ------------ | ---------- | ---------- | ---------- | ------------ | ---------- |
| **支持情况** | ✅            | ✅          | ✅          | ✅          | ✅            | ✅          |

## 反馈

有任何问题，建议通过 [Github issues](https://github.com/novlan1/tdesign-uniapp/issues) 反馈或扫码加入用户微信群。

<img src="https://raw.githubusercontent.com/Tencent/tdesign/main/packages/site-components/src/images/groups/wx-group.png" width="200" />

## 开源协议

TDesign 遵循 [MIT 协议](https://github.com/novlan1/tdesign-uniapp/blob/develop/LICENSE)。
