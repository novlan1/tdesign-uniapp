<template>
    <view>
        <view class="tr">
            <view class="col">
                <view class="text">加载默认提示</view>
                <t-image id="loading-img" shape="round" width="72" height="72" />
            </view>
            <view class="col">
                <view class="text">加载自定义提示</view>
                <t-image id="loading-img-custom" shape="round" loading="slot" width="72" height="72">
                    <t-loading slot="loading" theme="spinner" size="40rpx" loading />
                </t-image>
            </view>
        </view>

        <view class="tr">
            <view class="col">
                <view class="text">失败默认提示</view>
                <t-image id="loading-img" shape="round" src="" width="72" height="72" />
            </view>
            <view class="col">
                <view class="text">失败自定义提示</view>
                <t-image src="" shape="round" error="slot" width="72" height="72">
                    <text class="error-text" slot="error">加载失败</text>
                </t-image>
            </view>
        </view>
    </view>
</template>

<script>
import tImage from './tdesign-miniprogram/image/image';
import tLoading from './tdesign-miniprogram/loading/loading';
export default {
    components: {
        tImage,
        tLoading
    },
    data() {
        return {
            isLoading: false,
            isFailed: false
        };
    },
    methods: {
        handlePageShow: function () {
            const $ele1 = this.zpSelectComponent('#loading-img');
            const $ele2 = this.zpSelectComponent('#loading-img-custom');
            this.setLoadingStatus($ele1);
            this.setLoadingStatus($ele2);
        },

        setLoadingStatus(ele) {
            ele.onLoadError = null;
            ele.onLoaded = null;
            ele.setData({
                isLoading: true,
                isFailed: false
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
