<template>
  <view class="demo-rate">
    <view class="rate-wrapper">
      <t-rate
        :value="value"
        size="60rpx"
        :texts="texts"
        @change="onChange"
      />
    </view>
    <view :class="'desc desc--' + (value > 3 ? 'active' : '')">
      {{ texts[value - 1] }}
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
      value: 4,
      texts: ['非常糟糕', '有些糟糕', '可以尝试', '可以前往', '推荐前往'],
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
