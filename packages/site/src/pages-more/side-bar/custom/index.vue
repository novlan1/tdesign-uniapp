<template>
    <view>
        <view class="custom-navbar">
            <t-navbar class="demo-navbar" title="TDesign" leftArrow />
        </view>

        <view class="side-bar-wrapper" :style="'height: calc(100vh - ' + navbarHeight + 'px)'">
            <t-side-bar :value="sideBarIndex" @change="onSideBarChange">
                <t-side-bar-item :value="item.value || index" :label="item.label" :badge-props="item.badgeProps" v-for="(item, index) in categories" :key="index"></t-side-bar-item>
            </t-side-bar>
            <scroll-view class="content" scroll-y scroll-with-animation :scroll-top="scrollTop" @scroll="onScroll">
                <view class="section" v-for="(item, index) in categories" :key="index">
                    <view class="title">{{ item.title || item.label }}</view>

                    <t-grid :column="3" :border="false">
                        <block v-for="(cargo, index1) in item.items" :key="index1">
                            <t-grid-item t-class-image="image" :text="cargo.label" :image="cargo.image" :image-props=""></t-grid-item>
                        </block>
                    </t-grid>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import tSideBar from './tdesign-miniprogram/side-bar/side-bar';
import tSideBarItem from './tdesign-miniprogram/side-bar-item/side-bar-item';
import tGrid from './tdesign-miniprogram/grid/grid';
import tGridItem from './tdesign-miniprogram/grid-item/grid-item';
const image = 'https://tdesign.gtimg.com/mobile/demos/example1.png';
const items = new Array(12).fill().map((_, index) => ({
    label: index % 3 === 2 ? '最多六个文字' : '标题文字',
    image: image
}));
export default {
    components: {
        tSideBar,
        tSideBarItem,
        tGrid,
        tGridItem
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
                    items: items.slice(0, 9)
                },
                {
                    label: '选项三',
                    title: '标题三',
                    badgeProps: {},
                    items: items.slice(0, 9)
                },
                {
                    label: '选项四',
                    title: '标题四',
                    badgeProps: {
                        count: 6
                    },
                    items: items.slice(0, 6)
                },
                {
                    label: '选项五',
                    title: '标题五',
                    badgeProps: {},
                    items: items.slice(0, 3)
                }
            ],

            navbarHeight: 0,
            offsetTopList: [],
            lastScrollTop: 0,

            cargo: {
                label: '',
                image: ''
            }
        };
    },
    onLoad() {
        const query = uni.createSelectorQuery().in(this);
        const { sideBarIndex } = this;
        query.selectAll('.title').boundingClientRect();
        query.select('.custom-navbar').boundingClientRect();
        query.exec((res) => {
            const [rects, { height: navbarHeight }] = res;
            this.offsetTopList = rects.map((item) => item.top - navbarHeight);
            this.setData({
                navbarHeight,
                scrollTop: this.offsetTopList[sideBarIndex]
            });
        });
    },
    methods: {
        onSideBarChange(e) {
            const { value } = e.detail;
            this.setData({
                sideBarIndex: value,
                scrollTop: this.offsetTopList[value]
            });
        },

        onScroll(e) {
            const { scrollTop } = e.detail;
            const threshold = 50; // 下一个标题与顶部的距离
            const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';
            this.lastScrollTop = scrollTop;

            // 动态调整阈值：向下滚动时增大阈值，向上时减小
            const dynamicThreshold = direction === 'down' ? threshold * 1.5 : threshold * 0.8;

            // 使用二分查找优化查找效率
            const findNearestIndex = (arr, target) => {
                let left = 0;
                let right = arr.length - 1;
                let result = 0;
                while (left <= right) {
                    const mid = Math.floor((left + right) / 2);
                    if (arr[mid] <= target + dynamicThreshold) {
                        result = mid;
                        left = mid + 1;
                    } else {
                        right = mid - 1;
                    }
                }
                return result;
            };
            const newIndex = findNearestIndex(this.offsetTopList, scrollTop);
            if (newIndex !== this.sideBarIndex) {
                this.setData({
                    sideBarIndex: newIndex
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
