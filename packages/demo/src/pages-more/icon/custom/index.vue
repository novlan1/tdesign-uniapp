<template>
    <view class="demo__list">
        <view class="demo__card" v-for="(item, index) in prefixIcons" :key="index">
            <t-icon :name="item" size="48rpx" prefix="icon" :data-name="item" data-type="prefix" @click="onIconTap($event, { name: item, type: 'prefix' })" />

            <view class="demo__card-name">{{ item }}</view>
        </view>
    </view>
</template>

<script>
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tIcon
    },
    data() {
        return {
            prefixIcons: ['a-0', 'a-1h', 'a-2h', 'a-3h']
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
