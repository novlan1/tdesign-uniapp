<template>
    <view>
        <t-cell class="mb-16" title="选择城市" arrow hover :note="cityText" @click="onCityPicker" />

        <t-cell class="mb-16" title="选择时间" arrow hover :note="dateText" @click="onSeasonPicker" />

        <t-picker
            :visible="cityVisible"
            :value="cityValue"
            data-key="city"
            title="选择城市"
            cancelBtn="取消"
            confirmBtn="确认"
            usingCustomNavbar
            @change="onPickerChange($event, { key: 'city' })"
            @pick="onColumnChange($event, { key: 'city' })"
            @cancel="onPickerCancel($event, { key: 'city' })"
        >
            <t-picker-item :options="citys" :format="formatter">
                <block v-for="(option, index) in citys" :key="index">
                    <view v-if="option.tag" :slot="'label-suffix--' + index" class="label-suffix">
                        <t-tag size="small" theme="primary">{{ option.tag }}</t-tag>
                    </view>
                </block>
            </t-picker-item>
        </t-picker>

        <t-picker
            :visible="dateVisible"
            :value="dateValue"
            data-key="date"
            title="选择时间"
            cancelBtn="取消"
            confirmBtn="确认"
            usingCustomNavbar
            @change="onPickerChange($event, { key: 'date' })"
            @pick="onColumnChange($event, { key: 'date' })"
            @cancel="onPickerCancel($event, { key: 'date' })"
        >
            <t-picker-item :options="years"></t-picker-item>
            <t-picker-item :options="seasons"></t-picker-item>
        </t-picker>
    </view>
</template>

<script>
import tCellGroup from 'tdesign-uniapp/cell-group/cell-group';
import tCell from 'tdesign-uniapp/cell/cell';
import tPicker from 'tdesign-uniapp/picker/picker';
import tPickerItem from 'tdesign-uniapp/picker-item/picker-item';
import tTag from 'tdesign-uniapp/tag/tag';
export default {
    components: {
        tCellGroup,
        tCell,
        tPicker,
        tPickerItem,
        tTag
    },
    data() {
        return {
            cityText: '',
            cityValue: [],
            dateText: '',
            dateValue: [],

            citys: [
                {
                    label: '北京市',
                    value: '北京市',
                    tag: '合'
                },
                {
                    label: '上海市',
                    value: '上海市',
                    tag: '合'
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

            years: [
                {
                    label: '2021年',
                    value: '2021'
                },
                {
                    label: '2020年',
                    value: '2020'
                },
                {
                    label: '2019年',
                    value: '2019'
                }
            ],

            seasons: [
                {
                    label: '春',
                    value: '春'
                },
                {
                    label: '夏',
                    value: '夏'
                },
                {
                    label: '秋',
                    value: '秋'
                },
                {
                    label: '冬',
                    value: '冬'
                }
            ],

            formatter(item) {
                const { value, label } = item;
                if (value === '北京市') {
                    return {
                        value,
                        label: label.substring(0, 2)
                    };
                }
                return item;
            },

            cityVisible: false,
            dateVisible: false,

            option: {
                tag: ''
            }
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
        onCityPicker() {
            this.setData({
                cityVisible: true
            });
        },
        onSeasonPicker() {
            this.setData({
                dateVisible: true
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
