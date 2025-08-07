<template>
    <view>
        <t-cell title="选择时间" hover :note="text || ''" arrow @tap.native="showPicker" t-class="panel-item" />

        <t-date-time-picker
            title="选择时间"
            :visible="visible"
            :value="value"
            format="HH:mm:ss"
            :mode="['null', 'second']"
            :steps=""
            @change="onConfirm"
            @pick="onColumnChange"
            @cancel="hidePicker"
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
            text: '',
            value: '10:00:00',
            visible: false
        };
    },
    methods: {
        showPicker() {
            this.setData({
                visible: true
            });
        },
        hidePicker() {
            this.setData({
                visible: false
            });
        },
        onConfirm(e) {
            const { value } = e.detail;
            console.log('confirm', value);
            this.setData({
                value,
                text: value
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
