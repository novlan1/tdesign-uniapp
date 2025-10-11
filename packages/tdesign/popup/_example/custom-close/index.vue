<template>
  <view>
    <t-popup
      :visible="visible"
      placement="center"
      @visible-change="onVisibleChange"
    >
      <view class="block">
        <t-icon
          t-class="close-btn"
          name="close-circle"
          size="64rpx"
          color="#fff"
          @click="onClose"
        />
      </view>
    </t-popup>

    <t-button
      block
      size="large"
      variant="outline"
      theme="primary"
      @click="handlePopup"
    >
      居中弹出层-带自定义关闭按钮
    </t-button>
  </view>
</template>

<script>
import tPopup from 'tdesign-uniapp/popup/popup';
import tIcon from 'tdesign-uniapp/icon/icon';
import tButton from 'tdesign-uniapp/button/button';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tPopup,
    tIcon,
    tButton,
  },
  data() {
    return {
      cur: {},

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
    handlePopup() {
      this.visible = true;
    },
    onVisibleChange({ visible }) {
      this.visible = visible;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style scoped>
@import './index.css';
</style>
