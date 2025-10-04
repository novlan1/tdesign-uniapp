<template>
  <view class="loading-container-flex">
    <t-loading
      v-if="!skylineRender"
      theme="circular"
      size="40rpx"
      text="加载中..."
      class="wrapper"
    />
    <t-loading
      theme="spinner"
      size="40rpx"
      text="加载中..."
      inherit-color
      class="wrapper"
    />
  </view>
</template>

<script>
import tLoading from 'tdesign-uniapp/loading/loading';
// import SkylineBehavior from '@behaviors/skyline.js';
export default {
  components: {
    tLoading,
  },
  data() {
    return {
      skylineRender: '',
    };
  },
  created() {},
  // mixins: [SkylineBehavior],
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
