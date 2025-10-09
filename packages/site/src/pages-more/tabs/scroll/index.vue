<template>
  <view>
    <t-tabs
      :default-value="0"
      :space-evenly="false"
      @change="onTabsChange"
      @click="onTabsClick"
    >
      <t-tab-panel
        v-for="(item, index) in 8"
        :key="index"
        label="选项"
        :value="index"
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
  methods: {
    onTabsChange(event) {
      console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    },
    onTabsClick(event) {
      console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
