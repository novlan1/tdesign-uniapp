<template>
  <t-qrcode
    value="https://tdesign.tencent.com/"
    :borderless="true"
  />
</template>

<script>

export default {
  name: 'QRCodeBorderless',
  components: {
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
