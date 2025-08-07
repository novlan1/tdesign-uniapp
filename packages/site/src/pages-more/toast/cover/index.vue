<template>
    <view>
        <t-toast id="t-toast" />

        <view class="box">
            <t-button theme="primary" size="large" variant="outline" @tap.native="handleToast" block>禁止滑动和点击</t-button>
        </view>
    </view>
</template>

<script>
import tToast from 'tdesign-uniapp/toast/toast';
import Toast from 'tdesign-uniapp/toast/index';
export default {
    components: {
        tToast
    },
    data() {
        return {};
    },
    methods: {
        handleToast() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '禁止滑动和点击',
                direction: 'column',
                duration: 3000,
                preventScrollThrough: true,
                icon: 'poweroff'
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
