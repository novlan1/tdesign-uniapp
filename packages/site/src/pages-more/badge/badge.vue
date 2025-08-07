<template>
  <view>
    <t-navbar
      title="Badge"
      left-arrow
    />
    <t-demo-header
      title="Badge 徽标"
      desc="用于告知用户，该区域的状态变化或者待处理任务的数量。"
      notice="渲染框架支持情况：Skyline、WebView"
    />
    <t-demo title="01 组件类型">
      <baseComp />
    </t-demo>
    <t-demo title="02 组件样式">
      <theme />
    </t-demo>
    <t-demo title="03 组件尺寸">
      <size />
    </t-demo>
  </view>
</template>

<script lang="ts">
import baseComp from './base';
import theme from './theme';
import size from './size';
export default {
  components: {
    baseComp,
    theme,
    size,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './badge.less';
</style>
