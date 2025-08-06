<template>
    <view>
        <t-swiper
            :current="current"
            :autoplay="autoplay"
            :duration="duration"
            :interval="interval"
            :navigation=""
            :list="swiperList"
            @click="onTap"
            @change="onChange"
            @image-load="onImageLoad"
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
            current: 0,
            autoplay: false,
            duration: 500,
            interval: 5000,
            swiperList
        };
    },
    methods: {
        onTap(e) {
            const { index } = e.detail;
            console.log(index);
        },
        onChange(e) {
            const { current, source } = e.detail;
            console.log(current, source);
        },
        onImageLoad(e) {
            console.log(e.detail.index);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
