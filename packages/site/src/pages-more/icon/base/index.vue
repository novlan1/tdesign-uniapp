<template>
    <view class="demo__list">
        <view class="demo__card" v-for="(item, index) in icons" :key="index">
            <t-icon :name="item" size="48rpx" :data-name="item" @click="onIconTap($event, { name: item })" />

            <view class="demo__card-name">{{ item }}</view>
        </view>
    </view>
</template>

<script>
import tIcon from './tdesign-miniprogram/icon/icon';
import icons from '../data';
export default {
    components: {
        tIcon
    },
    data() {
        return {
            icons
        };
    },
    methods: {
        onIconTap(event, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(event, _dataset);
            /* ---处理dataset end--- */
            const { name, type } = event.currentTarget.dataset;
            if (type === 'prefix') {
                return;
            }
            uni.showToast({
                title: name,
                icon: 'none',
                duration: 1000
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
