<template>
    <view class="skyline">
        <t-navbar title="Switch" leftArrow />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo-title">Switch 开关</view>
            <view class="demo-desc">用于控制某个功能的开启和关闭。</view>

            <t-demo title="01 组件类型" desc="基础开关">
                <base />
            </t-demo>

            <t-demo desc="带描述开关">
                <label />
            </t-demo>

            <t-demo desc="自定义颜色开关">
                <color />
            </t-demo>

            <t-demo title="02 组件状态">
                <status />
            </t-demo>

            <t-demo title="03 组件样式" desc="开关尺寸">
                <size />
            </t-demo>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tDemo from '../../../components/demo-block';
import base from '../base';
import label from '../label';
import color from '../color';
import status from '../status';
import size from '../size';
export default zpMixins.extend({
    components: {
        tDemo,
        base,
        label,
        color,
        status,
        size
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './switch.less';
</style>
