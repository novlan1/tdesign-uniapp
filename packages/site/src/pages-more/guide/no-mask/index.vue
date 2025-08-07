<template>
    <view>
        <view>
            <view class="main-title">
                <view class="title-major">用户引导标题</view>
                <view class="title-sub">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</view>
            </view>
            <view class="field label-field">
                <t-input label="标签文字" layout="vertical" placeholder="请输入文字"></t-input>
            </view>
            <view class="field">
                <t-input label="标签文字" layout="vertical" placeholder="请输入文字"></t-input>
            </view>
            <view class="action">
                <t-button block theme="light" size="large">重置</t-button>
                <t-button block theme="primary" size="large">确定</t-button>
            </view>
        </view>

        <t-guide :current="current" :steps="steps" :show-overlay="false" @skip="close" @finish="close" />
    </view>
</template>

<script>
import tGuide from './tdesign-miniprogram/guide/guide';
import tInput from './tdesign-miniprogram/input/input';
import tButton from './tdesign-miniprogram/button/button';
export default {
    components: {
        tGuide,
        tInput,
        tButton
    },
    data() {
        return {
            current: -1,
            steps: []
        };
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    methods: {
        attached() {
            this.setData({
                current: 0,

                steps: [
                    {
                        element: () =>
                            new Promise((resolve) =>
                                uni
                                    .createSelectorQuery()
                                    .in(this)
                                    .select('.main-title')
                                    .boundingClientRect((rect) => resolve(rect))
                                    .exec()
                            ),

                        title: '用户引导标题',
                        body: '用户引导的说明文案',
                        placement: 'center'
                    },
                    {
                        element: () =>
                            new Promise((resolve) =>
                                uni
                                    .createSelectorQuery()
                                    .in(this)
                                    .select('.label-field')
                                    .boundingClientRect((rect) => resolve(rect))
                                    .exec()
                            ),

                        title: '用户引导标题',
                        body: '用户引导的说明文案',
                        placement: 'bottom',
                        highlightPadding: 0
                    },
                    {
                        element: () =>
                            new Promise((resolve) =>
                                uni
                                    .createSelectorQuery()
                                    .in(this)
                                    .select('.action')
                                    .boundingClientRect((rect) => resolve(rect))
                                    .exec()
                            ),

                        title: '用户引导标题',
                        body: '用户引导的说明文案',
                        placement: 'top-right'
                    }
                ]
            });
        },

        close() {
            this.$emit('close');
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
