<template>
  <view class="input-example custom-theme">
    <t-input
      label="标签文字"
      placeholder="请输入文字"
    />
  </view>
</template>

<script>
import tInput from 'tdesign-uniapp/input/input';
export default {
  components: {
    tInput,
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
