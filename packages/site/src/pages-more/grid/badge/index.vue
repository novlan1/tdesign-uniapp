<template>
    <view>
        <t-grid class="t-grid badge">
            <t-grid-item t-class-image="image" text="标题文字" :image="img1" :badge-props="" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img2" :badge-props="" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img3" :badge-props="" />
            <t-grid-item t-class-image="image" text="标题文字" :image="img3" :badge-props="" />
        </t-grid>
    </view>
</template>

<script>
import tGrid from 'tdesign-uniapp/grid/grid';
import tGridItem from 'tdesign-uniapp/grid-item/grid-item';
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
