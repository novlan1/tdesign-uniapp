<template>
    <view>
        <t-dropdown-menu>
            <t-dropdown-item label="单列多选" :options="multipleSelect.options" :value="multipleSelect.value" @change="handleMultipleSelect" multiple />
            <t-dropdown-item label="双列多选" optionsColumns="2" :options="doubleColumnsOptions" :defaultValue="['option_1', 'option_2']" multiple />
            <t-dropdown-item label="三列多选" optionsColumns="3" :options="tripleColumnsOptions" :defaultValue="['option_1', 'option_2', 'option_3']" multiple />
        </t-dropdown-menu>
    </view>
</template>

<script>
import tDropdownMenu from 'tdesign-uniapp/dropdown-menu/dropdown-menu';
import tDropdownItem from 'tdesign-uniapp/dropdown-item/dropdown-item';
const chineseNumber = '一二三四五六七八九十'.split('');
const singleSelectOptions = new Array(8).fill(null).map((_, i) => ({
    label: `选项${chineseNumber[i]}`,
    value: `option_${i + 1}`,
    disabled: false
}));
singleSelectOptions.push({
    label: '禁用选项',
    value: 'disabled',
    disabled: true
});
const doubleColumnsOptions = [
    ...singleSelectOptions,
    {
        label: '禁用选项',
        value: 'disabled',
        disabled: true
    }
];
const tripleColumnsOptions = [
    ...doubleColumnsOptions,
    {
        label: '禁用选项',
        value: 'disabled',
        disabled: true
    }
];
tripleColumnsOptions.splice(8, 0, {
    label: `选项${chineseNumber[8]}`,
    value: `option_${9}`,
    disabled: false
});
export default {
    components: {
        tDropdownMenu,
        tDropdownItem
    },
    data() {
        return {
            multipleSelect: {
                value: ['option_1'],
                options: singleSelectOptions
            },
            doubleColumnsOptions,
            tripleColumnsOptions
        };
    },
    methods: {
        handleMultipleSelect(e) {
            this.setData({
                'multipleSelect.value': e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
