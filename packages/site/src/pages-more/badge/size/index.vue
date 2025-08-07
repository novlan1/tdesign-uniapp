<template>
    <view>
        <view class="demo-desc">Large</view>

        <view class="block">
            <t-avatar icon="user" size="large" :badge-props="" />
        </view>

        <view class="demo-desc">Middle</view>

        <view class="block">
            <t-avatar icon="user" :badge-props="" />
        </view>
    </view>
</template>

<script>
import tBadge from 'tdesign-uniapp/badge/badge';
import tAvatar from 'tdesign-uniapp/avatar/avatar';
export default {
    components: {
        tBadge,
        tAvatar
    },
    data() {
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
