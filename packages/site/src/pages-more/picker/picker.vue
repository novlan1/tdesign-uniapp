<template>
    <view>
        <t-navbar title="Picker" leftArrow />
        <view class="area-picker-demo">
            <t-demo-header title="Picker 选择器" desc="用于一组预设数据中的选择。" notice="渲染框架支持情况：WebView" />
            <t-demo title="01 组件类型" desc="基础选择器">
                <base />
                <area />
            </t-demo>
            <t-demo title="02 组件样式" desc="是否带标题">
                <with-title />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import withTitle from './with-title';
import area from './area';
import withoutPopup from './without-popup';
export default zpMixins.extend({
    components: {
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
