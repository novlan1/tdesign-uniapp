<template>
    <view>
        <t-navbar t-class-placeholder="t-navbar-placeholder" t-class-content="t-navbar-content">
            <view slot="left">
                <t-image
                    t-class="custom-image"
                    :src="theme === 'dark' ? 'https://tdesign.gtimg.com/mobile/demos/image-dark.png' : 'https://tdesign.gtimg.com/mobile/demos/logo-light.png'"
                    aria-label="导航栏图片"
                />
            </view>
        </t-navbar>
    </view>
</template>

<script>
import tNavbar from 'tdesign-uniapp/navbar/navbar';
import tImage from 'tdesign-uniapp/image/image';
import themeChangeBehavior from 'tdesign-uniapp/mixins/theme-change';
export default {
    components: {
        tNavbar,
        tImage
    },
    data() {
        return {
            theme: ''
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
