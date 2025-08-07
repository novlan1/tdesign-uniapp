<template>
    <view class="group">
        <t-skeleton :rowCol="rowCol" loading></t-skeleton>
        <t-skeleton :rowCol="rowCol" loading></t-skeleton>
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
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
