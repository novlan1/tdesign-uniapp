<template>
    <view>
        <t-swiper
            :current="current"
            :autoplay="autoplay"
            :duration="duration"
            :interval="interval"
            :navigation="navigation"
            :paginationPosition="paginationPosition"
            :list="swiperList"
        ></t-swiper>
    </view>
</template>

<script>
import tSwiper from './tdesign-miniprogram/swiper/swiper';
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [`${imageCdn}/swiper1.png`, `${imageCdn}/swiper2.png`, `${imageCdn}/swiper1.png`, `${imageCdn}/swiper2.png`, `${imageCdn}/swiper1.png`];
export default {
    components: {
        tSwiper
    },
    data() {
        return {
            current: 2,
            autoplay: true,
            duration: 500,
            interval: 5000,
            paginationPosition: 'bottom-right',
            swiperList,
            navigation: {
                type: 'fraction'
            }
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
