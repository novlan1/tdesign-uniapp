<template>
    <view>
        <t-navbar class="demo-navbar" title="Image" leftArrow />
        <view class="demo">
            <t-demo-header title="Image 图片" desc="用于展示效果，主要为上下左右居中裁切、拉伸、平铺等方式。" notice="渲染框架支持情况：Skyline、WebView" />
            <t-demo title="01 组件类型">
                <base />
            </t-demo>

            <t-demo title="02 组件状态">
                <status />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tImage from './tdesign-miniprogram/image/image';
import base from './base';
import status from './status';
export default zpMixins.extend({
    components: {
        tImage,
        base,
        status
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './image.less';
</style>
