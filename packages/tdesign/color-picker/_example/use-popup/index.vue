<template>
  <view>
    <t-color-picker
      :visible="visible"
      use-popup
      enable-alpha
      type="multiple"
      @change="onChange"
      @palette-bar-change="onPaletteBarChange"
    />

    <t-button
      block
      size="large"
      variant="outline"
      theme="primary"
      t-class="wrapper"
      @click="handlePopup"
    >
      弹窗形式的颜色选择器
    </t-button>
  </view>
</template>

<script>
import tColorPicker from 'tdesign-uniapp/color-picker/color-picker';
import tPopup from 'tdesign-uniapp/popup/popup';
export default {
  components: {
    tColorPicker,
    tPopup,
  },
  data() {
    return {
      visible: false,
    };
  },
  created() {},
  methods: {
    onChange(e) {
      console.log('change', e.detail);
    },
    handlePopup() {
      this.setData({
        visible: true,
      });
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
