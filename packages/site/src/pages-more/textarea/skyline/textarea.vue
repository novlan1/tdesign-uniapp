<template>
  <view>
    <textarea-demo />
  </view>
</template>

<script lang="ts">

import tNavbar from 'tdesign-uniapp/navbar/navbar';
import textareaDemo from '../textarea';
export default {
  components: {
    tNavbar,
    textareaDemo,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less">
@import './textarea.less';
</style>
