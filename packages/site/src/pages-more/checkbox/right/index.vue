<template>
  <view>
    <t-checkbox
      value="1"
      label="多选"
      default-checked
    />

    <view
      style="height: 32rpx"
    />

    <t-checkbox
      value="2"
      label="多选"
      placement="right"
      default-checked
    />
  </view>
</template>

<script>
import tCheckbox from 'tdesign-uniapp/checkbox/checkbox.vue';
export default {
  components: {
    tCheckbox,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
