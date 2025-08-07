# TDesign Uni App

TDesign 在 uni-app 的适配方案。

## Usage

### NPM 方式

1. Install `tdesign-uniapp`

```bash
pnpm i tdesign-uniapp
```

2. Import in Your Pages/Components

```vue
<template>
  <t-loading />
</template>

<script lang="ts" setup>
import TLoading from 'tdesign-uniapp/loading/loading';
</script>
```

### UNI_MODULES 方式

敬请期待

## 原理

编译时处理 + 运行时 polyfill。

编译时处理：

1. wxml/js/wxss/json 等文件合成 vue 文件
2. 处理小程序与 uni-app 语法差异部分

运行时处理：

1. setData
2. 生命周期
3. data、props 等等
4. polyfill undefined `getRegExp` method

## 预览

https://novlan1.github.io/tdesign-uniapp/

<img src="./packages/site/docs/img/github-pages.png" width="300" />

## 注意

1. 提供的是源码，Vue2 下需配置 transpileDependencies
2. 理论上同时支持 Vue2 和 Vue3，有不符合预期的欢迎反馈

## FAQ

### 为什么不提供转换工具

这里只提供转换后的产物，而非转换工具。原因在于业务方真正使用的是组件库，真正在意的应该是组件库。也正因为如此，`tdesign-uniapp` 会将转换产物纳入 `git`，每次发布都会对比 `diff`，保证每次发布可控、可靠，后面也会通过单元测试等保证质量。

### 与 tdesign-miniprogram 版本关系

`tdesign-uniapp` 有独立的版本，并不与 `tdesign-miniprogram` 的版本相同。这是因为转换后的产物很有可能有自己的 `feature/bug`，处理需要发版，必然导致版本分叉。

多个 `tdesign-uniapp` 版本会对应一个 `tdesign-miniprogram` 版本，我们会尽量提供对应 `miniprogram`  最新版本的转换产物。
