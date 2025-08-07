<template>
    <view>
        <view class="group">
            <t-skeleton class="group-avatar" :rowCol="rowColsAvater" loading></t-skeleton>
            <t-skeleton class="group-content" :rowCol="rowColsContent" loading></t-skeleton>
        </view>

        <view class="group">
            <t-skeleton class="group-avatar" :rowCol="rowColsImage" loading></t-skeleton>
            <t-skeleton class="group-content" :rowCol="rowColsContent" loading></t-skeleton>
        </view>
    </view>
</template>

<script>
import tSkeleton from './tdesign-miniprogram/skeleton/skeleton';
export default {
    components: {
        tSkeleton
    },
    data() {
        return {
            rowColsAvater: [
                {
                    size: '96rpx',
                    type: 'circle'
                }
            ],
            rowColsImage: [
                {
                    size: '96rpx',
                    type: 'rect'
                }
            ],
            rowColsContent: [
                {
                    width: '50%'
                },
                {
                    width: '100%'
                }
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
