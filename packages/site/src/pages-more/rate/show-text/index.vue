<template>
    <view>
        <view class="demo-rate">
            <view class="demo-rate__title">带描述评分</view>
            <!-- 自定义带描述评分，设置属性：texts -->
            <t-rate :value="value[0]" :data-index="0" @change="onChange($event, { index: 0 })" :showText="true" :texts="texts" />
        </view>
        <view class="demo-rate">
            <view class="demo-rate__title">带描述评分</view>
            <!-- 带描述评分，设置属性：showText -->
            <t-rate :value="value[1]" :data-index="1" @change="onChange($event, { index: 1 })" :showText="true" />
        </view>

        <view class="demo-rate">
            <view class="demo-rate__title">带描述评分</view>
            <t-rate :value="value[2]" :data-index="2" @change="onChange($event, { index: 2 })" :showText="true" />
        </view>
    </view>
</template>

<script>
import tRate from './tdesign-miniprogram/rate/rate';
export default {
    components: {
        tRate
    },
    data() {
        return {
            value: [3, 3, 0],
            texts: ['1分', '2分', '3分', '4分', '5分']
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
