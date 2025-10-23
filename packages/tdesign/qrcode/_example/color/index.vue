<template>
  <view>
    <t-qrcode
      value="https://tdesign.tencent.com/"
      level="M"
      status="active"
      color="#0052D9"
      bg-color="#fff"
    />

    <view class="demo-summary">
      二维码背景颜色
    </view>

    <t-qrcode
      value="https://tdesign.tencent.com/"
      level="M"
      status="active"
      color="#0052D9"
      bg-color="#D9E1FF"
    />
  </view>
</template>

<script>
export default {
  name: 'QRCodeColor',
  components: {
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
