<template>
    <view>
        <t-fab :customStyle="scrolling ? 'right: 0;bottom:64px;' : 'right:16px;bottom:24px'" @click="handleClick" @dragstart="handleDragStart" @dragend="handleDragEnd">
            <view v-if="!scrolling" class="wrap">
                <view class="item">
                    <t-icon name="add-circle" size="20" />
                    <view class="text">添加</view>
                </view>
                <view class="item">
                    <t-icon name="star" size="20" />
                    <view class="text">收藏</view>
                </view>
                <view class="item">
                    <t-icon name="jump" size="20" />
                    <view class="text">分享</view>
                </view>
            </view>
            <view v-else class="symbol">
                <t-icon name="chevron-left" size="20" />
            </view>
        </t-fab>
    </view>
</template>

<script>
import tFab from './tdesign-miniprogram/fab/fab';
import tIcon from './tdesign-miniprogram/icon/icon';
import pageScrollMixin from './tdesign-miniprogram/mixins/page-scroll';
export default {
    components: {
        tFab,
        tIcon
    },
    data() {
        return {
            scrolling: false,
            timer: null
        };
    },
    mixins: [pageScrollMixin()],
    methods: {
        handleClick(e) {
            console.log('handleClick: ', e);
        },
        handleDragStart(e) {
            console.log('handleDragStart: ', e);
        },
        handleDragEnd(e) {
            console.log('handleDragEnd: ', e);
        },
        onScroll() {
            clearTimeout(this.timer);
            this.setData({
                scrolling: true
            });
            this.timer = setTimeout(() => {
                this.setData({
                    scrolling: false
                });
            }, 100);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
