<template>
  <view>
    <view class="button-example">
      <t-button
        theme="primary"
        size="large"
      >
        填充按钮
      </t-button>
      <t-button
        theme="primary"
        size="large"
        icon="search"
        shape="square"
        aria-label="搜索"
      />
      <t-button
        theme="primary"
        size="large"
        shape="round"
      >
        填充按钮
      </t-button>
      <t-button
        theme="primary"
        size="large"
        icon="search"
        shape="circle"
        aria-label="搜索"
      />
    </view>

    <t-button
      theme="primary"
      size="large"
      block
      t-class="external-class"
    >
      填充按钮
    </t-button>
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tButton,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.button-example {
    display: flex;
    justify-content: space-between;
    margin: 0 32rpx 32rpx;
}

:deep(.external-class) {
    border-radius: 0 !important;
}
</style>
