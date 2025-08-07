<template>
    <view>
        <t-navbar class="demo-navbar" title="Fab" leftArrow />
        <t-demo-header title="Fab 悬浮按钮" desc="当功能使用图标即可表意清楚时，可使用纯图标悬浮按钮，例如：添加、发布。" notice="渲染框架支持情况：Skyline、WebView" />
        <t-demo title="01 组件类型" desc="纯图标悬浮按钮">
            <view class="wrapper">
                <t-button theme="primary" size="large" block variant="outline" @tap.native="handleChange($event, { type: 'base' })" data-type="base">纯图标悬浮按钮</t-button>
            </view>
        </t-demo>
        <t-demo desc="图标加文字悬浮按钮">
            <view class="wrapper">
                <t-button theme="primary" size="large" block variant="outline" @tap.native="handleChange($event, { type: 'advance' })" data-type="advance">
                    图标加文字悬浮按钮
                </t-button>
            </view>
        </t-demo>
        <t-demo title="02 组件样式" desc="可移动悬浮按钮">
            <view class="wrapper">
                <t-button theme="primary" size="large" block variant="outline" @tap.native="handleChange($event, { type: 'draggable' })" data-type="draggable">
                    可移动悬浮按钮
                </t-button>
            </view>
        </t-demo>
        <t-demo desc="带自动收缩功能">
            <view class="wrapper">
                <t-button theme="primary" size="large" block variant="outline" @tap.native="handleChange($event, { type: 'collapsible' })" data-type="collapsible">
                    带自动收缩功能
                </t-button>
            </view>
        </t-demo>
        <t-demo padding>
            <view class="skeleton-group">
                <t-skeleton :rowCol="rowCol" loading />
                <t-skeleton :rowCol="rowCol" loading />
            </view>
            <view class="skeleton-group">
                <t-skeleton :rowCol="rowCol" loading />
                <t-skeleton :rowCol="rowCol" loading />
            </view>
        </t-demo>

        <base v-if="type == 'base'" />
        <advance v-else-if="type == 'advance'" />
        <draggable v-else-if="type == 'draggable'" />
        <collapsible v-else-if="type == 'collapsible'" />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tButton from 'tdesign-uniapp/button/button';
import tSkeleton from 'tdesign-uniapp/skeleton/skeleton';
import base from './base';
import advance from './advance';
import draggable from './draggable';
import collapsible from './collapsible';
export default zpMixins.extend({
    components: {
        tButton,
        tSkeleton,
        base,
        advance,
        draggable,
        collapsible
    },
    data() {
        return {
            type: 'base',
            rowCol: [
                {
                    size: '327rpx',
                    borderRadius: '24rpx'
                },
                1,
                {
                    width: '61%'
                }
            ]
        };
    },
    onPageScroll() {},
    methods: {
        handleChange(e: any, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            this.setData({
                type: e.target.dataset.type
            });
        }
    }
});
</script>
<style lang="less">
@import './fab.less';
</style>
