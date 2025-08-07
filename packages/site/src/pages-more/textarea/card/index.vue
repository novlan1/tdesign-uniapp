<template>
    <view class="textarea-example">
        <t-textarea t-class="external-class" label="标签文字" placeholder="请输入文字" maxlength="500" indicator :disableDefaultPadding="true" :style="style" />
    </view>
</template>

<script>
import tTextarea from './tdesign-miniprogram/textarea/textarea';
export default {
    components: {
        tTextarea
    },
    data() {
        return {
            style: 'border-radius: 18rpx;'
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
