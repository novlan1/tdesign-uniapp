<template>
    <view>
        <t-button size="large" variant="outline" @click="onTriggerClick" block theme="primary">Toggle attach</t-button>

        <t-transition :visible="visible" destroy-on-hide>
            <view class="block"></view>
        </t-transition>
    </view>
</template>

<script lang="ts">

import tButton from 'tdesign-uniapp/button/button';
import tTransition from 'tdesign-uniapp/transition/transition';
export default {
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
};
</script>
<style>
@import './index.css';
</style>
