<template>
    <view>
        <t-action-sheet id="t-action-sheet" usingCustomNavbar @selected="handleSelected($event, { tagId: 't-action-sheet' })" />

        <t-button size="large" variant="outline" @tap.native="handleAction" block theme="primary">左对齐列表型</t-button>
    </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tActionSheet from 'tdesign-uniapp/action-sheet/action-sheet';
import { ActionSheet, ActionSheetTheme } from 'tdesign-miniprogram';
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
                align: 'left',
                description: '动作面板描述文字',
                items: [
                    {
                        label: '选项一',
                        icon: 'app',
                        suffixIcon: 'chevron-right'
                    },
                    {
                        label: '选项二',
                        icon: 'app',
                        suffixIcon: 'chevron-right'
                    },
                    {
                        label: '选项三',
                        icon: 'app',
                        suffixIcon: 'chevron-right'
                    },
                    {
                        label: '选项四',
                        icon: 'app',
                        suffixIcon: 'chevron-right'
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
