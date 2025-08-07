<template>
    <view class="stepper-example">
        <t-stepper defaultValue="0" theme="filled" />
        <t-stepper defaultValue="99" theme="filled" min="5" max="999" />
        <t-stepper defaultValue="999" theme="filled" max="999" />
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
