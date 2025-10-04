<template>
  <view class="skyline">
    <t-navbar
      class="demo-navbar"
      title="Progress"
      left-arrow
    />
    <scroll-view
      scroll-y
      type="list"
      class="scroll-view"
    >
      <view class="demo">
        <t-demo-header
          title="Progress 进度条"
          desc="用于展示任务当前的进度。"
          notice="渲染框架支持情况：Skyline、WebView"
        />
        <t-demo title="01 组件类型">
          <BaseDemo />
        </t-demo>
        <t-demo
          desc="过渡样式"
          padding
        >
          <transition />
        </t-demo>
        <t-demo
          desc="自定义颜色/圆角"
          padding
        >
          <custom />
        </t-demo>
        <t-demo
          title="02 组件状态"
          desc="线性进度条"
          padding
        >
          <line />
        </t-demo>
        <t-demo
          desc="百分比内显进度条"
          padding
        >
          <plump />
        </t-demo>
        <circle />
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">

import BaseDemo from './base/index.vue';
import transition from './transition/index.vue';
import custom from './custom/index.vue';
import line from './line/index.vue';
import plump from './plump/index.vue';
import circle from './circle/index.vue';
export default {
  components: {
    BaseDemo,
    transition,
    custom,
    line,
    plump,
    circle,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './progress.less';
</style>
