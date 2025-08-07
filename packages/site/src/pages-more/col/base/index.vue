<template>
    <view>
        <t-row>
            <t-col span="8" t-class="dark">col-8</t-col>
            <t-col span="8" t-class="light">col-8</t-col>
            <t-col span="8" t-class="dark">col-8</t-col>
        </t-row>

        <t-row>
            <t-col span="4" t-class="dark">col-4</t-col>
            <t-col span="16" offset="4" t-class="light">col-16 col-offset-4</t-col>
        </t-row>

        <t-row>
            <t-col offset="12" span="12" t-class="dark">col-12 col-offset-12</t-col>
        </t-row>
    </view>
</template>

<script>
import tCol from 'tdesign-uniapp/col/col';
import tRow from 'tdesign-uniapp/row/row';
export default {
    components: {
        tCol,
        tRow
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
