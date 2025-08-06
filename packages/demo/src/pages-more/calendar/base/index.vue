<template>
    <view>
        <t-calendar :visible="visible" :value="value" @confirm="handleConfirm" @close="onClose" />
        <t-cell arrow title="单个选择日历" :note="_this.formatTimestamp(value)" @tap.native="handleCalendar" />
    </view>
</template>
<script module="_this" lang="wxs" src="@/calendar/calendar.wxs"></script>
<script>
import tCalendar from './tdesign-miniprogram/calendar/calendar';
import tCell from './tdesign-miniprogram/cell/cell';
export default {
    components: {
        tCalendar,
        tCell
    },
    data() {
        return {
            visible: false,
            value: null
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
            console.log(value);
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
