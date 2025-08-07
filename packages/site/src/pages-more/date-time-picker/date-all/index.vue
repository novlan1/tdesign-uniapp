<template>
    <view>
        <t-cell title="选择日期时间" hover :note="datetimeText" arrow data-mode="datetime" @tap.native="showPicker($event, { mode: 'datetime' })" t-class="panel-item" />

        <!-- 年月日时分 -->
        <t-date-time-picker
            title="选择日期和时间"
            :visible="datetimeVisible"
            mode="second"
            :value="datetime"
            format="YYYY-MM-DD HH:mm:ss"
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
            datetimeVisible: false,
            datetime: new Date('2021-12-23').getTime(),
            datetimeText: ''
        };
    },
    methods: {
        showPicker(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { mode } = e?.currentTarget?.dataset;
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
            const { value } = e?.detail;
            const { mode } = this;
            console.log('confirm', value);
            this.setData({
                [mode]: value,
                [`${mode}Text`]: value
            });
            this.hidePicker();
        },

        onColumnChange(e) {
            console.log('pick', e?.detail?.value);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
