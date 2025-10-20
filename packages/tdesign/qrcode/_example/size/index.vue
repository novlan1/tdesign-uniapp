<template>
  <view class="container">
    <view class="button-group">
      <t-button
        class="button"
        variant="text"
        :disabled="size <= minSize"
        :data-step="-10"
        @tap="changeSize"
      >
        - Smaller
      </t-button>
      <view class="line" />
      <t-button
        class="button"
        variant="text"
        :disabled="size >= maxSize"
        :data-step="10"
        @tap="changeSize"
      >
        + Larger
      </t-button>
    </view>
    <view class="qrcode-container">
      <t-qrcode
        :size="size"
        value="https://tdesign.tencent.com/"
      />
    </view>
  </view>
</template>

<script>
import TButton from 'tdesign-uniapp/button/button.vue';
import TQrcode from 'tdesign-uniapp/qrcode/qrcode.vue';

export default {
  name: 'QRCodeSize',
  components: {
    TButton,
    TQrcode,
  },
  data() {
    return {
      size: 160,
      minSize: 80,
      maxSize: 240,
    };
  },
  methods: {
    changeSize(e) {
      const { step } = e.currentTarget.dataset;
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
