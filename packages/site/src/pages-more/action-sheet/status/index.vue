<template>
    <view>
        <t-action-sheet id="t-action-sheet" usingCustomNavbar @selected="handleSelected($event, { tagId: 't-action-sheet' })" />

        <t-button size="large" variant="outline" @tap.native="handleAction" block theme="primary">列表型选项状态</t-button>
    </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tActionSheet from 'tdesign-uniapp/action-sheet/action-sheet';
import ActionSheet, { ActionSheetTheme } from 'tdesign-uniapp/action-sheet/index';
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
                        label: '默认选项',
                        icon: 'app'
                    },
                    {
                        label: '自定义选项',
                        icon: 'app',
                        color: '#0052D9'
                    },
                    {
                        label: '失效选项',
                        disabled: true,
                        icon: 'app'
                    },
                    {
                        label: '警告选项',
                        color: '#e34d59',
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
