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

运行时处理：

1. setData
2. 生命周期
3. data、props 等等
4. polyfill undefined `getRegExp` method

## 预览

https://novlan1.github.io/tdesign-uniapp/

## 注意

1. 提供的是源码，Vue2 下需配置 transpileDependencies
2. 理论上同时支持 Vue2 和 Vue3，有不符合预期的欢迎反馈
