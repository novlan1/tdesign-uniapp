<template>
  <view>
    <t-cell title="大尺寸 32">
      <t-switch
        slot="note"
        :default-value="true"
        size="large"
      />
    </t-cell>
    <t-cell title="中尺寸 28">
      <t-switch
        slot="note"
        :default-value="true"
      />
    </t-cell>
    <t-cell
      title="小尺寸 24"
      :bordered="false"
    >
      <t-switch
        slot="note"
        :default-value="true"
        size="small"
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
