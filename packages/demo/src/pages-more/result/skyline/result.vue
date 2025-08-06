<template>
    <view class="skyline">
        <t-navbar class="demo-navbar" title="Result" left-arrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo">
                <view class="demo-title">Result 结果</view>
                <view class="demo-desc">用于反馈不同结果的展示。</view>
                <t-demo title="组件类型" desc="基础结果">
                    <theme />
                </t-demo>
                <t-demo desc="带描述的结果">
                    <description />
                </t-demo>
                <t-demo desc="自定义结果">
                    <custom />
                </t-demo>
                <t-demo desc="页面示例">
                    <view class="demo-section__wrapper">
                        <t-button theme="primary" block size="large" variant="outline" @tap.native="goResultPage">页面示例</t-button>
                    </view>
                </t-demo>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import tButton from './tdesign-miniprogram/button/button';
import theme from '../theme';
import description from '../description';
import custom from '../custom';
export default zpMixins.extend({
    components: {
        tNavbar,
        tButton,
        theme,
        description,
        custom
    },
    data() {
        return {};
    },
    methods: {
        goResultPage() {
            uni.navigateTo({
                url: '../result-page'
            });
        }
    }
});
</script>
<style lang="less">
@import './result.less';
</style>
