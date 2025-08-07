<template>
    <view>
        <t-color-picker :visible="visible" use-popup enableAlpha type="multiple" @change="onChange" @palette-bar-change="onPaletteBarChange" />

        <t-button block size="large" variant="outline" theme="primary" @tap.native="handlePopup" t-class="wrapper">弹窗形式的颜色选择器</t-button>
    </view>
</template>

<script>
import tColorPicker from './tdesign-miniprogram/color-picker/color-picker';
import tPopup from './tdesign-miniprogram/popup/popup';
export default {
    components: {
        tColorPicker,
        tPopup
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        onChange(e) {
            console.log('change', e.detail);
        },
        handlePopup() {
            this.setData({
                visible: true
            });
        },
        onPaletteBarChange(e) {
            console.log('onPaletteBarChange', e.detail);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
