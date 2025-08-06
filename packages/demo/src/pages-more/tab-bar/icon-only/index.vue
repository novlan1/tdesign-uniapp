<template>
    <view>
        <t-tab-bar t-class="t-tab-bar" :value="value" @change="onChange" theme="tag" :split="false">
            <t-tab-bar-item :value="item.value" :icon="item.icon" :ariaLabel="item.ariaLabel" v-for="(item, index) in list" :key="index"></t-tab-bar-item>
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
            value: 'label_1',
            list: [
                {
                    value: 'label_1',
                    icon: 'home',
                    ariaLabel: '首页'
                },
                {
                    value: 'label_2',
                    icon: 'app',
                    ariaLabel: '软件'
                },
                {
                    value: 'label_3',
                    icon: 'chat',
                    ariaLabel: '聊天'
                },
                {
                    value: 'label_4',
                    icon: 'user',
                    ariaLabel: '我的'
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
