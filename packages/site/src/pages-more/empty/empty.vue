<template>
    <view>
        <t-navbar class="demo-navbar" title="Empty" leftArrow />
        <view class="demo">
            <t-demo-header title="Empty 空状态" desc="用于空状态时的占位提示。" notice="渲染框架支持情况：Skyline、WebView" />
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
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import imageEmpty from './imageEmpty';
import buttonEmpty from './buttonEmpty';
/*
 * @Author: shiyanzhang
 * @Date: 2021-08-24 15:56:07
 * @Description:
 * @FilePath: /tdesign-miniprogram/example/pages/empty/empty.ts
 */
export default zpMixins.extend({
    components: {
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
