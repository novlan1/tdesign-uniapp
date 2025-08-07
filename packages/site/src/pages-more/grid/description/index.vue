<template>
    <view>
        <view class="block">
            <t-grid :column="3">
                <t-grid-item t-class-image="image" text="标题文字" description="描述文字" :image="img1" />
                <t-grid-item t-class-image="image" text="标题文字" description="描述文字" :image="img2" />
                <t-grid-item t-class-image="image" text="标题文字" description="描述文字" :image="img3" />
            </t-grid>
        </view>

        <view class="block">
            <t-grid :column="2" align="left">
                <t-grid-item t-class-image="image" text="标题文字" description="描述文字" layout="horizontal" :image="img1" />
                <t-grid-item t-class-image="image" text="标题文字" description="描述文字" layout="horizontal" :image="img2" />
            </t-grid>
        </view>
    </view>
</template>

<script>
import tGrid from './tdesign-miniprogram/grid/grid';
import tGridItem from './tdesign-miniprogram/grid-item/grid-item';
export default {
    components: {
        tGrid,
        tGridItem
    },
    data() {
        return {
            img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
            img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
            img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png'
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
