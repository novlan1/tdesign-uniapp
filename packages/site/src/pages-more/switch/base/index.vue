<template>
  <view>
    <t-cell
      title="基础开关"
      :bordered="false"
    >
      <t-switch
        slot="note"
        :default-value="true"
      />
    </t-cell>
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
    return {
      defaultVal: true,
    };
  },
  created() {},
  methods: {
    handleChange(e) {
      this.setData({
        defaultVal: e.detail.value,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
