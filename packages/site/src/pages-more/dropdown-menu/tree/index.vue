<template>
    <view>
        <t-dropdown-menu>
            <t-dropdown-item label="树形双列" optionsLayout="tree" :options="doubleColumnsTree.options" :value="doubleColumnsTree.value" @change="handleTreeSelect" />
            <t-dropdown-item label="选项最多八字树形三列" optionsLayout="tree" :options="tripleColumnsTree.options" :defaultValue="tripleColumnsTree.value" multiple />
        </t-dropdown-menu>
    </view>
</template>

<script>
import tDropdownMenu from 'tdesign-uniapp/dropdown-menu/dropdown-menu';
import tDropdownItem from 'tdesign-uniapp/dropdown-item/dropdown-item';
const chineseNumber = '一二三四五六七八九十'.split('');
const generateTree = function (deep = 0, count = 10, prefix) {
    const ans = [];
    for (let i = 0; i < count; i += 1) {
        const value = prefix ? `${prefix}-${i}` : `${i}`;
        const rect = {
            label: `选项${chineseNumber[i]}`,
            value
        };
        if (deep > 0) {
            rect.options = generateTree(deep - 1, 10, value);
        }
        ans.push(rect);
    }
    return ans;
};
export default {
    components: {
        tDropdownMenu,
        tDropdownItem
    },
    data() {
        return {
            doubleColumnsTree: {
                options: generateTree(1),
                value: ['0', '0-0']
            },
            tripleColumnsTree: {
                options: generateTree(2),
                value: ['0', '0-0', ['0-0-0', '0-0-1']]
            }
        };
    },
    methods: {
        handleTreeSelect(e) {
            this.setData({
                'doubleColumnsTree.value': e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
