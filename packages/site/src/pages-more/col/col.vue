<template>
    <view>
        <t-navbar title="Layout" leftArrow />
        <view class="demo">
            <t-demo-header
                title="Layout 布局"
                desc="以规则的网格阵列来指导和规范页面中的版面布局以及信息分布，提高界面内布局的一致性，节约成本。"
                notice="渲染框架支持情况：Skyline、WebView"
            />
            <t-demo title="01 组件类型" desc="基础用法">
                <base />
            </t-demo>

            <t-demo desc="在列元素之间增加间距">
                <offset />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import offset from './offset';
export default zpMixins.extend({
    components: {
        base,
        offset
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './col.less';
</style>
