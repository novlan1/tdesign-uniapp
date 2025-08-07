<template>
    <view class="wrapper">
        <t-sticky :container="container" :offset-top="navbarHeight">
            <t-button size="large" t-class="external-class green-button" hover-class="hover-class ">指定容器</t-button>
        </t-sticky>
    </view>
</template>

<script>
import tSticky from 'tdesign-uniapp/sticky/sticky';
import tButton from 'tdesign-uniapp/button/button';
export default {
    components: {
        tSticky,
        tButton
    },
    data() {
        return {
            container: null
        };
    },
    props: {
        navbarHeight: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    methods: {
        ready: function () {
            this.setData({
                container: () => uni.createSelectorQuery().in(this).select('.wrapper')
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
