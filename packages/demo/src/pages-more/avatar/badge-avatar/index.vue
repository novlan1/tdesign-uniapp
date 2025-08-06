<template>
    <view>
        <t-avatar class="avatar-example" :image="image" :badge-props="" />
        <t-avatar class="avatar-example" t-class-content="external-class-content" :badge-props="">A</t-avatar>
        <t-avatar class="avatar-example" icon="user" :badge-props="" />
    </view>
</template>

<script>
import tAvatar from './tdesign-miniprogram/avatar/avatar';
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
