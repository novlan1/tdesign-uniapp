<template>
    <view class="skyline">
        <t-navbar title="Cell" leftArrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo">
                <view class="demo-title">Cell 单元格</view>
                <view class="demo-desc">用于各个类别行的信息展示。</view>
                <t-demo title="01 组件类型" desc="单行单元格">
                    <base />
                </t-demo>
                <t-demo desc="多行单元格">
                    <multiple />
                </t-demo>
                <t-demo title="02 组件样式" desc="卡片单元格">
                    <theme />
                </t-demo>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import base from '../base';
import multiple from '../multiple';
import theme from '../theme';
export default zpMixins.extend({
    components: {
        tNavbar,
        base,
        multiple,
        theme
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './cell.less';
</style>
