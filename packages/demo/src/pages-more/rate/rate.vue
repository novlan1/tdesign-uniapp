<template>
    <view>
        <t-navbar title="Rate" leftArrow />
        <view class="demo">
            <t-demo-header title="Rate 评分" desc="用于对某行为/事物进行打分。" notice="渲染框架支持情况：WebView" />
            <t-demo title="01 组件类型">
                <view class="demo-desc">实心评分</view>
                <base />

                <view class="demo-desc">自定义评分</view>
                <custom />

                <view class="demo-desc">第三方图标评分</view>
                <custom-prefix />

                <view class="demo-desc">自定义评分数量</view>
                <count />

                <view class="demo-desc">带描述评分</view>
                <show-text />
            </t-demo>

            <t-demo title="02 组件状态">
                <action />
            </t-demo>

            <t-demo title="03 组件样式">
                <view class="demo-desc">评分大小</view>
                <size />

                <view class="demo-desc">设置评分颜色</view>
                <color />
            </t-demo>

            <t-demo title="04 特殊样式" desc="竖向带描述评分" />
            <special />
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import custom from './custom';
import customPrefix from './custom-prefix';
import special from './special';
import count from './count';
import action from './action';
import showText from './show-text';
import color from './color';
import size from './size';
export default zpMixins.extend({
    components: {
        base,
        custom,
        customPrefix,
        special,
        count,
        action,
        showText,
        color,
        size
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './rate.less';
</style>
