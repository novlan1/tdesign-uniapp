<template>
  <view>
    <t-navbar class="demo-navbar"
title="Footer" left-arrow />
    <t-demo-header title="Footer 页脚"
desc="用于基础列表展示，可附带文字、品牌logo、操作，常用商详、个人中心、设置等页面。" notice="渲染框架支持情况：Skyline、WebView" />
    <t-demo title="01 类型"
desc="基础页脚">
      <BaseDemo />
    </t-demo>
    <t-demo desc="基础加链接页脚">
      <link >
    </t-demo>
    <t-demo desc="品牌页脚">
      <logo />
    </t-demo>
  </view>
</template>

<script lang="ts">

import BaseDemo from './base';
import link from './link';
import logo from './logo';
export default {
  components: {
    BaseDemo,
    link,
    logo,
    },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './footer.less';
</style>
