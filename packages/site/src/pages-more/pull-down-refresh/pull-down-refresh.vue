<template>
  <view>
    <t-navbar
      class="demo-navbar"
      title="PullDownRefresh"
      left-arrow
    />
    <BaseDemo />
  </view>
</template>

<script lang="ts">

import BaseDemo from './base';
export default {
  components: {
    BaseDemo,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './pull-down-refresh.less';
</style>
