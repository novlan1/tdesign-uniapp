<template>
  <view>
    <view
      v-for="(list, index) in formatList"
      :key="index"
      class="format-line"
    >
      <view
        v-for="(item, index1) in list"
        :key="index1"
        :class="'format-item ' + (curFormat === item ? 'active' : '')"
        :data-format="item"
        @tap.stop.prevent="clickFormat"
      >
        <t-icon
          v-if="curFormat === item"
          name="check"
          size="14"
          custom-style="position: absolute; top: 4rpx; left: 4rpx; color: #fff; z-index: 1;"
        />

        {{ item }}
      </view>
    </view>
    <t-color-picker
      enable-alpha
      type="multiple"
      :format="curFormat"
      :value="color"
      @change="onChange"
      @palette-bar-change="onPaletteBarChange"
    />
  </view>
</template>

<script>
import tColorPicker from 'tdesign-uniapp/color-picker/color-picker';
import tIcon from 'tdesign-uniapp/icon/icon';
export default {
  components: {
    tColorPicker,
    tIcon,
  },
  data() {
    return {
      curFormat: 'CSS',
      color: '#7bd60b',
      formatList: [
        ['CSS', 'HEX', 'RGB'],
        ['HSL', 'HSV', 'CMYK'],
      ],
      list: [],
    };
  },
  created() {},
  methods: {
    onChange(e) {
      console.log('change', e);
    },
    onPaletteBarChange(e) {
      console.log('onPaletteBarChange', e);
    },
    clickFormat(e) {
      this.curFormat = e.target.dataset.format;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
