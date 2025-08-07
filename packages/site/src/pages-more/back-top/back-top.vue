<template>
    <view>
        <t-navbar class="demo-navbar" title="BackTop" leftArrow />
        <view class="demo">
            <t-demo-header title="BackTop 返回顶部" desc="用于当页面过长往下滑动时，帮助用户快速回到页面顶部。" notice="渲染框架支持情况：Skyline、WebView" />
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

            <base v-if="type == 'round'" :scroll-top="scrollTop" />
            <half-round v-if="type == 'half-round'" :scroll-top="scrollTop" />
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tButton from 'tdesign-uniapp/button/button';
import tSkeleton from 'tdesign-uniapp/skeleton/skeleton';
import base from './base';
import halfRound from './half-round';
export default zpMixins.extend({
    components: {
        tButton,
        tSkeleton,
        base,
        halfRound
    },
    data() {
        return {
            type: 'round',
            scrollTop: 0,
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
    onPageScroll(e: any) {
        const { scrollTop } = e;
        this.setData({
            scrollTop
        });
    },
    methods: {
        onBtnClick(e: any, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { source: type } = e.currentTarget.dataset;
            this.setData({
                type
            });
            uni.pageScrollTo({
                duration: 300,
                scrollTop: 1000
            });
        }
    }
});
</script>
<style lang="less">
@import './back-top.less';
</style>
