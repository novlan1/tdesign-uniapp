<template>
  <view>
    <view class="demo-desc">
      只可选全星时
    </view>

    <view class="demo-rate">
      <view class="demo-rate__title">
        点击或滑动
      </view>
      <t-rate
        :value="value"
        @change="onChange"
      />
    </view>

    <view class="demo-desc">
      只可选半星时
    </view>

    <view class="demo-rate">
      <view class="demo-rate__title">
        点击或滑动
      </view>
      <t-rate
        :default-value="3"
        allow-half
      />
    </view>
  </view>
</template>

<script>
import tRate from 'tdesign-uniapp/rate/rate';
export default {
  components: {
    tRate,
  },
  data() {
    return {
      value: 3.5,
    };
  },
  created() {},
  methods: {
    onChange(e) {
      const { value } = e;
      this.value = value;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
