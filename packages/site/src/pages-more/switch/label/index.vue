<template>
  <view>
    <t-cell title="带文字开关">
      <t-switch
        slot="note"
        :value="defaultVal"
        :label="['开', '关']"
        @change="handleChange"
      />
    </t-cell>

    <t-cell
      title="带图标开关"
      :bordered="false"
    >
      <t-switch
        slot="note"
        :default-value="true"
        :icon="['check', 'close']"
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
