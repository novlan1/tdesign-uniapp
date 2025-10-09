<template>
  <view class="stepper-example">
    <t-stepper
      :value="value"
      size="large"
      theme="filled"
      @change="handleChange"
    />
    <t-stepper
      default-value="3"
      max="99"
      theme="filled"
    />
    <t-stepper
      default-value="3"
      size="small"
      theme="filled"
    />
  </view>
</template>

<script>
import tCell from 'tdesign-uniapp/cell/cell';
import tStepper from 'tdesign-uniapp/stepper/stepper';
export default {
  components: {
    tCell,
    tStepper,
  },
  data() {
    return {
      value: 3,
    };
  },
  created() {},
  methods: {
    handleChange(e) {
      const { value } = e.detail;
      console.log(value);
      this.setData({
        value,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
