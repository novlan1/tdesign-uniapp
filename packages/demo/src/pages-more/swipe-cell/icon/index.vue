<template>
    <view>
        <t-swipe-cell :right="right" @click="onActionClick">
            <t-cell title="左滑-带图标文本双操作" note="辅助信息" :bordered="false" />
        </t-swipe-cell>

        <t-swipe-cell :right="rightIcon">
            <t-cell title="左滑-仅带图标双操作" note="辅助信息" :bordered="false" />
        </t-swipe-cell>

        <t-swipe-cell>
            <t-cell
                :bordered="false"
                title="左滑大列表-仅带图标双操作"
                description="一段很长很长的内容文字"
                note="辅助信息"
                image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
            />
            <view slot="right" class="btn-wrapper">
                <view class="btn edit-btn column" @tap="onEdit">
                    <t-icon class="padding-bottom" name="edit" size="32rpx"></t-icon>
                    编辑
                </view>
                <view class="btn delete-btn column" @tap="onDelete">
                    <t-icon class="padding-bottom" name="delete" size="32rpx"></t-icon>
                    删除
                </view>
            </view>
        </t-swipe-cell>
    </view>
</template>

<script>
import tSwipeCell from './tdesign-miniprogram/swipe-cell/swipe-cell';
import tCell from './tdesign-miniprogram/cell/cell';
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tSwipeCell,
        tCell,
        tIcon
    },
    data() {
        return {
            right: [
                {
                    text: '编辑',
                    icon: {
                        name: 'edit',
                        size: 16
                    },
                    className: 'btn edit-btn'
                },
                {
                    text: '删除',
                    icon: {
                        name: 'delete',
                        size: 16
                    },
                    className: 'btn delete-btn'
                }
            ],
            rightIcon: [
                {
                    icon: 'edit',
                    className: 'btn edit-btn'
                },
                {
                    icon: 'delete',
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
