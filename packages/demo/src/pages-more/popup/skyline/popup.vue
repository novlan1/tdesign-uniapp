<template>
    <view class="skyline">
        <t-navbar class="demo-navbar" title="Popup" leftArrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo-title">Popup 弹出层</view>
            <view class="demo-desc">由其他控件触发，屏幕滑出或弹出一块自定义内容区域。</view>
            <view class="tdesign-demo-popup">
                <t-demo title="01 组件类型" desc="基础弹出层" padding>
                    <base />
                </t-demo>
                <t-demo title="02 组件示例" desc="应用示例" padding>
                    <with-title />
                    <custom-close style="display: block; margin-top: 32rpx" />
                </t-demo>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import base from '../base';
import withTitle from '../with-title';
import customClose from '../custom-close';
export default zpMixins.extend({
    components: {
        tNavbar,
        base,
        withTitle,
        customClose
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './popup.less';
</style>
