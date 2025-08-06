<template>
    <view class="demo">
        <view class="container">
            <t-icon :name="failImage" size="224rpx" color="#DCDCDC" />
            <view class="fail-error">页面加载错误</view>
            <t-button class="fail-button" @tap.native="toHome">回到首页</t-button>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
export default zpMixins.extend({
    data() {
        return {
            failImage: 'error-circle-filled'
        };
    },
    methods: {
        toHome() {
            uni.reLaunch({
                url: '/pages/home/home'
            });
        }
    }
});
</script>
<style lang="less">
@import './navigateFail.less';
</style>
