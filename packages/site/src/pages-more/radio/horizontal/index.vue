<template>
    <view>
        <t-radio-group default-value="0" borderless t-class="box">
            <t-radio :block="false" label="单选标题" value="0" />
            <t-radio :block="false" label="单选标题" value="1" />
            <t-radio :block="false" label="上限四字" value="2" />
        </t-radio-group>
    </view>
</template>

<script>
import tRadioGroup from './tdesign-miniprogram/radio-group/radio-group';
import tRadio from './tdesign-miniprogram/radio/radio';
export default {
    components: {
        tRadioGroup,
        tRadio
    },
    data() {
        return {
            checked: false
        };
    },
    methods: {
        handleChange(e) {
            this.setData({
                checked: e.detail.checked
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
