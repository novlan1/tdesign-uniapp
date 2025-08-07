<template>
    <view>
        <demo-loading />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import demoLoading from '../loading';
export default zpMixins.extend({
    components: {
        demoLoading
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './loading.less';
</style>
