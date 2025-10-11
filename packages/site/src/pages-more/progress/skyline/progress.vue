<template>
  <view>
    <demo-progress />
  </view>
</template>

<script lang="ts">

import tNavbar from 'tdesign-uniapp/navbar/navbar.vue';
import demoProgress from '../progress';
export default {
  components: {
    tNavbar,
    demoProgress,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './progress.less';
</style>
