<template>
  <view>
    <radio-demo />
  </view>
</template>

<script lang="ts">

import tNavbar from 'tdesign-uniapp/navbar/navbar';
import radioDemo from '../radio';
export default {
  components: {
    tNavbar,
    radioDemo,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './radio.less';
</style>
