<template>
  <view class="loading-container-flex">
    <t-loading
      v-if="!skylineRender"
      theme="circular"
      size="40rpx"
      extra-class="wrapper"
    />
    <t-loading
      theme="spinner"
      size="40rpx"
      extra-class="wrapper"
    />
    <t-loading
      theme="dots"
      size="80rpx"
      extra-class="wrapper"
    />
    <t-loading
      theme="custom"
      extra-class="wrapper"
    >
      <template
        #indicator
      >
        <t-image
          style="width: 100%; height: 100%"
          src="https://tdesign.gtimg.com/mobile/demos/logo2.png"
        />
      </template>
    </t-loading>
  </view>
</template>

<script>
import tLoading from 'tdesign-uniapp/loading/loading';
import tImage from 'tdesign-uniapp/image/image';
import SkylineBehavior from 'tdesign-site/src/mixins/skyline.js';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tLoading,
    tImage,
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
