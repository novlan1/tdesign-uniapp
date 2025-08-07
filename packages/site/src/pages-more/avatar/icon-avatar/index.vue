<template>
    <view>
        <t-avatar class="avatar-example" icon="user" />
        <t-avatar class="avatar-example" shape="round" icon="user" />
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
