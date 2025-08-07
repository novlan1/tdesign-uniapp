<template>
    <view>
        <t-swipe-cell>
            <t-cell title="右滑单操作" note="辅助信息" :bordered="false" />
            <view slot="left" class="btn favor-btn" @tap="onChoice">选择</view>
        </t-swipe-cell>
    </view>
</template>

<script>
import tSwipeCell from './tdesign-miniprogram/swipe-cell/swipe-cell';
import tCell from './tdesign-miniprogram/cell/cell';
export default {
    components: {
        tSwipeCell,
        tCell
    },
    data() {
        return {};
    },
    methods: {
        onChoice() {
            uni.showToast({
                title: '你点击了选择',
                icon: 'none'
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
