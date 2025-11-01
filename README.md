# TDesign Uni App

> TDesign is an artwork.

TDesign 在 uni-app 的适配方案。

## 安装

### NPM 方式

```bash
pnpm i tdesign-uniapp
```

### UNI_MODULES 方式

已上传[插件](https://ext.dcloud.net.cn/plugin?id=25431)到 DCloud 插件市场，请打开插件详情页并点击`使用 HBuilderX 导入插件`。

## 使用

1. `main.ts` 中引入样式文件

```ts
import 'tdesign-uniapp/common/style/theme/index.css';
```

2. 在文件中使用

```vue
<template>
  <t-loading />
</template>

<script lang="ts" setup>
import TLoading from 'tdesign-uniapp/loading/loading.vue';
</script>
```

## 预览

https://uwayfly.com/tdesign-uniapp/

<img src="./packages/demo/docs/img/github-pages.png" width="260" />

<img src="./packages/demo/docs/img/tdesign-uniapp-mp.png" width="260" />

## 支持平台

|Vue2|Vue3|H5|Android|iOS|app-nvue|微信小程序|QQ小程序|
|---|---|---|---|---|---|---|---|
|<p align="center">√</p>|<p align="center">√</p>|<p align="center">√</p>|<p align="center">√</p>|<p align="center">√</p>|<p align="center">_</p>|<p align="center">√</p>|<p align="center">√</p>|

|支付宝小程序|抖音小程序|百度小程序|快手小程序|小红书小程序|京东小程序|
|---|---|---|---|---|---|
|<p align="center">√</p>|<p align="center">√</p>|<p align="center">√</p>|<p align="center">√</p>|<p align="center">√</p>|<p align="center">√</p>|

## 注意

1. 提供的是源码，Vue2 下需配置 `transpileDependencies`
2. 理论上同时支持 Vue2 和 Vue3，有不符合预期的可以提 `issue`

## FAQ

### 为什么不提供转换工具

这里只提供转换后的产物，而非转换工具。原因在于业务方真正使用的是组件库，真正在意的应该是组件库。也正因为如此，`tdesign-uniapp` 会将转换产物纳入 `git`，每次发布都会对比 `diff`，保证每次发布可控、可靠，后面也会通过单元测试等保证质量。

### 与 tdesign-miniprogram 版本关系

`tdesign-uniapp` 有独立的版本，并不与 `tdesign-miniprogram` 的版本相同。这是因为转换后的产物很有可能有自己的 `feature/bug`，处理需要发版，必然导致版本分叉。

多个 `tdesign-uniapp` 版本会对应一个 `tdesign-miniprogram` 版本，我们会尽量提供对应 `miniprogram`  最新版本的转换产物。
