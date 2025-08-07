<template>
    <view>
        <t-navbar title="Tabs" leftArrow />
        <view class="demo">
            <t-demo-header title="Tabs 选项卡" desc="用于内容分类后的展示切换。" notice="渲染框架支持情况：WebView" />
            <t-demo title="01 组件类型" desc="基础选项卡">
                <base />
            </t-demo>
            <t-demo desc="等距选项卡">
                <scroll />
            </t-demo>
            <t-demo desc="带图标选项卡">
                <with-icon />
            </t-demo>
            <t-demo desc="带徽标选项卡">
                <with-badge />
            </t-demo>
            <t-demo desc="带内容区选项卡">
                <with-content />
            </t-demo>
            <t-demo title="02 组件状态" desc="选项卡状态">
                <status />
            </t-demo>
            <t-demo title="03 组件样式" desc="选项卡尺寸">
                <size />
            </t-demo>
            <t-demo desc="选项卡样式">
                <theme />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import scroll from './scroll';
import size from './size';
import status from './status';
import withIcon from './with-icon';
import withBadge from './with-badge';
import theme from './theme';
import withContent from './with-content';
export default zpMixins.extend({
    components: {
        base,
        scroll,
        size,
        status,
        withIcon,
        withBadge,
        theme,
        withContent
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './tabs.less';
</style>
