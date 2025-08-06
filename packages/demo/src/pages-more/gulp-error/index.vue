<template>
    <view>
        <view>gulp编译错误：</view>
        <view style="color: red; word-break: break-word">{{ gulpError }}</view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
export default zpMixins.extend({
    data() {
        return {
            gulpError: ''
        };
    },
    onLoad({ gulpError }) {
        this.setData({
            gulpError
        });
    },
    methods: {}
});
</script>
<style lang="less">
@import './index.less';
</style>
