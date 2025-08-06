<template>
    <view class="skyline">
        <t-navbar class="demo-navbar" title="Progress" leftArrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo">
                <t-demo-header title="Progress 进度条" desc="用于展示任务当前的进度。" notice="渲染框架支持情况：Skyline、WebView" />
                <t-demo title="01 组件类型">
                    <base />
                </t-demo>
                <t-demo desc="过渡样式" padding>
                    <transition />
                </t-demo>
                <t-demo desc="自定义颜色/圆角" padding>
                    <custom />
                </t-demo>
                <t-demo title="02 组件状态" desc="线性进度条" padding>
                    <line />
                </t-demo>
                <t-demo desc="百分比内显进度条" padding>
                    <plump />
                </t-demo>
                <circle />
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import transition from './transition';
import custom from './custom';
import line from './line';
import plump from './plump';
import circle from './circle';
export default zpMixins.extend({
    components: {
        base,
        transition,
        custom,
        line,
        plump,
        circle
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './progress.less';
</style>
