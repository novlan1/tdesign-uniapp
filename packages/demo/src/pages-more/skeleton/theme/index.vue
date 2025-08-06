<template>
    <view>
        <view v-for="(themeItem, index) in themeList" :key="index">
            <view class="demo-section__desc">{{ themeItem.title }}</view>

            <view class="demo-section__content">
                <t-skeleton :theme="themeItem.value"></t-skeleton>
            </view>
        </view>
    </view>
</template>

<script>
import tSkeleton from './tdesign-miniprogram/skeleton/skeleton';
export default {
    components: {
        tSkeleton
    },
    data() {
        return {
            themeList: [
                {
                    title: '头像骨架屏',
                    value: 'avatar'
                },
                {
                    title: '图片骨架屏',
                    value: 'image'
                },
                {
                    title: '文本骨架屏',
                    value: 'text'
                },
                {
                    title: '段落骨架屏',
                    value: 'paragraph'
                }
            ],

            themeItem: {
                title: '',
                value: ''
            }
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
