<template>
  <view class="button-example">
    <t-button
      theme="primary"
      icon="app"
      content="填充按钮"
      size="large"
    />
    <t-button
      v-if="skylineRender"
      theme="light"
      size="large"
    >
      <t-loading
        t-class="loading"
        theme="spinner"
        size="40rpx"
        text="加载中..."
      />
    </t-button>
    <t-button
      v-else
      theme="primary"
      size="large"
      loading
    >
      加载中
    </t-button>
    <t-button
      theme="primary"
      icon="search"
      shape="square"
      size="large"
      aria-label="搜索"
    />
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tLoading from 'tdesign-uniapp/loading/loading';
import SkylineBehavior from '@behaviors/skyline.js';
export default {
  components: {
    tButton,
    tLoading,
  },
  mixins: [SkylineBehavior],
  data() {
    return {
      skylineRender: '',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
