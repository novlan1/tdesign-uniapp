<template>
  <view>
    <t-calendar
      :visible="visible"
      :value="value"
      @confirm="handleConfirm"
      @close="onClose"
    />
    <t-cell
      arrow
      title="单个选择日历"
      :note="formatTimestamp(value)"
      @click="handleCalendar"
    />
  </view>
</template>
<script>
import tCalendar from 'tdesign-uniapp/calendar/calendar';
import tCell from 'tdesign-uniapp/cell/cell';
import { formatTimestamp } from '../computed';


export default {
  components: {
    tCalendar,
    tCell,
  },
  data() {
    return {
      visible: false,
      value: null,
    };
  },
  created() {},
  methods: {
    formatTimestamp,
    handleCalendar() {
      this.setData({
        visible: true,
      });
    },
    handleConfirm(e) {
      const { value } = e.detail;
      console.log(value);
      this.setData({
        value,
      });
    },
    onClose({ detail }) {
      console.log(detail.trigger);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
