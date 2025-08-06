<template>
    <view>
        <t-navbar class="demo-navbar" title="CountDown" leftArrow />
        <t-demo-header title="CountDown 倒计时" desc="用于实时展示倒计时数值。" notice="渲染框架支持情况：Skyline、WebView" />
        <t-demo padding title="01 组件类型">
            <base />
        </t-demo>

        <t-demo padding title="02 组件尺寸" desc="倒计时 large/medium/small 尺寸">
            <size />
        </t-demo>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import size from './size';
export default zpMixins.extend({
    components: {
        base,
        size
    },
    data() {
        return {
            time: 5760000,
            time1: 2760000,
            timeData: {},
            counting: false
        };
    },
    methods: {
        onChange(e: any) {
            this.setData({
                timeData: e.detail
            });
        },

        start() {
            const countDown = this.zpSelectComponent('.control-count-down');
            if (!countDown.counting) {
                countDown.start();
                this.setData({
                    counting: true
                });
            } else {
                countDown.pause();
                this.setData({
                    counting: false
                });
            }
        },

        reset() {
            const countDown = this.zpSelectComponent('.control-count-down');
            countDown.reset();
        },

        finished() {
            uni.showToast({
                icon: 'none',
                title: '倒计时结束'
            });
            this.setData({
                counting: false
            });
        }
    }
});
</script>
<style lang="less">
@import './count-down.less';
</style>
