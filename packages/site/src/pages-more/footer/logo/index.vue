<template>
    <view>
        <!-- theme 为 logo -->
        <view class="footer-example">
            <t-footer :logo="logo" />
        </view>

        <view class="footer-example">
            <t-footer :logo="" />
        </view>
    </view>
</template>

<script>
import tFooter from 'tdesign-uniapp/footer/footer';
import themeChangeBehavior from 'tdesign-uniapp/mixins/theme-change';
export default {
    components: {
        tFooter
    },
    data() {
        return {
            logo: {
                icon: 'https://tdesign.gtimg.com/mobile/demos/logo2.png',
                title: '品牌名称'
            }
        };
    },
    mixins: [themeChangeBehavior],
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
