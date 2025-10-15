<template>
  <view>
    <view
      v-for="(animationItem, index) in animationList"
      :key="index"
    >
      <view class="demo-section__desc">
        {{ animationItem.title }}
      </view>

      <view class="demo-section__content">
        <t-skeleton
          theme="paragraph"
          :animation="animationItem.value"
          :loading="animationItem.loading"
        />
      </view>
    </view>
  </view>
</template>

<script>
import tSkeleton from 'tdesign-uniapp/skeleton/skeleton.vue';
export default {
  components: {
    tSkeleton,
  },
  data() {
    return {
      animationList: [
        {
          title: '渐变加载效果',
          value: 'gradient',
          loading: true,
        },
        {
          title: '闪烁加载效果',
          value: 'flashed',
          loading: true,
        },
      ],

      animationItem: {
        title: '',
        value: '',
        loading: '',
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
