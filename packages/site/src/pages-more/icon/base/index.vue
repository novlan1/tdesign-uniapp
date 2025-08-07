<template>
  <view class="demo__list">
    <view
      v-for="(item, index) in icons"
      :key="index"
      class="demo__card"
    >
      <t-icon
        :name="item"
        size="48rpx"
        :data-name="item"
        @click="onIconTap($event, { name: item })"
      />

      <view class="demo__card-name">
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script>
import tIcon from 'tdesign-uniapp/icon/icon';
import icons from '../data';
export default {
  components: {
    tIcon,
  },
  data() {
    return {
      icons,
    };
  },
  created() {},
  methods: {
    onIconTap(event, _dataset) {
      /* ---处理dataset begin--- */
      this.handleDataset(event, _dataset);
      /* ---处理dataset end--- */
      const { name, type } = event.currentTarget.dataset;
      if (type === 'prefix') {
        return;
      }
      uni.showToast({
        title: name,
        icon: 'none',
        duration: 1000,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
