<template>
  <view class="wrapper">
    <t-slider
      range
      :default-value="[35, 65]"
      @dragstart="onDragstart"
      @dragend="onDragend"
    />
  </view>
</template>

<script>
import tSlider from 'tdesign-uniapp/slider/slider';
export default {
  components: {
    tSlider,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onDragstart(e) {
      console.log('dragstart', e.detail);
    },
    onDragend(e) {
      console.log('dragend', e.detail);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
