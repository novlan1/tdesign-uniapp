<template>
    <view class="demo__list">
        <view class="demo__card" v-for="(item, index) in imageIconList" :key="index">
            <t-icon :name="item" size="48rpx" :data-name="item" @click="onIconTap($event, { name: item })" />
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
            imageIconList: ['https://tdesign.gtimg.com/mobile/demos/icon1.png', 'https://tdesign.gtimg.com/mobile/demos/icon2.png']
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
