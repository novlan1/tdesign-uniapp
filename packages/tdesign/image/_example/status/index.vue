<template>
  <view>
    <view class="tr">
      <view class="col">
        <view class="text">
          加载默认提示
        </view>
        <t-image
          id="loading-img"
          shape="round"
          width="72"
          height="72"
        />
      </view>
      <view class="col">
        <view class="text">
          加载自定义提示
        </view>
        <t-image
          id="loading-img-custom"
          shape="round"
          loading="slot"
          width="72"
          height="72"
        >
          <template #loading>
            <t-loading
              theme="spinner"
              size="40rpx"
              loading
            />
          </template>
        </t-image>
      </view>
    </view>

    <view class="tr">
      <view class="col">
        <view class="text">
          失败默认提示
        </view>
        <t-image
          id="loading-img"
          shape="round"
          src="a"
          width="72"
          height="72"
        />
      </view>
      <view class="col">
        <view class="text">
          失败自定义提示
        </view>
        <t-image
          src="a"
          shape="round"
          error="slot"
          width="72"
          height="72"
        >
          <template #error>
            <text
              class="error-text"
            >
              加载失败
            </text>
          </template>
        </t-image>
      </view>
    </view>
  </view>
</template>

<script>
import tImage from 'tdesign-uniapp/image/image';
import tLoading from 'tdesign-uniapp/loading/loading';
export default {
  components: {
    tImage,
    tLoading,
  },
  data() {
    return {
      isLoading: false,
      isFailed: false,
    };
  },
  created() {},
  methods: {
    handlePageShow() {
      const $ele1 = this.zpSelectComponent('#loading-img');
      const $ele2 = this.zpSelectComponent('#loading-img-custom');
      this.setLoadingStatus($ele1);
      this.setLoadingStatus($ele2);
    },

    setLoadingStatus(ele) {
      ele.onLoadError = null;
      ele.onLoaded = null;
      ele.setData({
        isLoading: true,
        isFailed: false,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
