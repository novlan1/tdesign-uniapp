<template>
    <view>
        <t-cell title="选择日期" hover :note="monthText" arrow data-mode="month" @tap.native="showPicker($event, { mode: 'month' })" t-class="panel-item" />

        <!-- 年月 -->
        <t-date-time-picker
            title="选择日期"
            :visible="monthVisible"
            mode="month"
            :value="month"
            format="YYYY-MM"
            @change="onConfirm"
            @pick="onColumnChange"
            @cancel="hidePicker"
            :start="start"
            :end="end"
        />
    </view>
</template>

<script>
import tCell from './tdesign-miniprogram/cell/cell';
import tDateTimePicker from './tdesign-miniprogram/date-time-picker/date-time-picker';
export default {
    components: {
        tCell,
        tDateTimePicker
    },
    data() {
        return {
            mode: '',
            monthVisible: false,
            month: '2021-09',
            monthText: '',
            // 指定选择区间起始值
            start: '2000-01-01 00:00:00',
            end: '2030-09-09 12:12:12'
        };
    },
    methods: {
        showPicker(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { mode } = e.currentTarget.dataset;
            this.setData({
                mode,
                [`${mode}Visible`]: true
            });
        },

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
