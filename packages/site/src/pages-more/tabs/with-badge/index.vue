<template>
  <view>
    <t-tabs :default-value="0">
      <t-tab-panel
        label="选项"
        value="0"
        badge-props=""
      />
      <t-tab-panel
        label="选项"
        value="1"
        badge-props=""
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
