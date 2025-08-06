<template>
    <view>
        <t-navbar title="Collapse" leftArrow />
        <view class="demo">
            <t-demo-header title="Collapse 折叠面板" desc="可以折叠/展开的内容区域。" notice="渲染框架支持情况：WebView" />
            <t-demo title="01 组件类型" desc="基础折叠面板">
                <base />
            </t-demo>

            <t-demo desc="向上展开">
                <placement />
            </t-demo>

            <t-demo desc="带操作说明">
                <action />
            </t-demo>

            <t-demo desc="手风琴式">
                <accordion />
            </t-demo>

            <t-demo title="02 组件样式" desc="卡片折叠面板">
                <theme />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import placement from './placement';
import action from './action';
import accordion from './accordion';
import theme from './theme';
export default zpMixins.extend({
    components: {
        base,
        placement,
        action,
        accordion,
        theme
    },
    data() {
        return {
            activeValues: [0]
        };
    },
    methods: {
        handleChange(e: any) {
            this.setData({
                activeValues: e.detail.value
            });
        }
    }
});
</script>
<style lang="less">
@import './collapse.less';
</style>
