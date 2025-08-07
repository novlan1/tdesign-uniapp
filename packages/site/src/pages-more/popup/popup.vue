<template>
    <view>
        <t-navbar class="demo-navbar" title="Popup" leftArrow />
        <t-demo-header title="Popup 弹出层" desc="由其他控件触发，屏幕滑出或弹出一块自定义内容区域。" notice="渲染框架支持情况：Skyline、WebView" />
        <view class="tdesign-demo-popup">
            <t-demo title="01 组件类型" desc="基础弹出层" padding>
                <base />
            </t-demo>
            <t-demo title="02 组件示例" desc="应用示例" padding>
                <with-title />
                <custom-close style="display: block; margin-top: 32rpx" />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import withTitle from './with-title';
import customClose from './custom-close';
export default zpMixins.extend({
    components: {
        base,
        withTitle,
        customClose
    },
    data() {
        return {
            bottom: false,
            center: false,
            left: false,
            right: false,
            placement: ''
        };
    },
    methods: {
        handlePopup(e: any) {
            const placement = e.currentTarget.dataset.type;
            this.placement = placement;
            this.setData({
                [placement]: true
            });
        },

        onVisibleChange({ detail }) {
            const { visible } = detail;
            if (this.placement) {
                this.setData({
                    [this.placement]: visible
                });
            }
        }
    }
});
</script>
<style lang="less">
@import './popup.less';
</style>
