<template>
    <view>
        <t-notice-bar :visible="visible" suffixIcon="chevron-right" @click="click">
            <view slot="content" class="inline">这是一条普通的通知信息</view>
            <t-link slot="operation" content="详情" theme="primary" :underline="false" :navigator-props="navigatorProps" />
        </t-notice-bar>

        <t-notice-bar :visible="visible" suffixIcon="chevron-right" content="这是一条普通的通知信息" @click="click"></t-notice-bar>
    </view>
</template>

<script>
import tNoticeBar from './tdesign-miniprogram/notice-bar/notice-bar';
import tLink from './tdesign-miniprogram/link/link';
export default {
    components: {
        tNoticeBar,
        tLink
    },
    data() {
        return {
            visible: true,
            navigatorProps: {
                url: '/pages/xxx/xxx'
            }
        };
    },
    methods: {
        click(e) {
            const { trigger } = e.detail;
            console.log(`click on the ${trigger} area`);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
