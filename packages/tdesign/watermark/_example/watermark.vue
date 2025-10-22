<template>
  <view>
    <t-navbar title="Watermark" left-arrow />
    <view class="demo">
      <t-demo-header title="Watermark 水印" desc="给页面的某个区域加上水印。">
      </t-demo-header>
      <t-demo title="01 组件类型" desc="文字水印">
        <base-watermark />
      </t-demo>
      <t-demo desc="图片水印">
        <image-watermark />
      </t-demo>
      <t-demo desc="图片灰阶水印">
        <gray-watermark />
      </t-demo>
      <t-demo desc="多行图文水印">
        <multi-line-watermark />
      </t-demo>
      <t-demo desc="多行图文灰阶水印">
        <multi-line-gray-watermark />
      </t-demo>
      <t-demo desc="运动文字水印">
        <move-text-watermark />
      </t-demo>
      <t-demo desc="运动图片水印">
        <move-image-watermark />
      </t-demo>
      <t-demo title="02 组件样式">
        <layout />
      </t-demo>
    </view>
  </view>
</template>

<script lang="ts">
import baseWatermark from './base';
import imageWatermark from './image';
import grayWatermark from './gray';
import multiLineWatermark from './multi-line';
import multiLineGrayWatermark from './multi-line-gray';
import moveTextWatermark from './move-text';
import moveImageWatermark from './move-image';
import layout from './layout';

export default {
  components: {
    baseWatermark,
    imageWatermark,
    grayWatermark,
    multiLineWatermark,
    multiLineGrayWatermark,
    moveTextWatermark,
    moveImageWatermark,
    layout,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less"></style>
