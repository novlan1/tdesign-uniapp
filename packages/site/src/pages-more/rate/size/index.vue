<template>
    <view>
        <view class="demo-rate">
            <view class="demo-rate__title">大尺寸 24</view>
            <t-rate :value="value[0]" :data-index="0" @change="onChange($event, { index: 0 })" />
        </view>
        <view class="demo-rate">
            <view class="demo-rate__title">小尺寸 20</view>
            <t-rate :value="value[1]" :data-index="1" @change="onChange($event, { index: 1 })" :size="20" />
        </view>
    </view>
</template>

<script>
import tRate from 'tdesign-uniapp/rate/rate';
export default {
    components: {
        tRate
    },
    data() {
        return {
            value: [3, 3]
        };
    },
    methods: {
        onChange(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { index } = e.currentTarget.dataset;
            const { value } = e.detail;
            this.setData({
                [`value[${index}]`]: value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
