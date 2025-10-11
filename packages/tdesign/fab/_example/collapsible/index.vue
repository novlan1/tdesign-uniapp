<template>
  <view>
    <t-fab
      :custom-style="scrolling ? 'right: 0;bottom:64px;' : 'right:16px; bottom:24px'"
      @click="handleClick"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      <view
        v-if="!scrolling"
        class="wrap"
      >
        <view class="item">
          <t-icon
            name="add-circle"
            size="20"
          />
          <view class="text">
            添加
          </view>
        </view>
        <view class="item">
          <t-icon
            name="star"
            size="20"
          />
          <view class="text">
            收藏
          </view>
        </view>
        <view class="item">
          <t-icon
            name="jump"
            size="20"
          />
          <view class="text">
            分享
          </view>
        </view>
      </view>
      <view
        v-else
        class="symbol"
      >
        <t-icon
          name="chevron-left"
          size="20"
        />
      </view>
    </t-fab>
  </view>
</template>

<script>
import tFab from 'tdesign-uniapp/fab/fab.vue';
import tIcon from 'tdesign-uniapp/icon/icon.vue';
import pageScrollMixin from 'tdesign-uniapp/mixins/page-scroll';
export default {
  components: {
    tFab,
    tIcon,
  },
  mixins: [pageScrollMixin()],
  data() {
    return {
      scrolling: false,
      timer: null,
    };
  },
  created() {},
  methods: {
    handleClick(e) {
      console.log('handleClick: ', e);
    },
    handleDragStart(e) {
      console.log('handleDragStart: ', e);
    },
    handleDragEnd(e) {
      console.log('handleDragEnd: ', e);
    },
    onScroll() {
      clearTimeout(this.timer);
      this.scrolling = true,
      this.timer = setTimeout(() => {
        this.scrolling = false;
      }, 100);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
