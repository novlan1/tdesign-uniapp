<template>
    <view>
        <t-progress :percentage="percentage" :ariaLabel="percentage + '%'" />

        <view class="button-group">
            <t-button @tap.native="clickReduce" theme="primary" variant="plain" size="small">减少</t-button>
            <view class="space"></view>
            <t-button @tap.native="clickAdd" theme="primary" size="small">增加</t-button>
        </view>
    </view>
</template>

<script>
import tProgress from 'tdesign-uniapp/progress/progress';
import tButton from 'tdesign-uniapp/button/button';
export default {
    components: {
        tProgress,
        tButton
    },
    data() {
        return {
            percentage: 88
        };
    },
    methods: {
        clickAdd() {
            this.setData({
                percentage: Math.min(this.percentage + 10, 100)
            });
        },
        clickReduce() {
            this.setData({
                percentage: Math.max(0, this.percentage - 10)
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
