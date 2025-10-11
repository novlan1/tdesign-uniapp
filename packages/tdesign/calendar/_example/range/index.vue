<template>
  <view>
    <t-calendar
      :visible="visible"
      :value="value"
      :min-date="minDate"
      :max-date="maxDate"
      type="range"
      @confirm="handleConfirm"
    />

    <view
      class="wrapper"
      @tap="handleCalendar"
    >
      <view class="wrapper__left">
        {{ formatTimestamp(value[0]) }}
      </view>
      <t-icon
        class="wrapper__center"
        name="swap-right"
        size="40rpx"
      />
      <view class="wrapper__right">
        {{ formatTimestamp(value[1]) }}
      </view>
    </view>
  </view>
</template>
<script>
import tIcon from 'tdesign-uniapp/icon/icon';
import tCalendar from 'tdesign-uniapp/calendar/calendar';
import { formatTimestamp } from '../computed';


export default {
  components: {
    tIcon,
    tCalendar,
  },
  data() {
    return {
      visible: false,
      value: [new Date(2024, 11, 5).getTime(), new Date(2024, 11, 10).getTime()],
      minDate: new Date(2024, 10, 1).getTime(),
      maxDate: new Date(2024, 12, 1).getTime(),
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
      console.log(e.detail.value);
      const { value } = e.detail;
      this.setData({
        value,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
