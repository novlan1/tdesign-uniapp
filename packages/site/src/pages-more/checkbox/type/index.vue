<template>
    <view>
        <t-checkbox label="多选" icon="line" default-checked />

        <view class="box" style="height: 32rpx"></view>

        <t-checkbox label="多选" icon="rectangle" default-checked />

        <view class="box" style="height: 32rpx"></view>

        <t-checkbox value="checkbox1" label="图片图标" :icon="[activeImage, inActiveImage]" />
    </view>
</template>

<script>
import tCheckboxGroup from 'tdesign-uniapp/checkbox-group/checkbox-group';
import tCheckbox from 'tdesign-uniapp/checkbox/checkbox';
export default {
    components: {
        tCheckboxGroup,
        tCheckbox
    },
    data() {
        return {
            demoCheckbox2: ['checkbox2', 'checkbox3'],
            activeImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox-checked.png',
            inActiveImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox.png'
        };
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            console.log('checkbox', event.detail.value);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
