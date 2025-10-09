<template>
  <view>
    <t-color-picker
      enable-alpha
      type="multiple"
      @change="onChange"
      @palette-bar-change="onPaletteBarChange"
    />
  </view>
</template>

<script>
import tColorPicker from 'tdesign-uniapp/color-picker/color-picker';
export default {
  components: {
    tColorPicker,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onChange(e) {
      console.log('change', e.detail);
    },
    onPaletteBarChange(e) {
      console.log('onPaletteBarChange', e.detail);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
