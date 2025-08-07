<template>
    <view>
        <t-grid class="block" :column="5">
            <t-grid-item t-class-image="image" text="标题文字" :image="img1" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img2" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img3" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img2" />
            <t-grid-item t-class-image="image" text="最多四字" :image="img1" />
        </t-grid>

        <t-grid class="block">
            <t-grid-item t-class-image="image" text="标题文字" :image="img1" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img2" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img3" />
            <t-grid-item t-class-image="image" text="最多五个字" :image="img1" />
        </t-grid>

        <t-grid class="block" :column="3">
            <t-grid-item t-class-image="image" text="标题文字" :image="img1" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img2" />
            <t-grid-item t-class-image="image" text="最多六个文字" :image="img3" />
        </t-grid>
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
