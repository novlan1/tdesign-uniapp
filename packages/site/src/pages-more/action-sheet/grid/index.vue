<template>
  <view>
    <t-action-sheet
      id="t-action-sheet"
      using-custom-navbar
      @selected="handleSelected($event, { tagId: 't-action-sheet' })"
    />

    <t-button
      size="large"
      variant="outline"
      block
      theme="primary"
      @tap.native="handleAction"
    >
      常规宫格型
    </t-button>

    <t-button
      size="large"
      variant="outline"
      block
      theme="primary"
      @tap.native="handleMultiAction"
    >
      带翻页宫格型
    </t-button>
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tActionSheet from 'tdesign-uniapp/action-sheet/action-sheet';
import ActionSheet, { ActionSheetTheme } from 'tdesign-uniapp/action-sheet/index';
const firstGrid = [
  {
    label: '微信',
    image: 'https://tdesign.gtimg.com/mobile/demos/wechat.png',
  },
  {
    label: '朋友圈',
    image: 'https://tdesign.gtimg.com/mobile/demos/times.png',
  },
  {
    label: 'QQ',
    image: 'https://tdesign.gtimg.com/mobile/demos/qq.png',
  },
  {
    label: '企业微信',
    image: 'https://tdesign.gtimg.com/mobile/demos/wecom.png',
  },
  {
    label: '收藏',
    icon: 'star',
  },
  {
    label: '刷新',
    icon: 'refresh',
  },
  {
    label: '下载',
    icon: 'download',
  },
  {
    label: '复制',
    icon: 'queue',
  },
];
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
        theme: ActionSheetTheme.Grid,
        selector: '#t-action-sheet',
        context: this,
        items: firstGrid,
      });
    },
    handleMultiAction() {
      ActionSheet.show({
        theme: ActionSheetTheme.Grid,
        selector: '#t-action-sheet',
        context: this,
        items: firstGrid.concat(new Array(8).fill({
          label: '标题文字',
          icon: 'image',
        })),
      });
    },
    handleSelected(e) {
      /* ---处理dataset begin--- */
      // this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      console.log(e.detail);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
