<template>
  <view class="demo-closable">
    <t-tag
      v-if="show[0]"
      t-class="margin-16"
      closable
      variant="light"
      @close="handleClose0"
    >
      文字标签
    </t-tag>
    <t-tag
      v-if="show[1]"
      t-class="margin-16"
      closable
      variant="outline"
      @close="handleClose1"
    >
      文字标签
    </t-tag>
  </view>
</template>

<script>
import tTag from 'tdesign-uniapp/tag/tag.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tTag,
  },
  data() {
    return {
      show: [true, true],
    };
  },
  created() {},
  methods: {
    handleClose0() {
      this.show[0] = false;
    },
    handleClose1() {
      this.show[1] = false;
    },
  },
};
</script>
<style>
.demo-closable {
    margin-left: 32rpx;
}

.demo-closable :deep(.margin-16:not(:last-child)) {
    margin-right: 32rpx;
}
</style>
