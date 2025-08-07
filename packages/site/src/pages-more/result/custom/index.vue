<template>
    <view>
        <t-result t-class-image="external-class-image" image="https://tdesign.gtimg.com/mobile/demos/result1.png">
            <view slot="title">自定义结果</view>
            <view slot="description">描述文字</view>
        </t-result>
    </view>
</template>

<script>
import tResult from 'tdesign-uniapp/result/result';
export default {
    components: {
        tResult
    },
    data() {
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
