<template>
    <view>
        <t-navbar class="demo-navbar" title="Result Page" leftArrow />
        <view class="page">
            <view class="demo-section__wrapper">
                <t-result theme="success" title="成功状态" description="描述文字" />
            </view>
            <view class="demo-section__wrapper">
                <t-button theme="primary" block size="large" variant="outline" @tap.native="goBack">返回</t-button>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tButton from 'tdesign-uniapp/button/button';
import tResult from 'tdesign-uniapp/result/result';
export default zpMixins.extend({
    components: {
        tButton,
        tResult
    },
    data() {
        return {};
    },
    methods: {
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        }
    }
});
</script>
<style lang="less">
@import './result-page.less';
</style>
