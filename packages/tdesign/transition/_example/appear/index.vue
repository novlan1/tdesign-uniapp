<template>
  <view>
    <t-button
      size="large"
      variant="outline"
      block
      theme="primary"
      @click="onTriggerClick"
    >
      Toggle attach
    </t-button>

    <view v-if="visible">
      <t-transition
        visible
        appear
      >
        <view class="block" />
      </t-transition>
    </view>
  </view>
</template>

<script lang="ts">

import tButton from 'tdesign-uniapp/button/button.vue';
import tTransition from 'tdesign-uniapp/transition/transition.vue';
export default {
  components: {
    tButton,
    tTransition,
  },
  data() {
    return {
      visible: false,
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
</style>
