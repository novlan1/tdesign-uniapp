<template>
    <view>
        <view class="example-search">
            <t-search placeholder="搜索预设文案" />
        </view>

        <view class="example-search">
            <t-search placeholder="搜索预设文案" shape="round" />
        </view>
    </view>
</template>

<script>
import tSearch from 'tdesign-uniapp/search/search';
export default {
    components: {
        tSearch
    },
    data() {
        return {
            value: ''
        };
    },
    methods: {
        onChange(e) {
            console.log(e.detail.value);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
