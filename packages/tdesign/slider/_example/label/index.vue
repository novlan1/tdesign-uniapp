<template>
  <view>
    <view class="wrapper">
      <t-slider
        :value="value"
        label="${value}"
        @change="handleChange"
      />
    </view>

    <view class="demo-desc">
      带数值双游标滑块
    </view>

    <view class="wrapper">
      <t-slider
        show-extreme-value
        label="${value}"
        :default-value="[40, 60]"
        range
      />
    </view>
  </view>
</template>

<script>
import tSlider from 'tdesign-uniapp/slider/slider';
export default {
  components: {
    tSlider,
  },
  data() {
    return {
      value: 35,
    };
  },
  created() {},
  methods: {
    handleChange(e) {
      this.value = e.value;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
