<template>
    <view>
        <t-input label="输入密码" type="password" :value="textPassword" :suffixIcon="" />

        <t-input placeholder="输入验证码" label="验证码">
            <view slot="suffix" class="suffix">
                <view class="suffix--line"></view>
                <image class="image" src="https://wwcdn.weixin.qq.com/node/wework/images/202010241547.ac6876be9c.png" mode="heightFix" aria-role="img" aria-label="验证码" />
            </view>
        </t-input>

        <t-input label="手机号" placeholder="输入手机号码" :value="phoneNumber" type="number" :tips="phoneError ? '手机号输入不正确' : ''" @change="onPhoneInput">
            <view slot="suffix" style="display: flex; align-items: center">
                <view class="suffix--line"></view>
                <view class="verify" aria-role="button">发送验证码</view>
            </view>
        </t-input>

        <t-input
            label="价格"
            placeholder="0.00"
            suffix="元"
            align="right"
            type="number"
            :format="priceFormat"
            @change="onPriceInput"
            :tips="priceError ? '请输入正确的价格' : ''"
            t-class-tips="tips"
        />

        <t-input label="数量" placeholder="填写个数" suffix="个" align="right" type="number" />
    </view>
</template>

<script>
import tInput from 'tdesign-uniapp/input/input';
export default {
    components: {
        tInput
    },
    data() {
        return {
            textPassword: '123456',
            phoneError: false,
            phoneNumber: '17600600600',
            priceError: false,
            priceFormat: (v) => {
                const isNumber = /^\d+(\.\d+)?$/.test(v);
                if (isNumber) {
                    return parseFloat(v).toFixed(2);
                }
                return v;
            }
        };
    },
    methods: {
        onPhoneInput(e) {
            const { phoneError } = this;
            const isPhoneNumber = /^[1][3,4,5,7,8,9][0-9]{9}$/.test(e.detail.value);
            if (phoneError === isPhoneNumber) {
                this.setData({
                    phoneError: !isPhoneNumber
                });
            }
        },
        onPriceInput(e) {
            const { priceError } = this;
            const isNumber = /^\d+(\.\d+)?$/.test(e.detail.value);
            if (priceError === isNumber) {
                this.setData({
                    priceError: !isNumber
                });
            }
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
