<template>
    <view class="skyline">
        <t-navbar class="block" title="Stepper" left-arrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo">
                <view class="demo-title">Stepper 步进器</view>
                <view class="demo-desc">用于数量的增减。</view>
                <t-demo title="01 组件类型" desc="基础步进器">
                    <base />
                </t-demo>
                <t-demo title="02 组件状态" desc="最大最小状态">
                    <min-max />
                </t-demo>
                <t-demo desc="禁用状态">
                    <status />
                </t-demo>
                <t-demo title="03 组件样式" desc="步进器样式">
                    <theme />
                </t-demo>
                <t-demo desc="步进器尺寸">
                    <size />
                </t-demo>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import base from '../base';
import minMax from '../min-max';
import status from '../status';
import theme from '../theme';
import size from '../size';
export default zpMixins.extend({
    components: {
        tNavbar,
        base,
        minMax,
        status,
        theme,
        size
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './stepper.less';
</style>
