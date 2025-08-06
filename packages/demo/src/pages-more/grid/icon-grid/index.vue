<template>
    <view>
        <t-grid class="block">
            <t-grid-item text="分享" image="slot">
                <view slot="image" class="grid-item__image">
                    <t-button variant="text" icon="share" open-type="share"></t-button>
                </view>
            </t-grid-item>
            <t-grid-item text="收藏" icon="star" @click="onClick" />
            <t-grid-item text="保存" icon="download" @click="onClick" />
            <t-grid-item text="编辑" icon="edit-1" @click="onClick" />
        </t-grid>
    </view>
</template>

<script>
import tGrid from './tdesign-miniprogram/grid/grid';
import tGridItem from './tdesign-miniprogram/grid-item/grid-item';
import tButton from './tdesign-miniprogram/button/button';
export default {
    components: {
        tGrid,
        tGridItem,
        tButton
    },
    data() {
        return {};
    },
    methods: {
        onClick() {
            console.log('click grid-item');
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
