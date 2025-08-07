<template>
    <view>
        <t-navbar class="demo-navbar" title="SideBar" leftArrow />

        <t-demo-header title="SideBar 侧边栏" desc="用于内容分类后的展示切换。" notice="渲染框架支持情况：WebView" />
        <t-demo title="01 组件类型" desc="侧边导航用法" padding>
            <t-button variant="outline" theme="primary" size="large" block @tap.native="toNavigation($event, { target: 'base' })" data-target="base">锚点用法</t-button>

            <t-button variant="outline" theme="primary" size="large" block @tap.native="toNavigation($event, { target: 'switch' })" data-target="switch">切页用法</t-button>
        </t-demo>

        <t-demo desc="带图标侧边导航" padding>
            <t-button variant="outline" theme="primary" size="large" block @tap.native="toNavigation($event, { target: 'with-icon' })" data-target="with-icon">
                带图标侧边导航
            </t-button>
        </t-demo>

        <t-demo title="02 组件样式" desc="侧边导航样式" padding>
            <t-button variant="outline" theme="primary" size="large" block @tap.native="toNavigation($event, { target: 'custom' })" data-target="custom">自定义样式</t-button>
        </t-demo>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        toNavigation(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { target } = e.target.dataset;
            uni.navigateTo({
                url: `./${target}/index`
            });
        }
    }
};
</script>
<style lang="less">
@import './side-bar.less';
</style>
