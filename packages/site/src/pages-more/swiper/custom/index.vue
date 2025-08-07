<template>
    <view>
        <t-swiper :current="current" :autoplay="autoplay" :duration="duration" :interval="interval" :list="swiperList" :navigation="" />
    </view>
</template>

<script>
import tSwiper from 'tdesign-uniapp/swiper/swiper';
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [
    {
        value: `${imageCdn}/swiper1.png`,
        ariaLabel: '图片1'
    },
    {
        value: `${imageCdn}/swiper2.png`,
        ariaLabel: '图片2'
    },
    {
        value: `${imageCdn}/swiper1.png`,
        ariaLabel: '图片1'
    },
    {
        value: `${imageCdn}/swiper2.png`,
        ariaLabel: '图片2'
    }
];
export default {
    components: {
        tSwiper
    },
    data() {
        return {
            current: 1,
            autoplay: true,
            duration: 500,
            interval: 5000,
            swiperList
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
