<template>
    <view>
        <t-navbar title="Input" leftArrow />
        <view class="input-example">
            <t-demo-header title="Input 输入框" desc="用于单行文本信息输入。" notice="渲染框架支持情况：Skyline、WebView" />
            <t-demo title="01 组件类型" desc="基础输入框">
                <base />
            </t-demo>
            <t-demo desc="带字数限制输入框">
                <maxlength />
            </t-demo>
            <t-demo desc="带操作输入框">
                <suffix />
            </t-demo>
            <t-demo desc="带图标输入框">
                <prefix />
            </t-demo>
            <t-demo desc="特定类型输入框">
                <special />
            </t-demo>

            <t-demo title="02 组件状态" desc="输入框状态">
                <status />
            </t-demo>
            <t-demo desc="信息超长状态">
                <labelDemo />
            </t-demo>

            <t-demo title="03 组件样式" desc="内容位置">
                <align />
            </t-demo>
            <t-demo desc="竖排样式">
                <layout />
            </t-demo>
            <t-demo desc="非通栏样式">
                <banner />
            </t-demo>
            <t-demo desc="标签外置样式">
                <bordered />
            </t-demo>
            <t-demo desc="自定义样式输入框">
                <custom />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tInput from 'tdesign-uniapp/input/input';
import base from './base';
import suffix from './suffix';
import prefix from './prefix';
import layout from './layout';
import bordered from './bordered';
import align from './align';
import maxlength from './maxlength';
import special from './special';
import status from './status';
import custom from './custom';
import labelDemo from './label';
import banner from './banner';
export default zpMixins.extend({
    components: {
        tInput,
        base,
        suffix,
        prefix,
        layout,
        bordered,
        align,
        maxlength,
        special,
        status,
        custom,
        labelDemo,
        banner
    },
    data() {
        return {
            firstValue: '',
            textPassword: '123456',
            phoneError: false,
            phoneNumber: '17600600600',
            price: '10.2',
            priceError: false
        };
    },
    methods: {
        onPhoneInput(e: any) {
            const { phoneError } = this;
            const isPhoneNumber = /^[1][3,4,5,7,8,9][0-9]{9}$/.test(e.detail.value);
            if (phoneError === isPhoneNumber) {
                this.setData({
                    phoneError: !isPhoneNumber
                });
            }
        },

        onPriceInput(e: any) {
            const { priceError } = this;
            const isNumber = /^\d+(\.\d+)?$/.test(e.detail.value);
            if (priceError === isNumber) {
                this.setData({
                    priceError: !isNumber
                });
            }
        }
    }
});
</script>
<style lang="less">
@import './input.less';
</style>
