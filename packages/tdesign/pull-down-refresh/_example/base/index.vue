<template>
  <view>
    <t-pull-down-refresh
      :value="enable"
      :loading-texts="['下拉刷新', '松手刷新', '正在刷新', '刷新完成']"
      using-custom-navbar
      @refresh="onRefresh"
      @scroll="onScroll"
    >
      <!-- 包裹页面全部内容 -->
      <view class="demo">
        <t-demo-header
          title="PullDownRefresh 下拉刷新"
          desc="用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。"
          notice="渲染框架支持情况：WebView"
        />
        <view class="pulldown-refresh__content">
          <t-skeleton
            :row-col="rowCol1"
            loading
          />
          <view class="row">
            <t-skeleton
              :row-col="rowCol2"
              loading
            />
            <t-skeleton
              :row-col="rowCol2"
              loading
            />
          </view>
          <view class="row">
            <t-skeleton
              :row-col="rowCol2"
              loading
            />
            <t-skeleton
              :row-col="rowCol2"
              loading
            />
          </view>
          <view class="row">
            <t-skeleton
              :row-col="rowCol2"
              loading
            />
            <t-skeleton
              :row-col="rowCol2"
              loading
            />
          </view>
          <view class="text">
            拖拽该区域演示 顶部下拉刷新
          </view>
        </view>
        <t-back-top
          text="顶部"
          :scroll-top="scrollTop"
          :visibility-height="100"
        />
      </view>
    </t-pull-down-refresh>
  </view>
</template>

<script>
import tPullDownRefresh from 'tdesign-uniapp/pull-down-refresh/pull-down-refresh.vue';
import tSkeleton from 'tdesign-uniapp/skeleton/skeleton.vue';
import tBackTop from 'tdesign-uniapp/back-top/back-top.vue';
export default {
  components: {
    tPullDownRefresh,
    tSkeleton,
    tBackTop,
  },
  data() {
    return {
      enable: false,
      rowCol1: [
        {
          width: '100%',
          height: '342rpx',
          borderRadius: '24rpx',
        },
      ],
      rowCol2: [
        [
          {
            width: '327rpx',
          },
        ],
        [
          {
            width: '200rpx',
          },
        ],
        [
          {
            size: '327rpx',
            borderRadius: '24rpx',
          },
        ],
      ],
      scrollTop: 0,
    };
  },
  mounted() {
    // 处理小程序 ready 生命周期
    this.$nextTick(() => this.ready());
  },
  created() {},
  methods: {
    ready() {
      this.enable = true;
      setTimeout(() => {
        this.enable = false;
      }, 1000);
    },

    onRefresh() {
      this.enable = true;
      setTimeout(() => {
        this.enable = false;
      }, 1500);
    },

    onScroll(e) {
      const { scrollTop } = e;
      this.scrollTop = scrollTop;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
