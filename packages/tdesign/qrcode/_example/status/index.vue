<template>
  <view>
    <t-qrcode value="https://tdesign.tencent.com/" status="active" @refresh="handleRefresh" />

    <view class="demo-summary">expired</view>
    <t-qrcode value="https://tdesign.tencent.com/" status="expired" @refresh="handleRefresh" />

    <view class="demo-summary">loading</view>
    <t-qrcode value="https://tdesign.tencent.com/" status="loading" @refresh="handleRefresh" />

    <view class="demo-summary">scanned</view>
    <t-qrcode value="https://tdesign.tencent.com/" status="scanned" @refresh="handleRefresh" />
  </view>
</template>

<script>
export default {
  name: 'QRCodeStatus',
  methods: {
    handleRefresh() {
      console.log('Click Refresh');
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
