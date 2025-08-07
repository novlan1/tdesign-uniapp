<template>
    <view>
        <t-button size="large" variant="outline" @tap.native="onTriggerClick" block theme="primary">Toggle attach</t-button>

        <view v-if="visible">
            <t-transition visible appear>
                <view class="block"></view>
            </t-transition>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tButton from 'tdesign-uniapp/button/button';
import tTransition from 'tdesign-uniapp/transition/transition';
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
<style>
@import './index.css';
</style>
