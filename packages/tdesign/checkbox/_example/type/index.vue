<template>
  <view>
    <t-checkbox
      label="多选"
      icon="line"
      default-checked
    />

    <view
      style="height: 32rpx"
    />

    <t-checkbox
      label="多选"
      icon="rectangle"
      default-checked
    />

    <view
      style="height: 32rpx"
    />

    <t-checkbox
      value="checkbox1"
      label="图片图标"
      :icon="[activeImage, inActiveImage]"
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
    return {
      demoCheckbox2: ['checkbox2', 'checkbox3'],
      activeImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox-checked.png',
      inActiveImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox.png',
    };
  },
  created() {},
  /**
     * 组件的方法列表
     */
  methods: {
    onChange(event) {
      console.log('checkbox', event.value);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
