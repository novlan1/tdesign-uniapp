<template>
    <view>
        <view class="demo-desc">水平带序号步骤条</view>

        <view class="block">
            <t-steps :current="first" @change="onFirstChange">
                <t-step-item :title="_.getText(first, index)" content="辅助信息" v-for="(item, index) in 4" :key="index"></t-step-item>
            </t-steps>
        </view>

        <view class="demo-desc">水平带图标步骤条</view>

        <view class="block">
            <t-steps :current="second" @change="onSecondChange">
                <t-step-item :title="_.getText(second, index)" content="辅助信息" icon="cart" v-for="(item, index) in 4" :key="index"></t-step-item>
            </t-steps>
        </view>

        <view class="demo-desc">水平简略步骤条</view>

        <view class="block">
            <t-steps theme="dot" :current="third" @change="onThirdChange">
                <t-step-item :title="_.getText(third, index)" content="辅助信息" v-for="(item, index) in 4" :key="index"></t-step-item>
            </t-steps>
        </view>
    </view>
</template>
<script module="_" lang="wxs">
module.exports.getText = function(value, curr) { if (value > curr) return '已完成'; if (value == curr)
return'当前步骤'; return '未完成'; }
</script>
<script>
import tSteps from 'tdesign-uniapp/steps/steps';
import tStepItem from 'tdesign-uniapp/step-item/step-item';
export default {
    components: {
        tSteps,
        tStepItem
    },
    data() {
        return {
            first: 1,
            second: 1,
            third: 1
        };
    },
    methods: {
        onFirstChange(e) {
            this.setData({
                first: e.detail.current
            });
        },
        onSecondChange(e) {
            this.setData({
                second: e.detail.current
            });
        },
        onThirdChange(e) {
            this.setData({
                third: e.detail.current
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
