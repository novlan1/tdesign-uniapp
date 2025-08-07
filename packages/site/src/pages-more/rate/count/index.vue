<template>
    <view class="demo-rate">
        <view class="demo-rate__title">自定义评分数量</view>
        <!-- 自定义评分数量，设置属性：count -->
        <t-rate :value="value" :count="3" @change="onChange" />
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
            value: 2
        };
    },
    methods: {
        onChange(e) {
            const { value } = e.detail;
            this.setData({
                value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
