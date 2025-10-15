<template>
  <view>
    <t-loading
      :theme="skylineRender ? 'spinner' : 'circular'"
      size="52rpx"
      text="加载中..."
      t-class-text="text-l"
      :duration="2000 - duration"
    />
    <view class="slider-container">
      <t-slider
        t-class="slider-class"
        :value="duration"
        :min="100"
        :max="1500"
        label
        @change="durationChange"
      />
    </view>
  </view>
</template>

<script>
import tLoading from 'tdesign-uniapp/loading/loading.vue';
// import tSlider from 'tdesign-uniapp/slider/slider.vue';
// import SkylineBehavior from 'tdesign-site/src/mixins/skyline.js'
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tLoading,
    // tSlider,
  },
  //   mixins: [SkylineBehavior],
  data() {
    return {
      duration: 800,
      skylineRender: false,
    };
  },
  created() {},
  methods: {
    durationChange(e) {
      this.setData({
        duration: e.detail.value,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
