<template>
  <view>
    <t-navbar
      title="Transition"
      left-arrow
    />
    <view class="demo">
      <view class="demo-title">
        Transition 过渡
      </view>
      <view class="demo-desc">
        过渡。
      </view>
      <t-demo
        title="01 组件类型"
        desc="基础示例"
        padding
      >
        <BaseDemo />
      </t-demo>
      <t-demo
        desc="自定义动画"
        padding
      >
        <custom />
      </t-demo>
      <t-demo
        desc="首次出现动画"
        padding
      >
        <appear />
      </t-demo>
      <t-demo
        desc="隐藏不渲染"
        padding
      >
        <destroy />
      </t-demo>
    </view>
  </view>
</template>

<script lang="ts">

import BaseDemo from './base';
import custom from './custom';
import destroy from './destroy';
import appear from './appear';
export default {
  components: {
    BaseDemo,
    custom,
    destroy,
    appear,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onTriggerClick() {
      this.visible = !this.visible;
    },
  },
};
</script>
<style lang="less">
@import './transition.less';
</style>
