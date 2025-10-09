<template>
  <view>
    <t-calendar
      :visible="visible"
      :value="value"
      type="multiple"
      @confirm="handleConfirm"
    />
    <t-cell
      arrow
      title="多个选择日历"
      @click="handleCalendar"
    >
      <view
        slot="note"
        class="custom-class-note"
      >
        {{ formatTimestamp(value) }}
      </view>
    </t-cell>
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
      this.setData({
        value,
      });
      console.log(e.detail.value);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
