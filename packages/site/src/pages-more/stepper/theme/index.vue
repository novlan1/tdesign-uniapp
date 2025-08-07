<template>
    <view class="stepper-example">
        <t-stepper defaultValue="3" theme="filled" />
        <t-stepper defaultValue="3" theme="outline" />
        <t-stepper defaultValue="3" />
    </view>
</template>

<script>
import tStepper from 'tdesign-uniapp/stepper/stepper';
export default {
    components: {
        tStepper
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
