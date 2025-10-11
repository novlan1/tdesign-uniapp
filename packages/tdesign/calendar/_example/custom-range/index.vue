<template>
  <view>
    <t-calendar
      :visible="visible"
      :value="value"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="handleConfirm"
    />
    <t-cell
      arrow
      title="含不可选的日历"
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
      value: new Date(2022, 1, 18).getTime(),
      minDate: new Date(2022, 1, 18).getTime(),
      maxDate: new Date(2022, 2, 1).getTime(),
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
      this.setData({
        value,
      });
      console.log(value);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
