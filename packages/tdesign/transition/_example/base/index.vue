<template>
  <view>
    <t-button
      size="large"
      variant="outline"
      block
      theme="primary"
      @click="onTriggerClick"
    >
      Toggle
    </t-button>

    <t-transition
      :visible="visible"
      :style="style"
      :custom-style="customStyle"
    >
      <view class="block" />
    </t-transition>
  </view>
</template>

<script lang="ts">

import tButton from 'tdesign-uniapp/button/button';
import tTransition from 'tdesign-uniapp/transition/transition';
export default {
  components: {
    tButton,
    tTransition,
  },
  data() {
    return {
      visible: false,
      style: 'display:none',
      customStyle: 'font-size: 9px',
    };
  },
  created() {},
  methods: {
    onTriggerClick() {
      this.setData({
        visible: !this.visible,
      });
    },
    onClose() {
      this.setData({
        visible: false,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
