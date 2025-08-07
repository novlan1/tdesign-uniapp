<template>
    <view class="card-theme">
        <t-swiper
            :current="current"
            :autoplay="autoplay"
            :duration="duration"
            :interval="interval"
            @change="onChange"
            :navigation=""
            :list="swiperList"
            :image-props=""
            previousMargin="34px"
            nextMargin="34px"
            t-class-nav="card-theme-nav"
        />

        <view class="box" style="height: 42px" />

        <t-swiper
            class="scale-card-theme"
            :current="current"
            :autoplay="autoplay"
            :duration="duration"
            :interval="interval"
            @change="onChange"
            :navigation=""
            :list="swiperList"
            :image-props=""
            previousMargin="34px"
            nextMargin="34px"
            t-class-nav="card-theme-nav"
            t-class-prev-image="scale-candidate"
            t-class-next-image="scale-candidate"
        />
    </view>
</template>

<script>
import tSwiper from 'tdesign-uniapp/swiper/swiper';
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
            swiperList,
            scale: 0,
            candidate: 0
        };
    },
    methods: {
        onChange(e) {
            const {
                detail: { current, source }
            } = e;
            console.log(current, source);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
