<template>
  <view>
    <view class="demo-desc">
      红点徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        dot
        class="wrapper"
        content="消息"
      />
      <t-badge
        dot
        :offset="[1, -1]"
        class="wrapper"
      >
        <t-icon
          name="notification"
          size="48rpx"
          aria-label="通知"
        />
      </t-badge>
      <t-badge
        dot
        :offset="[1, 1]"
        class="wrapper"
      >
        <t-button>按钮</t-button>
      </t-badge>
    </view>

    <view class="demo-desc">
      数字徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        count="8"
        content="消息"
        :offset="[4]"
        class="wrapper"
      />
      <t-badge
        count="2"
        :offset="[2, -2]"
        class="wrapper"
      >
        <t-icon
          name="notification"
          size="48rpx"
          aria-label="通知"
        />
      </t-badge>
      <t-badge
        count="8"
        :offset="[2, 2]"
        class="wrapper"
      >
        <t-button>按钮</t-button>
      </t-badge>
    </view>

    <view class="demo-desc">
      自定义徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        count="NEW"
        :offset="[0, 2]"
        aria-role="button"
      >
        <t-button
          icon="notification"
          aria-label="通知"
          shape="square"
          size="large"
        />
      </t-badge>
    </view>
  </view>
</template>

<script>
import tBadge from 'tdesign-uniapp/badge/badge';
import tIcon from 'tdesign-uniapp/icon/icon';
import tButton from 'tdesign-uniapp/button/button';
export default {
  components: {
    tBadge,
    tIcon,
    tButton,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
