<template>
  <view class="container">
    <view class="button-group">
      <t-button 
        class="button" 
        variant="text" 
        :disabled="size <= minSize" 
        @tap="changeSize" 
        :data-step="-10"
      >
        - Smaller
      </t-button>
      <view class="line"></view>
      <t-button 
        class="button" 
        variant="text" 
        :disabled="size >= maxSize" 
        @tap="changeSize" 
        :data-step="10"
      >
        + Larger
      </t-button>
    </view>
    <view class="qrcode-container">
      <t-qrcode :size="size" value="https://tdesign.tencent.com/" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'QRCodeSize',
  data() {
    return {
      size: 160,
      minSize: 80,
      maxSize: 240,
    };
  },
  methods: {
    changeSize(e) {
      const step = e.currentTarget.dataset.step;
      const newSize = this.size + step;
      if (newSize >= this.minSize && newSize <= this.maxSize) {
        this.size = newSize;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
