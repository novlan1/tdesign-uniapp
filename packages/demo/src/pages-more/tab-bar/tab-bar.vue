<template>
    <view>
        <t-navbar title="TabBar" leftArrow />
        <view class="demo">
            <t-demo-header title="TabBar 标签栏" desc="用于在不同功能模块之间进行快速切换，位于页面底部。" notice="渲染框架支持情况：Skyline、WebView" />
            <t-demo title="01 组件类型" desc="纯文本标签栏">
                <text-only />
            </t-demo>

            <t-demo desc="图标加文本标签栏">
                <base />
            </t-demo>

            <t-demo desc="纯图标标签栏">
                <icon-only />
            </t-demo>

            <t-demo desc="双层级文本标签栏">
                <sub />
            </t-demo>

            <t-demo title="02 组件样式" desc="弱选中标签栏">
                <badge />
            </t-demo>

            <t-demo desc="悬浮胶囊标签栏">
                <round />
            </t-demo>

            <t-demo title="03 自定义" desc="自定义样式">
                <custom />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import textOnly from './text-only';
import iconOnly from './icon-only';
import base from './base';
import sub from './sub';
import badge from './badge';
import round from './round';
import custom from './custom';
export default zpMixins.extend({
    components: {
        textOnly,
        iconOnly,
        base,
        sub,
        badge,
        round,
        custom
    },
    data() {
        return {
            value: 'label_1'
        };
    },
    methods: {
        onChange(event: any) {
            console.log(event.detail);
        }
    }
});
</script>
<style lang="less">
@import './tab-bar.less';
</style>
