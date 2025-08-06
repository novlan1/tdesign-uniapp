<template>
    <view>
        <t-checkbox-group t-class="theme-card" :default-value="['1', '2']">
            <t-checkbox value="1" label="多选" />
            <t-checkbox value="2" label="多选" />
            <t-checkbox value="3" label="多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行多选标题" />
        </t-checkbox-group>
    </view>
</template>

<script>
import tCheckboxGroup from './tdesign-miniprogram/checkbox-group/checkbox-group';
import tCheckbox from './tdesign-miniprogram/checkbox/checkbox';
export default {
    components: {
        tCheckboxGroup,
        tCheckbox
    },
    data() {
        return {
            checked: true
        };
    },
    /**
     * 组件的方法列表
     */
    methods: {
        changeChecked(e) {
            this.setData({
                checked: e.detail.checked
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
