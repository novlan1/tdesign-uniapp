<template>
    <view>
        <t-calendar :visible="visible" :value="value" switch-mode="year-month" :minDate="minDate" :maxDate="maxDate" @confirm="handleConfirm" @panel-change="handlePanelChange" />
        <t-cell arrow title="带翻页功能的日历" :note="_this.formatTimestamp(value)" @tap.native="handleCalendar" />
    </view>
</template>
<script module="_this" lang="wxs" src="@/calendar/calendar.wxs"></script>
<script>
import tCell from './tdesign-miniprogram/cell/cell';
import tCalendar from './tdesign-miniprogram/calendar/calendar';
export default {
    components: {
        tCell,
        tCalendar
    },
    data() {
        return {
            visible: false,
            value: new Date(2022, 1, 27).getTime(),
            minDate: new Date(2022, 0, 10).getTime(),
            maxDate: new Date(2027, 10, 27).getTime()
        };
    },
    methods: {
        handleCalendar() {
            this.setData({
                visible: true
            });
        },
        handleConfirm(e) {
            this.setData({
                value: e.detail.value
            });
            console.log(e.detail.value);
        },
        handlePanelChange(e) {
            const { year, month } = e.detail;
            console.log('year: ', year, 'month: ', month);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
