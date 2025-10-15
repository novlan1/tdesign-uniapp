<template>
  <view class="input-example--bordered">
    <view class="input-example__label">
      标签文字
    </view>

    <t-input
      placeholder="请输入文字"
      :borderless="true"
      :custom-style="style"
      :suffix-icon="{ name: 'info-circle-filled', ariaLabel: '提示' }"
    />
  </view>
</template>

<script>
import tInput from 'tdesign-uniapp/input/input.vue';
export default {
  components: {
    tInput,
  },
  data() {
    return {
      style: 'border: 2rpx solid var(--td-component-border);border-radius: 12rpx;',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
