<template>
    <view>
        <t-input label="标签文字" placeholder="请输入文字" :suffixIcon="" @click="click" />

        <t-input class="extra" label="标签文字" placeholder="请输入文字" tips="最多十个字">
            <t-button slot="extra" theme="primary" :maxcharacter="10" size="extra-small">操作按钮</t-button>
        </t-input>

        <t-input label="标签文字" placeholder="请输入文字" :suffixIcon="" />
    </view>
</template>

<script>
import tButton from './tdesign-miniprogram/button/button';
import tInput from './tdesign-miniprogram/input/input';
export default {
    components: {
        tButton,
        tInput
    },
    data() {
        return {};
    },
    methods: {
        click(e) {
            const { trigger } = e.detail;
            console.log('click: ', trigger);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
