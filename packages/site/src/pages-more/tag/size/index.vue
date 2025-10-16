<template>
  <view>
    <view class="block">
      <t-tag
        class="margin-16"
        size="extra-large"
        variant="light"
      >
        加大尺寸
      </t-tag>
      <t-tag
        class="margin-16"
        size="large"
        variant="light"
      >
        大尺寸
      </t-tag>
      <t-tag
        class="margin-16"
        size="medium"
        variant="light"
      >
        中尺寸
      </t-tag>
      <t-tag
        class="margin-16"
        size="small"
        variant="light"
      >
        小尺寸
      </t-tag>
    </view>

    <view class="block">
      <t-tag
        class="margin-8"
        size="extra-large"
        variant="light"
        closable
      >
        加大尺寸
      </t-tag>
      <t-tag
        class="margin-8"
        size="large"
        variant="light"
        closable
      >
        大尺寸
      </t-tag>
      <t-tag
        class="margin-8"
        size="medium"
        variant="light"
        closable
      >
        中尺寸
      </t-tag>
      <t-tag
        class="margin-8"
        size="small"
        variant="light"
        closable
      >
        小尺寸
      </t-tag>
    </view>
  </view>
</template>

<script>
import tTag from 'tdesign-uniapp/tag/tag.vue';
export default {
  components: {
    tTag,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.block {
    margin: 0 32rpx;
}

.block + .block {
    margin-top: 32rpx;
}

.block .margin-16,
.block .margin-8 {
    vertical-align: top;
}

.block .margin-16:not(:last-child) {
    margin-right: 32rpx;
}

.block .margin-8:not(:last-child) {
    margin-right: 10rpx;
}
</style>
