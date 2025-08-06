<template>
    <view class="custom-color">
        <t-cell title="自定义颜色开关" :bordered="false">
            <t-switch :defaultValue="true" slot="note" />
        </t-cell>
        <!-- <t-cell title="自定义颜色" bordered="{{false}}">
    <t-switch loading defaultValue="{{true}}" slot="note" />
  </t-cell>
  <t-cell title="自定义颜色" bordered="{{false}}">
    <t-switch defaultValue="{{true}}" label="{{['关', '开']}}" slot="note" />
  </t-cell>
  <t-cell title="自定义颜色" bordered="{{false}}">
    <t-switch defaultValue="{{true}}" icon="{{['close', 'check']}}" slot="note" />
  </t-cell> -->
    </view>
</template>

<script>
import tCell from './tdesign-miniprogram/cell/cell';
import tSwitch from './tdesign-miniprogram/switch/switch';
export default {
    components: {
        tCell,
        tSwitch
    },
    data() {
        return {
            defaultVal: true
        };
    },
    methods: {
        handleChange(e) {
            this.setData({
                defaultVal: e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
