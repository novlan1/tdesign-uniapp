<template>
    <view>
        <t-action-sheet id="t-action-sheet" usingCustomNavbar @selected="handleSelected($event, { tagId: 't-action-sheet' })" />

        <t-button size="large" variant="outline" @tap.native="handleAction" block theme="primary">列表型</t-button>

        <t-button size="large" variant="outline" @tap.native="showDescAction" block theme="primary">带描述列表型</t-button>

        <t-button size="large" variant="outline" @tap.native="showIconAction" block theme="primary">带图标列表型</t-button>
    </view>
</template>

<script>
import tButton from './tdesign-miniprogram/button/button';
import tActionSheet from './tdesign-miniprogram/action-sheet/action-sheet';
import ActionSheet, { ActionSheetTheme } from './tdesign-miniprogram/action-sheet/index';
export default {
    components: {
        tButton,
        tActionSheet
    },
    data() {
        return {};
    },
    methods: {
        handleAction() {
            ActionSheet.show({
                theme: ActionSheetTheme.List,
                selector: '#t-action-sheet',
                context: this,
                items: [
                    {
                        label: '选项一'
                    },
                    {
                        label: '选项二'
                    },
                    {
                        label: '选项三'
                    },
                    {
                        label: '选项四'
                    }
                ]
            });
        },
        showDescAction() {
            ActionSheet.show({
                theme: ActionSheetTheme.List,
                selector: '#t-action-sheet',
                context: this,
                description: '动作面板描述文字',
                items: [
                    {
                        label: '选项一'
                    },
                    {
                        label: '选项二'
                    },
                    {
                        label: '选项三'
                    }
                ]
            });
        },
        showIconAction() {
            ActionSheet.show({
                theme: ActionSheetTheme.List,
                selector: '#t-action-sheet',
                context: this,
                items: [
                    {
                        label: '选项一',
                        icon: 'app'
                    },
                    {
                        label: '选项二',
                        icon: 'app'
                    },
                    {
                        label: '选项三',
                        icon: 'app'
                    },
                    {
                        label: '选项四',
                        icon: 'app'
                    }
                ]
            });
        },
        handleSelected(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e.detail);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
