<template>
    <view>
        <view class="example-search">
            <t-search placeholder="搜索预设文案" />
        </view>

        <view class="example-search">
            <t-search placeholder="输入tdesign，有预览结果" :resultList="resultList" @change="onChangeValue" />
        </view>
    </view>
</template>

<script>
import tSearch from './tdesign-miniprogram/search/search';
export default {
    components: {
        tSearch
    },
    data() {
        return {
            value: '',
            resultList: []
        };
    },
    methods: {
        onChangeValue(e) {
            const { value } = e.detail;
            const list = ['tdesign-vue', 'tdesign-react', 'tdesign-miniprogram', 'tdesign-angular', 'tdesign-mobile-vue', 'tdesign-mobile-react'];
            this.setData({
                resultList: value ? list.filter((v) => v.includes(value)) : []
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
