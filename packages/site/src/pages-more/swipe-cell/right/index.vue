<template>
  <view>
    <t-swipe-cell>
      <t-cell
        title="右滑单操作"
        note="辅助信息"
        :bordered="false"
      />
      <template
        #left
      >
        <view
          class="btn favor-btn"
          @tap="onChoice"
        >
          选择
        </view>
      </template>
    </t-swipe-cell>
  </view>
</template>

<script>
import tSwipeCell from 'tdesign-uniapp/swipe-cell/swipe-cell';
import tCell from 'tdesign-uniapp/cell/cell';
export default {
  components: {
    tSwipeCell,
    tCell,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onChoice() {
      uni.showToast({
        title: '你点击了选择',
        icon: 'none',
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
