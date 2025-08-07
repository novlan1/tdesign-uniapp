<template>
    <view>
        <t-pull-down-refresh :value="enable" :loadingTexts="['下拉刷新', '松手刷新', '正在刷新', '刷新完成']" usingCustomNavbar @refresh="onRefresh" @scroll="onScroll">
            <!-- 包裹页面全部内容 -->
            <view class="demo">
                <t-demo-header title="PullDownRefresh 下拉刷新" desc="用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。" notice="渲染框架支持情况：WebView" />
                <view class="pulldown-refresh__content">
                    <t-skeleton :rowCol="rowCol1" loading></t-skeleton>
                    <view class="row">
                        <t-skeleton :rowCol="rowCol2" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol2" loading></t-skeleton>
                    </view>
                    <view class="row">
                        <t-skeleton :rowCol="rowCol2" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol2" loading></t-skeleton>
                    </view>
                    <view class="row">
                        <t-skeleton :rowCol="rowCol2" loading></t-skeleton>
                        <t-skeleton :rowCol="rowCol2" loading></t-skeleton>
                    </view>
                    <view class="text">拖拽该区域演示 顶部下拉刷新</view>
                </view>
                <t-back-top text="顶部" :scroll-top="scrollTop" :visibility-height="100" />
            </view>
        </t-pull-down-refresh>
    </view>
</template>

<script>
import tPullDownRefresh from './tdesign-miniprogram/pull-down-refresh/pull-down-refresh';
import tSkeleton from './tdesign-miniprogram/skeleton/skeleton';
import tBackTop from './tdesign-miniprogram/back-top/back-top';
export default {
    components: {
        tPullDownRefresh,
        tSkeleton,
        tBackTop
    },
    data() {
        return {
            enable: false,
            rowCol1: [
                {
                    width: '100%',
                    height: '342rpx',
                    borderRadius: '24rpx'
                }
            ],
            rowCol2: [
                [
                    {
                        width: '327rpx'
                    }
                ],
                [
                    {
                        width: '200rpx'
                    }
                ],
                [
                    {
                        size: '327rpx',
                        borderRadius: '24rpx'
                    }
                ]
            ],
            scrollTop: 0
        };
    },
    mounted() {
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    methods: {
        ready() {
            this.setData({
                enable: true
            });
            setTimeout(() => {
                this.setData({
                    enable: false
                });
            }, 1000);
        },

        onRefresh() {
            this.setData({
                enable: true
            });
            setTimeout(() => {
                this.setData({
                    enable: false
                });
            }, 1500);
        },

        onScroll(e) {
            const { scrollTop } = e.detail;
            this.setData({
                scrollTop
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
