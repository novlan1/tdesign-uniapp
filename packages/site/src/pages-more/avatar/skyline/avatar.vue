<template>
  <view>
    <demo-avatar />
  </view>
</template>

<script lang="ts">

import tNavbar from 'tdesign-uniapp/navbar/navbar';
import demoAvatar from '../avatar.vue';
export default {
  components: {
    tNavbar,
    demoAvatar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './avatar.less';
</style>
