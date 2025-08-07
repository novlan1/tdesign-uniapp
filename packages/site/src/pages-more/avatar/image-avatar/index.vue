<template>
    <view>
        <t-avatar class="avatar-example" :image="image" />
        <t-avatar class="avatar-example" shape="round" :image="image" />
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
