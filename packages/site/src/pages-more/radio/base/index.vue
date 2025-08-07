<template>
    <view>
        <t-radio-group @change="onChange" allow-uncheck :value="current" :options="options" />
    </view>
</template>

<script>
import tRadioGroup from './tdesign-miniprogram/radio-group/radio-group';
import tRadio from './tdesign-miniprogram/radio/radio';
export default {
    components: {
        tRadioGroup,
        tRadio
    },
    data() {
        return {
            current: 1,
            options: [
                {
                    value: 0,
                    label: '单选'
                },
                {
                    value: 1,
                    label: '单选'
                },
                {
                    value: 2,
                    label: '单选单选单选单选单选单选单选单选单选单选单选单选单选单选'
                },
                {
                    value: 3,
                    label: '单选',
                    content: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息'
                }
            ]
        };
    },
    methods: {
        onChange(event) {
            const { value } = event.detail;
            this.setData({
                current: value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
