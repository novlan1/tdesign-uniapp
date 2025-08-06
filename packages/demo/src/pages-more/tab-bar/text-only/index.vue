<template>
    <view>
        <t-tab-bar t-class="t-tab-bar" :value="value" @change="onChange" theme="tag" :split="false">
            <t-tab-bar-item :value="item.value" v-for="(item, index) in list" :key="index">{{ item.label }}</t-tab-bar-item>
        </t-tab-bar>
    </view>
</template>

<script>
import tTabBar from './tdesign-miniprogram/tab-bar/tab-bar';
import tTabBarItem from './tdesign-miniprogram/tab-bar-item/tab-bar-item';
export default {
    components: {
        tTabBar,
        tTabBarItem
    },
    data() {
        return {
            value: 'home',
            list: [
                {
                    value: 'home',
                    label: '首页'
                },
                {
                    value: 'app',
                    label: '应用'
                },
                {
                    value: 'chat',
                    label: '聊天'
                },
                {
                    value: 'user',
                    label: '我的'
                }
            ]
        };
    },
    methods: {
        onChange(e) {
            this.setData({
                value: e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
