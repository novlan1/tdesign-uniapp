<template>
    <view>
        <t-cell title="带文字开关">
            <t-switch @change="handleChange" :value="defaultVal" :label="['开', '关']" slot="note" />
        </t-cell>

        <t-cell title="带图标开关" :bordered="false">
            <t-switch :defaultValue="true" :icon="['check', 'close']" slot="note" />
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
