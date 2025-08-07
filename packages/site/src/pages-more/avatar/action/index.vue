<template>
    <view>
        <t-avatar-group cascading="right-up" max="5" @collapsed-item-click="onClickCollapsedAvatar">
            <t-avatar :image="pic" v-for="(pic, index) in pics" :key="index"></t-avatar>
        </t-avatar-group>
    </view>
</template>

<script>
import tAvatar from 'tdesign-uniapp/avatar/avatar';
import tAvatarGroup from 'tdesign-uniapp/avatar-group/avatar-group';
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
    methods: {
        onAddTap() {
            uni.showToast({
                title: '您按下了添加',
                icon: 'none',
                duration: 1000
            });
        },
        onClickCollapsedAvatar() {
            console.log('click collapsed avatar');
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
