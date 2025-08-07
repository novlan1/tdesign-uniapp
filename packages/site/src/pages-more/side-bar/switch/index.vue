<template>
    <view>
        <view class="custom-navbar">
            <t-navbar class="demo-navbar" title="TDesign" leftArrow />
        </view>

        <view class="side-bar-wrapper" :style="'height: calc(100vh - ' + navbarHeight + 'px)'">
            <t-side-bar :value="sideBarIndex" @change="onSideBarChange">
                <t-side-bar-item
                    :value="item.value || index"
                    :label="item.label"
                    :disabled="item.disabled"
                    :badge-props="item.badgeProps"
                    v-for="(item, index) in categories"
                    :key="index"
                ></t-side-bar-item>
            </t-side-bar>
            <view class="content" :style="'transform: translateY(-' + sideBarIndex * 100 + '%)'">
                <scroll-view class="section" scroll-y :scroll-top="scrollTop" scroll-with-animation :show-scrollbar="false" v-for="(item, index) in categories" :key="index">
                    <view class="title">{{ item.title || item.label }}</view>

                    <t-cell-group>
                        <block v-for="(cargo, index1) in item.items" :key="index1">
                            <t-cell t-class-left="cell" :title="cargo.label + index">
                                <t-image shape="round" :src="cargo.image" slot="image" lazy t-class="image" />
                            </t-cell>
                        </block>
                    </t-cell-group>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
import tSideBar from './tdesign-miniprogram/side-bar/side-bar';
import tSideBarItem from './tdesign-miniprogram/side-bar-item/side-bar-item';
import tCellGroup from './tdesign-miniprogram/cell-group/cell-group';
import tCell from './tdesign-miniprogram/cell/cell';
import tImage from './tdesign-miniprogram/image/image';
const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill(
    {
        label: '标题文字',
        image
    },
    0,
    12
);
export default {
    components: {
        tSideBar,
        tSideBarItem,
        tCellGroup,
        tCell,
        tImage
    },
    data() {
        return {
            sideBarIndex: 1,
            scrollTop: 0,

            categories: [
                {
                    label: '选项一',
                    title: '标题一',
                    badgeProps: {},
                    items
                },
                {
                    label: '选项二',
                    title: '标题二',
                    badgeProps: {
                        dot: true
                    },
                    items: items.slice(0, 10)
                },
                {
                    label: '选项三',
                    title: '标题三',
                    badgeProps: {},
                    items: items.slice(0, 6)
                },
                {
                    label: '选项四',
                    title: '标题四',
                    badgeProps: {
                        count: 8
                    },
                    items: items.slice(0, 8)
                },
                {
                    label: '选项五',
                    title: '标题五',
                    badgeProps: {},
                    disabled: true,
                    items: items.slice(0, 8)
                }
            ],

            navbarHeight: 0,
            offsetTopList: [],

            cargo: {
                label: '',
                image: ''
            }
        };
    },
    onLoad() {
        this.getCustomNavbarHeight();
    },
    methods: {
        getCustomNavbarHeight() {
            const query = uni.createSelectorQuery();
            query.select('.custom-navbar').boundingClientRect();
            query.exec((res) => {
                const { height = 0 } = res[0] || {};
                this.setData({
                    navbarHeight: height
                });
            });
        },

        onSideBarChange(e) {
            const { value } = e.detail;
            console.log('---', value);
            this.setData({
                sideBarIndex: value,
                scrollTop: 0
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
