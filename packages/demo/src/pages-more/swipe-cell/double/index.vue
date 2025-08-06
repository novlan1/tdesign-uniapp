<template>
    <view>
        <t-swipe-cell :right="right" :left="left" @click="onActionClick">
            <t-cell title="左右滑操作" note="辅助信息" :bordered="false" />
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
        return {
            right: [
                {
                    text: '删除',
                    className: 'btn delete-btn'
                }
            ],
            left: [
                {
                    text: '选择',
                    className: 'btn favor-btn'
                }
            ]
        };
    },
    methods: {
        onActionClick({ detail }) {
            uni.showToast({
                title: `你点击了${detail.text}`,
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
