<template>
    <view class="wrapper">
        <t-skeleton :rowCol="grid" loading></t-skeleton>
    </view>
</template>

<script>
import tSkeleton from 'tdesign-uniapp/skeleton/skeleton';
export default {
    components: {
        tSkeleton
    },
    data() {
        return {
            grid: [
                [
                    {
                        width: '96rpx',
                        height: '96rpx',
                        borderRadius: '12rpx'
                    },
                    {
                        width: '96rpx',
                        height: '96rpx',
                        borderRadius: '12rpx'
                    },
                    {
                        width: '96rpx',
                        height: '96rpx',
                        borderRadius: '12rpx'
                    },
                    {
                        width: '96rpx',
                        height: '96rpx',
                        borderRadius: '12rpx'
                    },
                    {
                        width: '96rpx',
                        height: '96rpx',
                        borderRadius: '12rpx'
                    }
                ],
                [
                    {
                        width: '96rpx',
                        height: '32rpx',
                        borderRadius: '6rpx'
                    },
                    {
                        width: '96rpx',
                        height: '32rpx',
                        borderRadius: '6rpx'
                    },
                    {
                        width: '96rpx',
                        height: '32rpx',
                        borderRadius: '6rpx'
                    },
                    {
                        width: '96rpx',
                        height: '32rpx',
                        borderRadius: '6rpx'
                    },
                    {
                        width: '96rpx',
                        height: '32rpx',
                        borderRadius: '6rpx'
                    }
                ]
            ]
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
