<template>
    <view>
        <t-checkbox-group :value="value" @change="onChange">
            <view :class="'card ' + (_.contain(value, index) ? 'card--active' : '')" v-for="(item, index) in 3" :key="index">
                <t-icon v-if="_.contain(value, index)" name="check" t-class="card__icon" :ariaHidden="true" />

                <t-checkbox :value="index" label="多选" content="描述信息描述信息描述信息描述信息描述信息" icon="none" borderless />
            </view>
        </t-checkbox-group>

        <view class="demo-desc" style="margin: 48rpx 32rpx 32rpx">横向卡片多选框</view>

        <t-checkbox-group t-class="horizontal-box" :value="value1" @change="onChange1">
            <view :class="'card ' + (_.contain(value1, index) ? 'card--active' : '')" v-for="(item, index) in 3" :key="index">
                <t-icon v-if="_.contain(value1, index)" name="check" t-class="card__icon" :ariaHidden="true" />

                <t-checkbox :value="index" label="多选" icon="none" borderless />
            </view>
        </t-checkbox-group>
    </view>
</template>
<script module="_" lang="wxs">
module.exports.contain = function(arr, key) { return arr.indexOf(key) > -1 }
</script>
<script>
import tCheckboxGroup from './tdesign-miniprogram/checkbox-group/checkbox-group';
import tCheckbox from './tdesign-miniprogram/checkbox/checkbox';
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tCheckboxGroup,
        tCheckbox,
        tIcon
    },
    data() {
        return {
            value: [0, 1],
            value1: [0, 1]
        };
    },
    methods: {
        onChange(e) {
            this.setData({
                value: e.detail.value
            });
        },
        onChange1(e) {
            this.setData({
                value1: e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
