<template>
    <view class="skyline">
        <t-navbar title="Picker" leftArrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="area-picker-demo">
                <view class="demo-title">Picker 选择器</view>
                <view class="demo-desc">用于一组预设数据中的选择。</view>
                <t-demo title="01 组件类型" desc="基础选择器">
                    <base />
                    <area />
                </t-demo>
                <t-demo title="02 组件样式" desc="是否带标题">
                    <with-title />
                </t-demo>
                <t-demo desc="不使用 Popup">
                    <without-popup />
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
import area from '../area';
import withoutPopup from '../without-popup';
export default zpMixins.extend({
    components: {
        tNavbar,
        base,
        withTitle,
        area,
        withoutPopup
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './picker.less';
</style>
