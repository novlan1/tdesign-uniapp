<template>
    <view>
        <view class="button-example">
            <t-button theme="primary" size="large">填充按钮</t-button>
            <t-button theme="primary" size="large" icon="search" shape="square" aria-label="搜索"></t-button>
            <t-button theme="primary" size="large" shape="round">填充按钮</t-button>
            <t-button theme="primary" size="large" icon="search" shape="circle" aria-label="搜索"></t-button>
        </view>

        <t-button theme="primary" size="large" block t-class="external-class">填充按钮</t-button>
    </view>
</template>

<script>
import tButton from './tdesign-miniprogram/button/button';
export default {
    components: {
        tButton
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
