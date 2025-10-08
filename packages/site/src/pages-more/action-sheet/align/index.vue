<template>
  <view>
    <t-action-sheet
      id="t-action-sheet"
      ref="t-action-sheet"
      using-custom-navbar
      @selected="handleSelected($event, { tagId: 't-action-sheet' })"
    />

    <t-button
      size="large"
      variant="outline"
      block
      theme="primary"
      @click="handleAction"
    >
      左对齐列表型
    </t-button>
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tActionSheet from 'tdesign-uniapp/action-sheet/action-sheet';
import { default as ActionSheet, ActionSheetTheme } from 'tdesign-uniapp/action-sheet/index';
export default {
  components: {
    tButton,
    tActionSheet,
  },
  data() {
    return {};
  },
  created() {},
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
            suffixIcon: 'chevron-right',
          },
          {
            label: '选项二',
            icon: 'app',
            suffixIcon: 'chevron-right',
          },
          {
            label: '选项三',
            icon: 'app',
            suffixIcon: 'chevron-right',
          },
          {
            label: '选项四',
            icon: 'app',
            suffixIcon: 'chevron-right',
          },
        ],
      });
    },
    handleSelected(e) {
      /* ---处理dataset begin--- */
      // this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      console.log(e);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
