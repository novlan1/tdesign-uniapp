<template>
    <view>
        <t-navbar class="demo-navbar" title="Button" leftArrow />
        <view class="demo">
            <t-demo-header title="Button 按钮" desc="用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。" notice="渲染框架支持情况：Skyline、WebView" />
            <t-demo title="01 组件类型" desc="基础按钮">
                <base />
            </t-demo>

            <t-demo desc="图标按钮">
                <icon-btn />
            </t-demo>

            <t-demo desc="幽灵按钮">
                <ghost-btn />
            </t-demo>

            <t-demo desc="组合按钮">
                <group-btn />
            </t-demo>

            <t-demo desc="通栏按钮">
                <block-btn />
            </t-demo>

            <t-demo title="02 组件状态" desc="按钮禁用态">
                <disabled />
            </t-demo>

            <t-demo title="03 组件样式" desc="按钮尺寸">
                <size />
            </t-demo>

            <t-demo desc="按钮形状">
                <shape />
            </t-demo>

            <t-demo desc="按钮主题">
                <theme />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import size from './size';
import iconBtn from './icon-btn';
import groupBtn from './group-btn';
import blockBtn from './block-btn';
import ghostBtn from './ghost-btn';
import shape from './shape';
import theme from './theme';
import disabled from './disabled';
export default zpMixins.extend({
    components: {
        base,
        size,
        iconBtn,
        groupBtn,
        blockBtn,
        ghostBtn,
        shape,
        theme,
        disabled
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './button.less';
</style>
