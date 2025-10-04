<template>
  <view class="wrapper">
    <t-skeleton
      :row-col="grid"
      loading
    />
  </view>
</template>

<script>
import tSkeleton from 'tdesign-uniapp/skeleton/skeleton';
export default {
  components: {
    tSkeleton,
  },
  data() {
    return {
      grid: [
        [
          {
            width: '96rpx',
            height: '96rpx',
            borderRadius: '12rpx',
          },
          {
            width: '96rpx',
            height: '96rpx',
            borderRadius: '12rpx',
          },
          {
            width: '96rpx',
            height: '96rpx',
            borderRadius: '12rpx',
          },
          {
            width: '96rpx',
            height: '96rpx',
            borderRadius: '12rpx',
          },
          {
            width: '96rpx',
            height: '96rpx',
            borderRadius: '12rpx',
          },
        ],
        [
          {
            width: '96rpx',
            height: '32rpx',
            borderRadius: '6rpx',
          },
          {
            width: '96rpx',
            height: '32rpx',
            borderRadius: '6rpx',
          },
          {
            width: '96rpx',
            height: '32rpx',
            borderRadius: '6rpx',
          },
          {
            width: '96rpx',
            height: '32rpx',
            borderRadius: '6rpx',
          },
          {
            width: '96rpx',
            height: '32rpx',
            borderRadius: '6rpx',
          },
        ],
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
