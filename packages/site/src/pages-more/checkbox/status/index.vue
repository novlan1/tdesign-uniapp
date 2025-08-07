<template>
    <view>
        <t-checkbox-group :defaultValue="['checkbox1']" disabled>
            <t-checkbox value="checkbox1" label="选项禁用-已选" />
            <t-checkbox value="checkbox2" label="选项禁用-默认" />
        </t-checkbox-group>
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
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
