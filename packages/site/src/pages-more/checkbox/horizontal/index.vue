<template>
    <view>
        <t-checkbox-group t-class="box" borderless @change="onChange" :defaultValue="demoCheckboxMax">
            <t-checkbox :block="false" value="checkbox1" label="多选标题" />
            <t-checkbox :block="false" value="checkbox2" label="多选标题" />
            <t-checkbox :block="false" value="checkbox3" label="上限四字" />
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
            demoCheckboxMax: ['checkbox1', 'checkbox2']
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
