<template>
    <view class="skyline">
        <t-navbar class="demo-navbar" title="Empty" leftArrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo">
                <view class="demo-title">Empty 空状态</view>
                <view class="demo-desc">用于空状态时的占位提示。</view>
                <t-demo title="01 类型" desc="图标空状态">
                    <base />
                </t-demo>
                <t-demo desc="自定义图片空状态">
                    <imageEmpty />
                </t-demo>
                <t-demo desc="带操作空状态">
                    <buttonEmpty />
                </t-demo>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from 'tdesign-uniapp/navbar/navbar';
import base from '../base';
import imageEmpty from '../imageEmpty';
import buttonEmpty from '../buttonEmpty';
/*
 * @Author: shiyanzhang
 * @Date: 2021-08-24 15:56:07
 * @Description:
 * @FilePath: /tdesign-miniprogram/example/pages/empty/empty.ts
 */
export default zpMixins.extend({
    components: {
        tNavbar,
        base,
        imageEmpty,
        buttonEmpty
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './empty.less';
</style>
