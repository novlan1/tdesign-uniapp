<template>
    <view>
        <t-picker
            :visible="cityVisible"
            :value="cityValue"
            :usePopup="false"
            data-key="city"
            :title="cityTitle"
            cancelBtn="取消"
            confirmBtn="确认"
            usingCustomNavbar
            @change="onPickerChange($event, { key: 'city' })"
            @pick="onColumnChange($event, { key: 'city' })"
            @cancel="onPickerCancel($event, { key: 'city' })"
        >
            <t-picker-item :options="citys"></t-picker-item>
        </t-picker>
    </view>
</template>

<script>
import tPicker from 'tdesign-uniapp/picker/picker';
import tPickerItem from 'tdesign-uniapp/picker-item/picker-item';
export default {
    components: {
        tPicker,
        tPickerItem
    },
    data() {
        return {
            cityValue: [],
            cityTitle: '',

            citys: [
                {
                    label: '北京市',
                    value: '北京市'
                },
                {
                    label: '上海市',
                    value: '上海市'
                },
                {
                    label: '广州市',
                    value: '广州市'
                },
                {
                    label: '深圳市',
                    value: '深圳市'
                },
                {
                    label: '成都市',
                    value: '成都市'
                }
            ],

            cityVisible: false
        };
    },
    methods: {
        onColumnChange(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            console.log('picker pick:', e);
        },
        onPickerChange(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { key } = e.currentTarget.dataset;
            const { value } = e.detail;
            console.log('picker change:', e.detail);
            this.setData({
                [`${key}Visible`]: false,
                [`${key}Value`]: value,
                [`${key}Text`]: value.join(' ')
            });
        },
        onPickerCancel(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { key } = e.currentTarget.dataset;
            console.log(e, '取消');
            console.log('picker1 cancel:');
            this.setData({
                [`${key}Visible`]: false
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
