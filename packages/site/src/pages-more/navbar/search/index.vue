<template>
    <view>
        <t-navbar t-class-placeholder="t-navbar-placeholder" t-class-content="t-navbar-content" leftIcon="slot">
            <view class="search-box" slot="left">
                <t-search shape="round" placeholder="搜索内容" />
            </view>
        </t-navbar>
    </view>
</template>

<script>
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import tSearch from './tdesign-miniprogram/search/search';
export default {
    components: {
        tNavbar,
        tSearch
    },
    data() {
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
