
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

小程序组件示例小程序，请使用微信扫码预览 ↓
<br/>

<img width="260" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2025/10/own_mike_5nFZmp27arnbwnjQ.png" />

## 安装

### 使用 NPM

```bash
npm i tdesign-uniapp -s
```

## 使用组件

`main.ts` 中引入样式文件

```ts
import 'tdesign-uniapp/common/style/theme/index.css';
```

然后在文件中引入自定义组件

```js
import TButton from 'tdesign-uniapp/button/button.vue';
```

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

## 基础库版本

最低基础库版本`^2.6.5`

## 反馈

有任何问题，建议通过 [Github issues](https://github.com/novlan1/tdesign-uniapp/issues) 反馈或扫码加入用户QQ群。

<img width="260" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2025/10/own_mike_tTcWreX2yj4Ztb2R.png" />

## 开源协议

TDesign 遵循 [MIT 协议](https://github.com/novlan1/tdesign-uniapp/LICENSE)。
