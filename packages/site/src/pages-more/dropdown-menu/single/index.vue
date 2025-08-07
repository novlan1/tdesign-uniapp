<template>
    <view>
        <t-dropdown-menu>
            <t-dropdown-item :options="product.options" placement="right" :value="product.value" @change="onChange" />
            <t-dropdown-item :options="sorter.options" placement="right" :default-value="sorter.value" />
        </t-dropdown-menu>
    </view>
</template>

<script>
import tDropdownMenu from './tdesign-miniprogram/dropdown-menu/dropdown-menu';
import tDropdownItem from './tdesign-miniprogram/dropdown-item/dropdown-item';
export default {
    components: {
        tDropdownMenu,
        tDropdownItem
    },
    data() {
        return {
            product: {
                value: 'all',
                options: [
                    {
                        value: 'all',
                        label: '全部产品'
                    },
                    {
                        value: 'new',
                        label: '最新产品'
                    },
                    {
                        value: 'hot',
                        label: '最火产品'
                    },
                    {
                        value: 'disabled',
                        label: '禁用选项',
                        disabled: true
                    }
                ]
            },
            sorter: {
                value: 'default',
                options: [
                    {
                        value: 'default',
                        label: '默认排序'
                    },
                    {
                        value: 'price',
                        label: '价格从高到低'
                    }
                ]
            }
        };
    },
    methods: {
        onChange(e) {
            this.setData({
                'product.value': e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
