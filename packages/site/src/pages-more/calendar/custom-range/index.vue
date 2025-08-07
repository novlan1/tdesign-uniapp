<template>
    <view>
        <t-calendar :visible="visible" :value="value" :minDate="minDate" :maxDate="maxDate" @confirm="handleConfirm" />
        <t-cell arrow title="含不可选的日历" :note="_this.formatTimestamp(value)" @tap.native="handleCalendar" />
    </view>
</template>
<script module="_this" lang="wxs" src="@/calendar/calendar.wxs"></script>
<script>
import tCell from 'tdesign-uniapp/cell/cell';
import tCalendar from 'tdesign-uniapp/calendar/calendar';
export default {
    components: {
        tCell,
        tCalendar
    },
    data() {
        return {
            visible: false,
            value: new Date(2022, 1, 18).getTime(),
            minDate: new Date(2022, 1, 18).getTime(),
            maxDate: new Date(2022, 2, 1).getTime()
        };
    },
    methods: {
        handleCalendar() {
            this.setData({
                visible: true
            });
        },
        handleConfirm(e) {
            const { value } = e.detail;
            this.setData({
                value
            });
            console.log(value);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
