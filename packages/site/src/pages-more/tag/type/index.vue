<template>
    <view>
        <view class="demo">
            <view class="demo-desc">基础标签</view>

            <t-tag class="margin-16" variant="light">标签文字</t-tag>
            <t-tag class="margin-16" variant="outline">标签文字</t-tag>
        </view>

        <view class="demo">
            <view class="demo-desc">圆弧标签</view>

            <t-tag class="margin-16" variant="light" shape="round">标签文字</t-tag>
            <t-tag class="margin-16" variant="outline" shape="round">标签文字</t-tag>
            <t-tag class="margin-16" variant="outline" shape="mark">标签文字</t-tag>
        </view>

        <view class="demo">
            <view class="demo-desc">带图标的标签</view>

            <t-tag class="margin-16" variant="light" icon="discount">标签文字</t-tag>
            <t-tag class="margin-16" variant="outline" icon="discount">标签文字</t-tag>
        </view>

        <!-- skyline暂不支持设置后max-width超出省略 -->
        <view class="demo" v-if="!skylineRender">
            <view class="demo-desc">超长省略文本标签</view>

            <t-tag :max-width="130" variant="light">超长省略文本标签超长省略文本标签</t-tag>
        </view>
    </view>
</template>

<script>
import tTag from 'tdesign-uniapp/tag/tag';
import SkylineBehavior from '@behaviors/skyline.js';
export default {
    components: {
        tTag
    },
    data() {
        return {
            skylineRender: ''
        };
    },
    mixins: [SkylineBehavior],
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
