<template>
    <view>
        <t-navbar class="demo-navbar" title="Overlay" leftArrow />
        <view class="demo">
            <t-demo-header title="Overlay 遮罩层" desc="通过遮罩层，可以强调部分内容。" notice="渲染框架支持情况：Skyline、WebView" />
            <t-demo title="01 组件类型" desc="基础遮罩层" padding>
                <base />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
export default zpMixins.extend({
    components: {
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
