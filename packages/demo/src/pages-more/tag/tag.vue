<template>
    <view>
        <t-navbar class="demo-navbar" title="Tag" leftArrow />
        <view class="demo">
            <t-demo-header title="Tag 标签" desc="用于表明主体的类目，属性或状态。" notice="渲染框架支持情况：Skyline、WebView" />
            <t-demo title="01 组件类型">
                <type />
            </t-demo>
            <t-demo desc="可关闭的标签">
                <closable />
            </t-demo>
            <t-demo desc="可点击的标签">
                <checkable />
            </t-demo>
            <t-demo title="02 组件状态" desc="展示型标签">
                <theme />
            </t-demo>
            <t-demo title="03 组件尺寸">
                <size />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import theme from './theme';
import size from './size';
import type from './type';
import closable from './closable';
import checkable from './checkable';
export default zpMixins.extend({
    components: {
        theme,
        size,
        type,
        closable,
        checkable
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './tag.less';
</style>
