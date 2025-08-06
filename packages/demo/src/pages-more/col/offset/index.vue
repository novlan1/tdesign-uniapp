<template>
    <view>
        <t-row gutter="16">
            <t-col span="8">
                <view class="dark">col-8</view>
            </t-col>
            <t-col span="8">
                <view class="dark">col-8</view>
            </t-col>
            <t-col span="8">
                <view class="dark">col-8</view>
            </t-col>
        </t-row>
    </view>
</template>

<script>
import tCol from './tdesign-miniprogram/col/col';
import tRow from './tdesign-miniprogram/row/row';
export default {
    components: {
        tCol,
        tRow
    },
    data() {
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
