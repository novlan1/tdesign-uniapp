<template>
    <view>
        <t-radio-group :value="value" allow-uncheck @change="onChange">
            <view :class="'card ' + (value == index ? 'card--active' : '')" v-for="(item, index) in 3" :key="index">
                <t-icon v-if="value == index" name="check" t-class="card__icon" />

                <t-radio :value="index" label="单选" content="描述信息描述信息描述信息描述信息描述信息" icon="none" borderless />
            </view>
        </t-radio-group>

        <view class="demo-desc" style="margin: 48rpx 32rpx 32rpx">横向卡片单选框</view>

        <t-radio-group t-class="horizontal-box" :value="value1" @change="onChange1">
            <view :class="'card ' + (value1 == index ? 'card--active' : '')" v-for="(item, index) in 3" :key="index">
                <t-icon v-if="value1 == index" name="check" t-class="card__icon" />

                <t-radio :value="index" label="单选" icon="none" borderless />
            </view>
        </t-radio-group>
    </view>
</template>

<script>
import tRadioGroup from 'tdesign-uniapp/radio-group/radio-group';
import tRadio from 'tdesign-uniapp/radio/radio';
import tIcon from 'tdesign-uniapp/icon/icon';
export default {
    components: {
        tRadioGroup,
        tRadio,
        tIcon
    },
    data() {
        return {
            value: 0,
            value1: 0
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
