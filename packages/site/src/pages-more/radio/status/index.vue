<template>
    <view>
        <t-radio-group defaultValue="radio1" :disabled="true">
            <t-radio value="radio1" label="单选" />
            <t-radio value="radio2" label="单选" />
        </t-radio-group>
    </view>
</template>

<script>
import tRadioGroup from 'tdesign-uniapp/radio-group/radio-group';
import tRadio from 'tdesign-uniapp/radio/radio';
export default {
    components: {
        tRadioGroup,
        tRadio
    },
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {},
    /**
     * 组件的方法列表
     */
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
