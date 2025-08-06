<template>
    <view>
        <view class="demo-desc">垂直自定义步骤条</view>

        <view class="block">
            <t-steps layout="vertical" theme="dot" :current="count - 1" @change="onCascader">
                <t-step-item :title="_.getText(count - 1, index)" v-for="(item, index) in count" :key="index">
                    <t-icon name="chevron-right" size="44rpx" color="rgba(0, 0, 0, .4)" slot="title-right" />
                </t-step-item>
            </t-steps>

            <t-button style="margin-top: 32rpx; display: block" block @tap.native="toNext">下一步</t-button>
        </view>

        <view class="demo-desc">纯展示步骤条</view>

        <view class="block">
            <t-steps layout="vertical" readonly theme="dot" :current="5">
                <t-step-item title="步骤展示" content="可自定义此处内容" v-for="(item, index) in 4" :key="index"></t-step-item>
            </t-steps>
        </view>
    </view>
</template>
<script module="_" lang="wxs">
module.exports.getText = function(value, curr) { if (value > curr) return '已完成步骤'; if (value == curr)
return'当前步骤'; return '未完成步骤'; }
</script>
<script>
import tSteps from './tdesign-miniprogram/steps/steps';
import tStepItem from './tdesign-miniprogram/step-item/step-item';
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tSteps,
        tStepItem,
        tIcon
    },
    data() {
        return {
            count: 4
        };
    },
    methods: {
        toNext() {
            this.setData({
                count: this.count + 1
            });
        },
        onCascader(e) {
            const { current } = e.detail;
            this.setData({
                count: current + 1
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
