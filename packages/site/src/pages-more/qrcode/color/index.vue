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
import tQrcode from 'tdesign-uniapp/qrcode/qrcode';
export default {
  components: {
    tQrcode,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
