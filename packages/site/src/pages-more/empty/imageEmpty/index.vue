<template>
    <view>
        <t-empty t-class="empty-cls" t-class-image="t-empty__image" :image="image" description="描述文字" />
    </view>
</template>

<script>
import tEmpty from './tdesign-miniprogram/empty/empty';
export default {
    components: {
        tEmpty
    },
    data() {
        return {
            image: 'https://tdesign.gtimg.com/mobile/demos/empty1.png'
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
