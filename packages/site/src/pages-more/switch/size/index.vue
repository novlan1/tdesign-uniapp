<template>
    <view>
        <t-cell title="大尺寸 32">
            <t-switch :defaultValue="true" size="large" slot="note" />
        </t-cell>
        <t-cell title="中尺寸 28">
            <t-switch :defaultValue="true" slot="note" />
        </t-cell>
        <t-cell title="小尺寸 24" :bordered="false">
            <t-switch :defaultValue="true" size="small" slot="note" />
        </t-cell>
    </view>
</template>

<script>
import tCell from 'tdesign-uniapp/cell/cell';
import tSwitch from 'tdesign-uniapp/switch/switch';
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
