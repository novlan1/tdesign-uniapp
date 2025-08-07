<template>
    <view>
        <view class="custom-navbar">
            <t-navbar title="TDesign" leftArrow />
        </view>
        <view class="indexes">
            <t-indexes @change="onChange" :index-list="indexList" :sticky-offset="stickyOffset + 8" t-class="wrapper">
                <block v-for="(item, index) in list" :key="index">
                    <t-indexes-anchor :index="item.index" t-class="anchor-wrapper">
                        <view :class="'capsule' + (curIndex == item.index ? ' capsule--active' : '')">{{ item.index }}</view>
                    </t-indexes-anchor>

                    <t-cell-group>
                        <t-cell :title="city" :bordered="item.children.length - 1 != index" v-for="(city, index1) in item.children" :key="index1"></t-cell>
                    </t-cell-group>
                </block>
            </t-indexes>
        </view>
    </view>
</template>

<script>
import tIndexes from 'tdesign-uniapp/indexes/indexes';
import tIndexesAnchor from 'tdesign-uniapp/indexes-anchor/indexes-anchor';
import tCellGroup from 'tdesign-uniapp/cell-group/cell-group';
import tCell from 'tdesign-uniapp/cell/cell';
const children = new Array(5).fill('列表内容');
const list = [
    {
        index: 1,
        children
    },
    {
        index: 3,
        children
    },
    {
        index: 5,
        children
    },
    {
        index: 7,
        children
    },
    {
        index: 8,
        children
    },
    {
        index: 10,
        children
    },
    {
        index: '#',
        children
    }
];
export default {
    components: {
        tIndexes,
        tIndexesAnchor,
        tCellGroup,
        tCell
    },
    data() {
        return {
            list,
            indexList: list.map((item) => item.index),
            curIndex: '',
            stickyOffset: 0,
            city: ''
        };
    },
    onLoad() {
        this.getCustomNavbarHeight();
    },
    methods: {
        onChange(e) {
            const { index } = e.detail;
            console.log(index);
            this.setData({
                curIndex: index
            });
        },

        getCustomNavbarHeight() {
            const query = uni.createSelectorQuery();
            query.select('.custom-navbar').boundingClientRect();
            query.exec((res) => {
                const { height = 0 } = res[0] || {};
                this.setData({
                    stickyOffset: height
                });
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
