<template>
    <view>
        <view class="custom-navbar">
            <t-navbar class="demo-navbar" title="Guide" leftArrow />
        </view>

        <view class="demo">
            <t-demo-header title="Guide 引导" desc="逐步骤进行指引或解释说明的组件，常用于用户不熟悉的或需进行特别强调的页面。" notice="渲染框架支持情况：WebView" />
            <t-demo title="01 组件类型" desc="基础引导" padding>
                <view style="text-align: center">
                    <t-button theme="primary" content="用户引导" @tap.native="handleBaseClick"></t-button>
                </view>
                <t-popup :visible="visibleBasePopup" placement="bottom" :show-overlay="false">
                    <view :style="'height: calc(100vh - ' + navbarHeight + 'px)'">
                        <base v-if="visibleBase" @close="handleBaseClose" />
                    </view>
                </t-popup>
            </t-demo>
            <t-demo desc="不带遮罩的引导" padding>
                <view style="text-align: center">
                    <t-button theme="primary" content="用户引导" @tap.native="handleNoMaskClick"></t-button>
                </view>
                <t-popup :visible="visibleNoMaskPopup" placement="bottom" :show-overlay="false">
                    <view :style="'height: calc(100vh - ' + navbarHeight + 'px)'">
                        <no-mask v-if="visibleNoMask" @close="handleNoMaskClose" />
                    </view>
                </t-popup>
            </t-demo>
            <t-demo desc="弹窗形式的引导" padding>
                <view style="text-align: center">
                    <t-button theme="primary" content="用户引导" @tap.native="handleDialogClick"></t-button>
                </view>
                <t-popup :visible="visibleDialogPopup" placement="bottom" :show-overlay="false">
                    <view :style="'height: calc(100vh - ' + navbarHeight + 'px)'">
                        <dialog v-if="visibleDialog" @close="handleDialogClose" />
                    </view>
                </t-popup>
            </t-demo>
            <t-demo desc="气泡与弹窗混合的引导" padding>
                <view style="text-align: center">
                    <t-button theme="primary" content="用户引导" @tap.native="handleDialog1Click"></t-button>
                </view>
                <t-popup :visible="visibleDialog1Popup" placement="bottom" :show-overlay="false">
                    <view :style="'height: calc(100vh - ' + navbarHeight + 'px)'">
                        <multiple v-if="visibleDialog1" @close="handleDialog1Close" />
                    </view>
                </t-popup>
            </t-demo>
            <t-demo desc="自定义气泡" padding>
                <view style="text-align: center">
                    <t-button theme="primary" content="用户引导" @tap.native="handleContentClick"></t-button>
                </view>
                <t-popup :visible="visibleContentPopup" placement="bottom" :show-overlay="false">
                    <view :style="'height: calc(100vh - ' + navbarHeight + 'px)'">
                        <content v-if="visibleContent" @close="handleContentClose" />
                    </view>
                </t-popup>
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tButton from './tdesign-miniprogram/button/button';
import tPopup from './tdesign-miniprogram/popup/popup';
import base from './base';
import noMask from './no-mask';
import dialog from './dialog';
import multiple from './multiple';
import content from './content';
export default zpMixins.extend({
    components: {
        tButton,
        tPopup,
        base,
        noMask,
        dialog,
        multiple,
        content
    },
    data() {
        return {
            navbarHeight: 60,
            visibleBasePopup: false,
            visibleBase: false,
            visibleNoMaskPopup: false,
            visibleNoMask: false,
            visibleDialogPopup: false,
            visibleDialog: false,
            visibleDialog1Popup: false,
            visibleDialog1: false,
            visibleContentPopup: false,
            visibleContent: false
        };
    },
    onLoad() {
        uni.createSelectorQuery()
            .in(this)
            .select('.custom-navbar')
            .boundingClientRect((rect) => {
                this.setData({
                    navbarHeight: rect.height
                });
            })
            .exec();
    },
    methods: {
        handleBaseClick() {
            this.setData({
                visibleBasePopup: true
            });
            setTimeout(() => {
                this.setData({
                    visibleBase: true
                });
            }, 300);
        },

        handleBaseClose() {
            this.setData({
                visibleBasePopup: false
            });
            setTimeout(() => {
                this.setData({
                    visibleBase: false
                });
            }, 300);
        },

        handleNoMaskClick() {
            this.setData({
                visibleNoMaskPopup: true
            });
            setTimeout(() => {
                this.setData({
                    visibleNoMask: true
                });
            }, 300);
        },

        handleNoMaskClose() {
            this.setData({
                visibleNoMaskPopup: false
            });
            setTimeout(() => {
                this.setData({
                    visibleNoMask: false
                });
            }, 300);
        },

        handleDialogClick() {
            this.setData({
                visibleDialogPopup: true
            });
            setTimeout(() => {
                this.setData({
                    visibleDialog: true
                });
            }, 300);
        },

        handleDialogClose() {
            this.setData({
                visibleDialogPopup: false
            });
            setTimeout(() => {
                this.setData({
                    visibleDialog: false
                });
            }, 300);
        },

        handleDialog1Click() {
            this.setData({
                visibleDialog1Popup: true
            });
            setTimeout(() => {
                this.setData({
                    visibleDialog1: true
                });
            }, 300);
        },

        handleDialog1Close() {
            this.setData({
                visibleDialog1Popup: false
            });
            setTimeout(() => {
                this.setData({
                    visibleDialog1: false
                });
            }, 300);
        },

        handleContentClick() {
            this.setData({
                visibleContentPopup: true
            });
            setTimeout(() => {
                this.setData({
                    visibleContent: true
                });
            }, 300);
        },

        handleContentClose() {
            this.setData({
                visibleContentPopup: false
            });
            setTimeout(() => {
                this.setData({
                    visibleContent: false
                });
            }, 300);
        }
    }
});
</script>
<style lang="less">
@import './guide.less';
</style>
