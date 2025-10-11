<template>
  <view>
    <t-navbar
      t-class-placeholder="t-navbar-placeholder"
      t-class-content="t-navbar-content"
      title="标题文字"
    >
      <template
        #capsule
      >
        <view
          class="custom-capsule"
        >
          <t-icon
            size="40rpx"
            aria-role="button"
            aria-label="返回"
            name="chevron-left"
            class="custom-capsule__icon back"
            @click="onBack"
          />
          <t-icon
            size="40rpx"
            aria-role="button"
            aria-label="首页"
            name="home"
            class="custom-capsule__icon home"
            @click="onGoHome"
          />
        </view>
      </template>
    </t-navbar>
  </view>
</template>

<script>
import tNavbar from 'tdesign-uniapp/navbar/navbar.vue';
import tIcon from 'tdesign-uniapp/icon/icon';
export default {
  components: {
    tNavbar,
    tIcon,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onBack() {
      uni.navigateBack();
    },
    onGoHome() {
      uni.reLaunch({
        url: '/pages/home/home',
      });
    },
  },
};
</script>
<style scoped>
@import './index.css';
</style>
