<template>
    <view class="skyline">
        <t-navbar class="block" title="BackTop" left-arrow />
        <scroll-view scroll-y type="list" class="scroll-view" :scroll-top="scrollTo" @scroll="onScroll">
            <view class="demo">
                <view class="demo-title">BackTop 返回顶部</view>
                <view class="demo-desc">用于当页面过长往下滑动时，帮助用户快速回到页面顶部。</view>

                <t-demo title="组件类型" desc="圆形返回顶部" padding>
                    <t-button theme="primary" size="large" block variant="outline" data-source="round" @tap.native="onBtnClick($event, { source: 'round' })">圆形返回顶部</t-button>
                </t-demo>
                <t-demo desc="半圆形返回顶部" padding>
                    <t-button theme="primary" size="large" block variant="outline" data-source="half-round" @tap.native="onBtnClick($event, { source: 'half-round' })">
                        半圆形返回顶部
                    </t-button>
                </t-demo>
                <t-demo padding>
                    <view class="container-flex">
                        <t-skeleton :rowCol="rowCol" class="skeleton-item" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol" class="skeleton-item" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol" class="skeleton-item" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol" class="skeleton-item" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol" class="skeleton-item" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol" class="skeleton-item" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol" class="skeleton-item" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol" class="skeleton-item" loading></t-skeleton>
                    </view>
                </t-demo>

                <base v-if="type == 'round'" :scroll-top="scrollTop" @to-top="onToTop" />
                <half-round v-if="type == 'half-round'" :scroll-top="scrollTop" @to-top="onToTop" />
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import tButton from './tdesign-miniprogram/button/button';
import tSkeleton from './tdesign-miniprogram/skeleton/skeleton';
import base from '../base';
import halfRound from '../half-round';
export default zpMixins.extend({
    components: {
        tNavbar,
        tButton,
        tSkeleton,
        base,
        halfRound
    },
    data() {
        return {
            type: 'round',
            scrollTop: 0,
            scrollTo: 0,
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
    methods: {
        onScroll(e: any) {
            const { scrollTop } = e.detail;
            this.setData({
                scrollTop
            });
        },

        onToTop() {
            this.setData({
                scrollTo: 0
            });
        },

        onBtnClick(e: any, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { source: type } = e.currentTarget.dataset;
            this.setData({
                type
            });
            this.setData({
                scrollTo: 800
            });
        }
    }
});
</script>
<style lang="less">
@import './back-top.less';
</style>
