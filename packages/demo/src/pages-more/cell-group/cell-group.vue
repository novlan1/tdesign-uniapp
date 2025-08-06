<template>
    <view>
        <t-navbar title="cell-group 组合单元格" leftArrow />
        <view class="demo">
            <view class="demo-title">Cell-group 组合单元格</view>
            <view class="demo-desc">cell的组合单元格</view>

            <view>
                <t-cell-group title="01 基础用法">
                    <t-cell title="单行标题" required />
                    <t-cell title="单行标题" hover note="辅助信息" />
                    <t-cell title="单行标题" hover arrow />
                    <t-cell title="单行标题" hover note="辅助信息" arrow />
                </t-cell-group>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
export default zpMixins.extend({
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './cell-group.less';
</style>
