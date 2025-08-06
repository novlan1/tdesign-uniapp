<template>
    <view>
        <t-swipe-cell>
            <t-cell title="左滑单操作" note="辅助信息" :bordered="false" />
            <view slot="right" class="btn delete-btn" @tap="onDelete">删除</view>
        </t-swipe-cell>

        <t-swipe-cell>
            <t-cell :bordered="false" title="左滑大列表" description="一段很长很长的内容文字" note="辅助信息" image="https://tdesign.gtimg.com/mobile/demos/avatar1.png" />
            <view slot="right" class="btn delete-btn" @tap="onDelete">删除</view>
        </t-swipe-cell>

        <t-swipe-cell :right="right" @click="onActionClick">
            <t-cell title="左滑双操作" note="辅助信息" :bordered="false" />
        </t-swipe-cell>

        <t-swipe-cell>
            <t-cell title="左滑多操作" note="辅助信息" :bordered="false" />
            <view slot="right" class="btn-wrapper">
                <view class="btn favor-btn" @tap="onFavor">收藏</view>
                <view class="btn edit-btn" @tap="onEdit">编辑</view>
                <view class="btn delete-btn" @tap="onDelete">删除</view>
            </view>
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
                    text: '编辑',
                    className: 'btn edit-btn'
                },
                {
                    text: '删除',
                    className: 'btn delete-btn'
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
        },
        onDelete() {
            uni.showToast({
                title: '你点击了删除',
                icon: 'none'
            });
        },
        onEdit() {
            uni.showToast({
                title: '你点击了编辑',
                icon: 'none'
            });
        },
        onFavor() {
            uni.showToast({
                title: '你点击了收藏',
                icon: 'none'
            });
        },
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
