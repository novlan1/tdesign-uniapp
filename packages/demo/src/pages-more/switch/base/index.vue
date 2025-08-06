<template>
    <view>
        <t-cell title="基础开关" :bordered="false">
            <t-switch :defaultValue="true" slot="note" />
        </t-cell>
    </view>
</template>

<script>
import tCell from './tdesign-miniprogram/cell/cell';
import tSwitch from './tdesign-miniprogram/switch/switch';
export default {
    components: {
        tCell,
        tSwitch
    },
    data() {
        return {
            defaultVal: true
        };
    },
    methods: {
        handleChange(e) {
            this.setData({
                defaultVal: e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
