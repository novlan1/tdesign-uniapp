<template>
    <view class="skyline">
        <t-navbar class="demo-navbar" title="CountDown" leftArrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo-title">CountDown 倒计时</view>
            <view class="demo-desc">用于实时展示倒计时数值。</view>

            <t-demo padding title="01 组件类型">
                <base />
            </t-demo>

            <t-demo padding title="02 组件尺寸" desc="倒计时 large/medium/small 尺寸">
                <size />
            </t-demo>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from 'tdesign-uniapp/navbar/navbar';
import base from '../base';
import size from '../size';
export default zpMixins.extend({
    components: {
        tNavbar,
        base,
        size
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './count-down.less';
</style>
