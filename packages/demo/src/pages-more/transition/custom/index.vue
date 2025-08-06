<template>
    <view>
        <t-button size="large" variant="outline" @tap.native="onTriggerClick" block theme="primary">Toggle</t-button>

        <t-transition name="translate" :visible="visible">
            <view class="block"></view>
        </t-transition>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tButton from './tdesign-miniprogram/button/button';
import tTransition from './tdesign-miniprogram/transition/transition';
export default zpMixins.extend({
    components: {
        tButton,
        tTransition
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        onTriggerClick() {
            this.setData({
                visible: !this.visible
            });
        },
        onClose() {
            this.setData({
                visible: false
            });
        }
    },
    created: function () {}
});
</script>
<style lang="less">
@import './index.less';
</style>
