<template>
  <view>
    <t-cell
      title="选择时间"
      hover
      :note="text || ''"
      arrow
      t-class="panel-item"
      @click="showPicker"
    />

    <!-- TODO: -->
    <!-- :steps="" -->
    <t-date-time-picker
      title="选择时间"
      :visible="visible"
      :value="value"
      format="HH:mm:ss"
      :mode="['null', 'second']"
      @change="onConfirm"
      @pick="onColumnChange"
      @cancel="hidePicker"
    />
  </view>
</template>

<script>
import tCell from 'tdesign-uniapp/cell/cell';
import tDateTimePicker from 'tdesign-uniapp/date-time-picker/date-time-picker';
export default {
  components: {
    tCell,
    tDateTimePicker,
  },
  data() {
    return {
      text: '',
      value: '10:00:00',
      visible: false,
    };
  },
  created() {},
  methods: {
    showPicker() {
      this.setData({
        visible: true,
      });
    },
    hidePicker() {
      this.setData({
        visible: false,
      });
    },
    onConfirm(e) {
      const { value } = e.detail;
      console.log('confirm', value);
      this.setData({
        value,
        text: value,
      });
      this.hidePicker();
    },
    onColumnChange(e) {
      console.log('pick', e.detail.value);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
