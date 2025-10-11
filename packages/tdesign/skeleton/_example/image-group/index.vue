<template>
  <view class="group">
    <t-skeleton
      :row-col="rowCol"
      loading
    />
    <t-skeleton
      :row-col="rowCol"
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
      rowCol: [
        {
          size: '327rpx',
          borderRadius: '24rpx',
        },
        1,
        {
          width: '61%',
        },
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
