<template>
    <view>
        <t-calendar :visible="visible" :value="value" :minDate="minDate" :maxDate="maxDate" type="range" @confirm="handleConfirm" />

        <view class="wrapper" @tap="handleCalendar">
            <view class="wrapper__left">{{ _this.formatTimestamp(value[0]) }}</view>
            <t-icon class="wrapper__center" name="swap-right" size="40rpx" />
            <view class="wrapper__right">{{ _this.formatTimestamp(value[1]) }}</view>
        </view>
    </view>
</template>
<script module="_this" lang="wxs" src="@/calendar/calendar.wxs"></script>
<script>
import tIcon from './tdesign-miniprogram/icon/icon';
import tCalendar from './tdesign-miniprogram/calendar/calendar';
export default {
    components: {
        tIcon,
        tCalendar
    },
    data() {
        return {
            visible: false,
            value: [new Date(2024, 11, 5).getTime(), new Date(2024, 11, 10).getTime()],
            minDate: new Date(2024, 10, 1).getTime(),
            maxDate: new Date(2024, 12, 1).getTime()
        };
    },
    methods: {
        handleCalendar() {
            this.setData({
                visible: true
            });
        },
        handleConfirm(e) {
            console.log(e.detail.value);
            const { value } = e.detail;
            this.setData({
                value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
