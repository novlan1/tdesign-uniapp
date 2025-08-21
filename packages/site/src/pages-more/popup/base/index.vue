<template>
  <view>
    <t-popup
      :visible="visible"
      using-custom-navbar
      :placement="cur.value || 'top'"
      @visible-change="onVisibleChange"
    >
      <view :class="'block block--' + cur.value">
        {{ cur.text }}
      </view>
    </t-popup>

    <t-button
      v-for="(item, index) in position"
      :key="index"
      block
      size="large"
      variant="outline"
      theme="primary"
      :data-item="item"
      t-class="wrapper"
      @click="handlePopup($event, { item })"
    >
      {{ item.text }}
    </t-button>
  </view>
</template>

<script>
import tPopup from 'tdesign-uniapp/popup/popup';
import tButton from 'tdesign-uniapp/button/button';
export default {
  components: {
    tPopup,
    tButton,
  },
  data() {
    return {
      cur: {
        value: '',
        text: '',
      },

      position: [
        {
          value: 'top',
          text: '顶部弹出',
        },
        {
          value: 'left',
          text: '左侧弹出',
        },
        {
          value: 'center',
          text: '中间弹出',
        },
        {
          value: 'bottom',
          text: '底部弹出',
        },
        {
          value: 'right',
          text: '右侧弹出',
        },
      ],

      visible: false,
    };
  },
  created() {},
  methods: {
    handlePopup(e, { item }) {
    //
      /* ---处理dataset begin--- */
      //   this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      //   const { item } = e.currentTarget.dataset;
      this.cur = item;

      setTimeout(() => {
        this.visible = true;
      });
    //   this.setData(
    //     {
    //       cur: item,
    //     },
    //     () => {
    //       this.setData({
    //         visible: true,
    //       });
    //     },
    //   );
    },
    onVisibleChange(e) {
      this.visible = e.detail.visible;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
