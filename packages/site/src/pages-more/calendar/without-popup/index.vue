<template>
    <view>
        <t-calendar title="日历标题" :use-popup="false" type="multiple" @select="handleSelect" />
    </view>
</template>

<script>
import tCalendar from './tdesign-miniprogram/calendar/calendar';
export default {
    components: {
        tCalendar
    },
    data() {
        return {};
    },
    methods: {
        handleSelect(e) {
            const { value } = e.detail;
            console.log(value);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
