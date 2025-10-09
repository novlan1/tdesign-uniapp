<template>
  <view>
    <view class="demo-desc">
      加载状态
    </view>

    <view class="group">
      <t-cell title="加载状态">
        <t-switch
          slot="note"
          :default-value="false"
          loading
        />
      </t-cell>
      <t-cell
        title="加载状态"
        :bordered="false"
      >
        <t-switch
          slot="note"
          :default-value="true"
          loading
        />
      </t-cell>
    </view>

    <view class="demo-desc">
      禁用状态
    </view>

    <view class="group">
      <t-cell title="禁用状态">
        <t-switch
          slot="note"
          disabled
        />
      </t-cell>
      <t-cell
        title="禁用状态"
        :bordered="false"
      >
        <t-switch
          slot="note"
          :default-value="true"
          disabled
        />
      </t-cell>
    </view>
  </view>
</template>

<script>
import tCell from 'tdesign-uniapp/cell/cell';
import tSwitch from 'tdesign-uniapp/switch/switch';
export default {
  components: {
    tCell,
    tSwitch,
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
