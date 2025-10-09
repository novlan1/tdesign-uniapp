<template>
  <view>
    <t-tabs :default-value="0">
      <t-tab-panel
        label="选项"
        value="0"
        :badge-props="{ dot: true, offset: ['4px', '4px'] }"
      />
      <t-tab-panel
        label="选项"
        value="1"
        :badge-props="{ count: 8, offset: ['8px', '8px'] }"
      />
      <t-tab-panel
        label="选项"
        value="2"
      />
    </t-tabs>
  </view>
</template>

<script>
import tTabs from 'tdesign-uniapp/tabs/tabs';
import tTabPanel from 'tdesign-uniapp/tab-panel/tab-panel';
export default {
  components: {
    tTabs,
    tTabPanel,
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
