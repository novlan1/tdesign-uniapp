<template>
  <view>
    <t-radio
      value="radio1"
      allow-uncheck
      label="单选"
      default-checked
    />

    <view class="block" />

    <t-radio
      value="radio2"
      allow-uncheck
      label="单选"
      placement="right"
      default-checked
    />
  </view>
</template>

<script>
import tRadio from 'tdesign-uniapp/radio/radio';
export default {
  components: {
    tRadio,
  },
  /**
     * 组件的属性列表
     */
  props: {},
  data() {
    return {};
  },
  created() {},
  /**
     * 组件的方法列表
     */
  methods: {
    onChange(event) {
      console.log('radio', event.detail);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
