<template>
    <view>
        <view class="format-line" v-for="(list, index) in formatList" :key="index">
            <view :class="'format-item ' + (curFormat === item ? 'active' : '')" :data-format="item" @tap.stop.prevent="clickFormat" v-for="(item, index1) in list" :key="index1">
                <t-icon v-if="curFormat === item" name="check" size="14" custom-style="position: absolute; top: 4rpx; left: 4rpx; color: #fff; z-index: 1;" />

                {{ item }}
            </view>
        </view>
        <t-color-picker enableAlpha type="multiple" :format="curFormat" :value="color" @change="onChange" @palette-bar-change="onPaletteBarChange" />
    </view>
</template>

<script>
import tColorPicker from './tdesign-miniprogram/color-picker/color-picker';
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tColorPicker,
        tIcon
    },
    data() {
        return {
            curFormat: 'CSS',
            color: '#7bd60b',
            formatList: [
                ['CSS', 'HEX', 'RGB'],
                ['HSL', 'HSV', 'CMYK']
            ],
            list: []
        };
    },
    methods: {
        onChange(e) {
            console.log('change', e.detail);
        },
        onPaletteBarChange(e) {
            console.log('onPaletteBarChange', e.detail);
        },
        clickFormat(e) {
            this.setData({
                curFormat: e.target.dataset.format
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
