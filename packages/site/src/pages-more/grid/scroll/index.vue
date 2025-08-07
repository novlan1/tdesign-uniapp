<template>
    <view>
        <t-grid class="block" :column="0">
            <t-grid-item t-class-image="image" :text="item.text" :image="item.img" v-for="(item, index) in gridItemList" :key="index"></t-grid-item>
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
            gridItemList: [
                {
                    text: '标题文字',
                    img: 'https://tdesign.gtimg.com/mobile/demos/example1.png'
                },
                {
                    text: '标题文字',
                    img: 'https://tdesign.gtimg.com/mobile/demos/example2.png'
                },
                {
                    text: '标题文字',
                    img: 'https://tdesign.gtimg.com/mobile/demos/example3.png'
                },
                {
                    text: '最多五个字',
                    img: 'https://tdesign.gtimg.com/mobile/demos/example1.png'
                },
                {
                    text: '最多五个字',
                    img: 'https://tdesign.gtimg.com/mobile/demos/example2.png'
                },
                {
                    text: '最多五个字',
                    img: 'https://tdesign.gtimg.com/mobile/demos/example3.png'
                }
            ]
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
