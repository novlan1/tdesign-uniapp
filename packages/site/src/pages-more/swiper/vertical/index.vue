<template>
    <view>
        <view class="swiper-box">
            <t-swiper
                :current="1"
                :autoplay="autoplay"
                :duration="duration"
                :interval="interval"
                :navigation="navigation"
                direction="vertical"
                :paginationPosition="paginationPosition"
                :list="swiperList"
            ></t-swiper>
        </view>

        <view class="swiper-box swiper-box-option">
            <view class="cell">
                <view class="label">自动播放</view>
                <view class="option">
                    <t-switch t-class="swiper-switch" @change="onAutoplayChange" :value="autoplay"></t-switch>
                    <view class="option-desc">{{ autoplay ? '开' : '关' }}</view>
                </view>
            </view>
            <view class="cell">
                <view class="label">自动播放间隔时间(单位毫秒)</view>
                <view class="option">
                    <t-slider
                        t-class="swiper-slider"
                        t-class-bar="external-class-bar"
                        :value="interval"
                        :min="1000"
                        :max="5000"
                        :label="true"
                        :step="500"
                        @change="onIntervalChange"
                    ></t-slider>
                </view>
            </view>
            <view class="cell">
                <view class="label">动画持续时间(单位毫秒)</view>
                <view class="option">
                    <t-slider
                        t-class="swiper-slider"
                        t-class-bar="external-class-bar"
                        :value="duration"
                        :min="200"
                        :max="2000"
                        :label="true"
                        :step="100"
                        @change="onDurationChange"
                    ></t-slider>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import tSwiper from './tdesign-miniprogram/swiper/swiper';
import tSwitch from './tdesign-miniprogram/switch/switch';
import tSlider from './tdesign-miniprogram/slider/slider';
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
        tSwiper,
        tSwitch,
        tSlider
    },
    data() {
        return {
            current: 1,
            autoplay: true,
            duration: 500,
            interval: 5000,
            swiperList,
            navigation: {
                type: 'dots-bar'
            },
            paginationPosition: 'right'
        };
    },
    methods: {
        onChange(e) {
            const {
                detail: { current, source }
            } = e;
            console.log(current, source);
        },
        onAutoplayChange(e) {
            this.setData({
                autoplay: e.detail.value
            });
        },
        onIntervalChange(e) {
            this.setData({
                interval: e.detail.value
            });
        },
        onDurationChange(e) {
            this.setData({
                duration: e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
