<template>
    <view>
        <t-cell class="mb-16" title="带标题选择器" arrow hover :note="cityText" @click="onTitlePicker" />

        <t-cell title="无标题选择器" arrow hover :note="city2Text" @click="onWithoutTitlePicker" />

        <t-picker
            :visible="cityVisible"
            :value="cityValue"
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

        <t-picker
            :visible="city2Visible"
            :value="city2Value"
            data-key="city2"
            :title="city2Title"
            cancelBtn="取消"
            confirmBtn="确认"
            usingCustomNavbar
            @change="onPickerChange($event, { key: 'city2' })"
            @pick="onColumnChange($event, { key: 'city2' })"
            @cancel="onPickerCancel($event, { key: 'city2' })"
        >
            <t-picker-item :options="citys"></t-picker-item>
        </t-picker>
    </view>
</template>

<script>
import tCellGroup from 'tdesign-uniapp/cell-group/cell-group';
import tCell from 'tdesign-uniapp/cell/cell';
import tPicker from 'tdesign-uniapp/picker/picker';
import tPickerItem from 'tdesign-uniapp/picker-item/picker-item';
export default {
    components: {
        tCellGroup,
        tCell,
        tPicker,
        tPickerItem
    },
    data() {
        return {
            cityText: '',
            city2Text: '',
            cityValue: [],
            city2Value: [],
            cityTitle: '',
            city2Title: '',

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

            cityVisible: false,
            city2Visible: false
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
        },
        onTitlePicker() {
            this.setData({
                cityVisible: true,
                cityTitle: '选择城市'
            });
        },
        onWithoutTitlePicker() {
            this.setData({
                city2Visible: true,
                city2Title: ''
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
