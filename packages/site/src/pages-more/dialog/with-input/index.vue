<template>
  <view>
    <t-button
      t-class="wrapper"
      size="large"
      theme="primary"
      variant="outline"
      data-key="showWithInput"
      block
      @click="showDialog($event, { key: 'showWithInput' })"
    >
      输入类-无描述
    </t-button>
    <t-dialog
      :visible="showWithInput"
      title="带输入框对话框"
      confirm-btn="确定"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #content
      >
        <t-input
          borderless
          class="dialog-input"
          clearable
          placeholder="输入12文案"
          placeholder-class="placeholder"
        />
      </template>
    </t-dialog>

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showTextAndTitleWithInput"
      block
      @click="showDialog($event, { key: 'showTextAndTitleWithInput' })"
    >
      输入类-带描述
    </t-button>
    <t-dialog
      :visible="showTextAndTitleWithInput"
      title="带输入框对话框"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      confirm-btn="确定"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #content
      >
        <t-input
          borderless
          class="dialog-input"
          clearable
          placeholder="输入12文案"
          placeholder-class="placeholder"
        />
      </template>
    </t-dialog>
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tInput from 'tdesign-uniapp/input/input';
import tDialog from 'tdesign-uniapp/dialog/dialog';
export default {
  components: {
    tButton,
    tInput,
    tDialog,
  },
  data() {
    return {
      dialogKey: '',
      showWithInput: false,
      showTextAndTitleWithInput: false,
    };
  },
  created() {},
  methods: {
    showDialog(e, { key }) {
      this[key] = true;
      this.dialogKey = key;
    },
    closeDialog() {
      const { dialogKey } = this;
      this[dialogKey] = false;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
