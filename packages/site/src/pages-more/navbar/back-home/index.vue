<template>
    <view>
        <t-navbar t-class-placeholder="t-navbar-placeholder" t-class-content="t-navbar-content" title="标题文字">
            <view slot="capsule" class="custom-capsule">
                <t-icon size="40rpx" @tap.native="onBack" aria-role="button" aria-label="返回" name="chevron-left" class="custom-capsule__icon back" />
                <t-icon size="40rpx" @tap.native="onGoHome" aria-role="button" aria-label="首页" name="home" class="custom-capsule__icon home" />
            </view>
        </t-navbar>
    </view>
</template>

<script>
import tNavbar from 'tdesign-uniapp/navbar/navbar';
import tIcon from 'tdesign-uniapp/icon/icon';
export default {
    components: {
        tNavbar,
        tIcon
    },
    data() {
        return {};
    },
    methods: {
        onBack() {
            uni.navigateBack();
        },
        onGoHome() {
            uni.reLaunch({
                url: '/pages/home/home'
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
