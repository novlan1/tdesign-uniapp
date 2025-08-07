<template>
    <view>
        <t-date-time-picker
            :usePopup="false"
            title="选择日期"
            :visible="dateVisible"
            mode="date"
            :defaultValue="date"
            format="YYYY-MM-DD"
            @change="onConfirm"
            @pick="onColumnChange"
            @cancel="hidePicker"
            :start="start"
            :end="end"
        />
    </view>
</template>

<script>
import tDateTimePicker from 'tdesign-uniapp/date-time-picker/date-time-picker';
export default {
    components: {
        tDateTimePicker
    },
    data() {
        return {
            mode: '',
            dateVisible: false,
            date: new Date('2021-12-23').getTime(),
            // 支持时间戳传入

            // 指定选择区间起始值
            start: '2000-01-01 00:00:00',
            end: '2030-09-09 12:12:12'
        };
    },
    methods: {
        hidePicker() {
            const { mode } = this;
            this.setData({
                [`${mode}Visible`]: false
            });
        },

        onConfirm(e) {
            const { value } = e.detail;
            const { mode } = this;
            console.log('confirm', value);
            this.setData({
                [mode]: value,
                [`${mode}Text`]: value
            });
            this.hidePicker();
        },

        onColumnChange(e) {
            console.log('pick', e.detail.value);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
