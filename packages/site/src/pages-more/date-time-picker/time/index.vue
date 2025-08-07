<template>
    <view>
        <view class="demo-desc">时分秒选择器</view>
        <t-cell title="选择时间" hover :note="secondText || ''" arrow data-mode="second" @tap.native="showPicker($event, { mode: 'second' })" t-class="panel-item" />

        <view class="demo-desc">时分选择器</view>
        <t-cell title="选择时间" hover :note="minuteText || ''" arrow data-mode="minute" @tap.native="showPicker($event, { mode: 'minute' })" t-class="panel-item" />

        <!-- 时分 -->
        <t-date-time-picker
            title="选择时间"
            :visible="secondVisible"
            :mode="['null', 'second']"
            :value="second"
            format="HH:mm:ss"
            @change="onConfirm"
            @pick="onColumnChange"
            @cancel="hidePicker"
        />

        <!-- 时分 -->
        <t-date-time-picker
            title="选择时间"
            :visible="minuteVisible"
            :mode="['null', 'minute']"
            :start="start"
            :value="minute"
            format="HH:mm"
            @change="onConfirm"
            @pick="onColumnChange"
            @cancel="hidePicker"
        />
    </view>
</template>

<script>
import tCell from 'tdesign-uniapp/cell/cell';
import tDateTimePicker from 'tdesign-uniapp/date-time-picker/date-time-picker';
export default {
    components: {
        tCell,
        tDateTimePicker
    },
    data() {
        return {
            mode: '',
            second: '10:00:00',
            minute: '23:59',
            start: '2025-04-29 00:00:00',
            secondText: '',
            minuteText: '',
            secondVisible: false,
            minuteVisible: false
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
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
