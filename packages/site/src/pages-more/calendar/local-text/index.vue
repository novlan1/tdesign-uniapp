<template>
    <view>
        <t-calendar :visible="visible" :value="value" :minDate="minDate" :maxDate="maxDate" :localeText="localeText" @confirm="handleConfirm" @close="onClose" />
        <t-cell arrow title="国际化" :note="_this.formatTimestamp(value)" @tap.native="handleCalendar" />
    </view>
</template>
<script module="_this" lang="wxs" src="@/calendar/calendar.wxs"></script>
<script>
import tCalendar from 'tdesign-uniapp/calendar/calendar';
import tCell from 'tdesign-uniapp/cell/cell';
export default {
    components: {
        tCalendar,
        tCell
    },
    data() {
        return {
            visible: false,
            value: new Date(2022, 1, 18).getTime(),
            minDate: new Date(2022, 1, 1).getTime(),
            maxDate: new Date(2022, 2, 15).getTime(),
            localeText: {
                title: 'Select Date',
                weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                monthTitle: '{month} {year}',
                confirm: 'Confirm',
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
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
        },
        onClose({ detail }) {
            console.log(detail.trigger);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
