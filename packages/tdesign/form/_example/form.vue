<template>
  <view class="tdesign-mobile-demo">
    <!-- #ifndef MP-ALIPAY -->
    <t-navbar
      class="demo-navbar"
      title="Form"
      left-arrow
    />
    <!-- #endif -->
    <t-demo-header
      title="Form 表单"
      desc="用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。"
      notice="渲染框架支持情况：Skyline、WebView"
    />
    <t-demo
      title="01 组件类型"
      desc="基础表单"
    >
      <view class="option">
        <view class="select-button-group">
          <t-button
            :theme="isActive1 ? 'light' : 'default'"
            shape="round"
            data-name="isActive1"
            @click="() => onClick()"
          >
            水平排布
          </t-button>
          <t-button
            :theme="isActive2 ? 'light' : 'default'"
            shape="round"
            data-name="isActive2"
            @click="() => onClick()"
          >
            竖向排布
          </t-button>
        </view>
      </view>
    </t-demo>

    <view v-if="isActive1">
      <Horizontal :disabled="switchValue" />
    </view>

    <view v-if="isActive2">
      <Vertical :disabled="switchValue" />
    </view>
  </view>
</template>

<script lang="ts">

import Horizontal from './horizontal/index.vue';
import Vertical from './vertical/index.vue';

export default {
  components: {
    Horizontal,
    Vertical,
  },
  data() {
    return {
      isActive1: true,
      switchValue: false,
    };
  },
  computed: {
    isActive2() {
      return !this.isActive1;
    },
  },
  methods: {
    onClick() {
      this.isActive1 = !this.isActive1;
    },
  },
};
</script>
<style lang="less">
@import './form.less';
</style>
