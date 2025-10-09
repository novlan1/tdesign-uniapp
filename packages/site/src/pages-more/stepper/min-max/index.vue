<template>
  <view class="stepper-example">
    <t-stepper
      default-value="0"
      theme="filled"
    />
    <t-stepper
      default-value="99"
      theme="filled"
      min="5"
      max="999"
    />
    <t-stepper
      default-value="999"
      theme="filled"
      max="999"
    />
  </view>
</template>

<script>
import tStepper from 'tdesign-uniapp/stepper/stepper';
export default {
  components: {
    tStepper,
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
