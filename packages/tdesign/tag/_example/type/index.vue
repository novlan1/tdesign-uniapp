<template>
  <view>
    <view class="demo">
      <view class="demo-desc">
        基础标签
      </view>

      <t-tag
        class="margin-16"
        variant="light"
      >
        标签文字
      </t-tag>
      <t-tag
        class="margin-16"
        variant="outline"
      >
        标签文字
      </t-tag>
    </view>

    <view class="demo">
      <view class="demo-desc">
        圆弧标签
      </view>

      <t-tag
        class="margin-16"
        variant="light"
        shape="round"
      >
        标签文字
      </t-tag>
      <t-tag
        class="margin-16"
        variant="outline"
        shape="round"
      >
        标签文字
      </t-tag>
      <t-tag
        class="margin-16"
        variant="outline"
        shape="mark"
      >
        标签文字
      </t-tag>
    </view>

    <view class="demo">
      <view class="demo-desc">
        带图标的标签
      </view>

      <t-tag
        class="margin-16"
        variant="light"
        icon="discount"
      >
        标签文字
      </t-tag>
      <t-tag
        class="margin-16"
        variant="outline"
        icon="discount"
      >
        标签文字
      </t-tag>
    </view>

    <!-- skyline暂不支持设置后max-width超出省略 -->
    <view
      v-if="!skylineRender"
      class="demo"
    >
      <view class="demo-desc">
        超长省略文本标签
      </view>

      <t-tag
        :max-width="130"
        variant="light"
      >
        超长省略文本标签超长省略文本标签
      </t-tag>
    </view>
  </view>
</template>

<script>
import tTag from 'tdesign-uniapp/tag/tag.vue';
import SkylineBehavior from 'tdesign-uniapp/mixins/skyline.js';

export default {
  components: {
    tTag,
  },
  mixins: [SkylineBehavior],
  data() {
    return {
      skylineRender: '',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.demo {
    padding: 0 32rpx 48rpx;
}

.demo:last-child {
    padding-bottom: 0;
}

.demo-desc {
    font-size: 14px;
    color: var(--td-text-color-secondary);
    margin-bottom: 32rpx;
}

.demo .margin-16:not(:last-child) {
    margin-right: 32rpx;
}
</style>
