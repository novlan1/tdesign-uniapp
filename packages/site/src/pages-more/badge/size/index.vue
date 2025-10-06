<template>
  <view>
    <view class="demo-desc">
      Large
    </view>

    <view class="block">
      <t-avatar
        icon="user"
        size="large"
        :badge-props="{count: 8, size: 'large', offset: [7, 7]}"
      />
    </view>

    <view class="demo-desc">
      Middle
    </view>

    <view class="block">
      <t-avatar
        icon="user"
        :badge-props="{count: 8, offset: [5, 5]}"
      />
    </view>
  </view>
</template>

<script>
// import tBadge from 'tdesign-uniapp/badge/badge';
import tAvatar from 'tdesign-uniapp/avatar/avatar';
export default {
  components: {
    // tBadge,
    tAvatar,
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
