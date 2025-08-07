<template>
    <view>
        <t-avatar class="avatar-example" t-class-content="external-class-content" aria-label="字符头像">A</t-avatar>
        <t-avatar class="avatar-example" t-class-content="external-class-content" shape="round">A</t-avatar>
    </view>
</template>

<script>
import tAvatar from 'tdesign-uniapp/avatar/avatar';
export default {
    components: {
        tAvatar
    },
    data() {
        return {
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png'
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
