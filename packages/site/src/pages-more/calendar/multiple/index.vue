<template>
    <view>
        <t-calendar :visible="visible" :value="value" type="multiple" @confirm="handleConfirm" />
        <t-cell arrow title="多个选择日历" @tap.native="handleCalendar">
            <view slot="note" class="custom-class-note">{{ _this.formatTimestamp(value) }}</view>
        </t-cell>
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
            this.setData({
                value
            });
            console.log(e.detail.value);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
