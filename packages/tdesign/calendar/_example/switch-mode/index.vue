<template>
  <view>
    <t-calendar
      :visible="visible"
      :value="value"
      switch-mode="year-month"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="handleConfirm"
      @panel-change="handlePanelChange"
    />
    <t-cell
      arrow
      title="带翻页功能的日历"
      :note="formatTimestamp(value)"
      @click="handleCalendar"
    />
  </view>
</template>
<script>
import tCell from 'tdesign-uniapp/cell/cell';
import tCalendar from 'tdesign-uniapp/calendar/calendar';
import { formatTimestamp } from '../computed';

export default {
  components: {
    tCell,
    tCalendar,
  },
  data() {
    return {
      visible: false,
      value: new Date(2022, 1, 27).getTime(),
      minDate: new Date(2022, 0, 10).getTime(),
      maxDate: new Date(2027, 10, 27).getTime(),
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
      this.setData({
        value: e.detail.value,
      });
      console.log(e.detail.value);
    },
    handlePanelChange(e) {
      const { year, month } = e.detail;
      console.log('year: ', year, 'month: ', month);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
