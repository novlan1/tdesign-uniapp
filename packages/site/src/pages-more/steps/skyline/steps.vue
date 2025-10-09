<template>
  <view>
    <steps />
  </view>
</template>

<script lang="ts">

import tNavbar from 'tdesign-uniapp/navbar/navbar';
import steps from '../steps';
export default {
  components: {
    tNavbar,
    steps,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './steps.less';
</style>
