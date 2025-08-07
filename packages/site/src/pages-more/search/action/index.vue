<template>
    <view class="example-search">
        <t-search
            :value="value"
            center
            placeholder="搜索预设文案"
            :action="actionText"
            @blur="blurHandle"
            @focus="focusHandle"
            @action-click="actionHandle"
            @change="changeHandle"
        />
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
            value: '',
            actionText: ''
        };
    },
    methods: {
        changeHandle(e) {
            const { value } = e.detail;
            this.setData({
                value
            });
        },
        focusHandle() {
            this.setData({
                actionText: '取消'
            });
        },
        blurHandle() {
            this.setData({
                actionText: ''
            });
        },
        actionHandle() {
            this.setData({
                value: '',
                actionText: ''
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
