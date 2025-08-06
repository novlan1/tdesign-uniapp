<template>
    <view class="skyline">
        <t-navbar class="demo-navbar" title="Overlay" leftArrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo">
                <view class="demo-title">Overlay 遮罩层</view>
                <view class="demo-desc">通过遮罩层，可以强调部分内容</view>
                <t-demo title="01 组件类型" desc="基础遮罩层" padding>
                    <base />
                </t-demo>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import base from '../base';
export default zpMixins.extend({
    components: {
        tNavbar,
        base
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './overlay.less';
</style>
