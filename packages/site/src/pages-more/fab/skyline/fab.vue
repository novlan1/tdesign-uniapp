<template>
    <view>
        <view class="skyline">
            <t-navbar title="Fab" left-arrow />
            <scroll-view scroll-y type="list" class="scroll-view">
                <view class="demo">
                    <view class="demo-title">Fab 悬浮按钮</view>
                    <view class="demo-desc">当功能使用图标即可表意清楚时，可使用纯图标悬浮按钮，例如：添加、发布</view>
                    <t-demo title="01 组件类型" desc="纯图标悬浮按钮">
                        <view class="wrapper">
                            <t-button theme="primary" size="large" block variant="outline" @tap.native="handleChange($event, { type: 'base' })" data-type="base">
                                纯图标悬浮按钮
                            </t-button>
                        </view>
                    </t-demo>
                    <t-demo desc="图标加文字悬浮按钮">
                        <view class="wrapper">
                            <t-button theme="primary" size="large" block variant="outline" @tap.native="handleChange($event, { type: 'advance' })" data-type="advance">
                                图标加文字悬浮按钮
                            </t-button>
                        </view>
                    </t-demo>
                    <t-demo desc="可移动悬浮按钮">
                        <view class="wrapper">
                            <t-button theme="primary" size="large" block variant="outline" @tap.native="handleChange($event, { type: 'movable' })" data-type="movable">
                                可移动悬浮按钮
                            </t-button>
                        </view>
                    </t-demo>
                </view>
            </scroll-view>
        </view>

        <base v-if="type == 'base'" />
        <advance v-else-if="type == 'advance'" />
        <draggable v-else />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import tButton from './tdesign-miniprogram/button/button';
import base from '../base';
import advance from '../advance';
import draggable from '../draggable';
export default zpMixins.extend({
    components: {
        tNavbar,
        tButton,
        base,
        advance,
        draggable
    },
    data() {
        return {
            type: 'base'
        };
    },
    methods: {
        handleChange(e: any, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            this.setData({
                type: e.target.dataset.type
            });
        }
    }
});
</script>
<style lang="less">
@import './fab.less';
</style>
