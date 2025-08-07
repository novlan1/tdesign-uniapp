<template>
    <view>
        <t-avatar-group max="5" collapseAvatar="+5">
            <t-avatar :image="pic" v-for="(pic, index) in pics" :key="index"></t-avatar>
        </t-avatar-group>
    </view>
</template>

<script>
import tAvatar from './tdesign-miniprogram/avatar/avatar';
import tAvatarGroup from './tdesign-miniprogram/avatar-group/avatar-group';
export default {
    components: {
        tAvatar,
        tAvatarGroup
    },
    data() {
        return {
            pics: [
                'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
                'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
                'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
                'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
                'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
                'https://tdesign.gtimg.com/mobile/demos/avatar1.png'
            ],
            pic: ''
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
