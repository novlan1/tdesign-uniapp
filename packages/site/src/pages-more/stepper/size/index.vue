<template>
    <view class="stepper-example">
        <t-stepper :value="value" size="large" theme="filled" @change="handleChange" />
        <t-stepper defaultValue="3" max="99" theme="filled" />
        <t-stepper defaultValue="3" size="small" theme="filled" />
    </view>
</template>

<script>
import tCell from './tdesign-miniprogram/cell/cell';
import tStepper from './tdesign-miniprogram/stepper/stepper';
export default {
    components: {
        tCell,
        tStepper
    },
    data() {
        return {
            value: 3
        };
    },
    methods: {
        handleChange(e) {
            const { value } = e.detail;
            console.log(value);
            this.setData({
                value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
