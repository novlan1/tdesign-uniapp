<template>
  <view>
    <t-toast id="t-toast" />
    <view class="container">
      <t-chat-actionbar
        :content="content"
        @actions="handleAction"
      />
    </view>
  </view>
</template>

<script>
import tChatActionbar from 'tdesign-uniapp/chat-actionbar/chat-actionbar';
import tToast from 'tdesign-uniapp/toast/toast';
import Toast from 'tdesign-uniapp/toast';
export default {
  components: {
    tChatActionbar,
    tToast,
  },
  data() {
    return {
      content: '这是一段可以被复制的内容，支持markdown格式。\n\n**粗体文本**\n*斜体文本*\n\n- 列表项1\n- 列表项2',
    };
  },
  created() {},
  methods: {
    handleAction(e) {
      const { name, active, data } = e.detail;
      let message = '';
      switch (name) {
        case 'replay':
          message = '重新生成';
          break;
        case 'copy':
          console.log(data);
          message = '复制成功';
          break;
        case 'good':
          message = active ? '点赞成功' : '取消点赞';
          break;
        case 'bad':
          message = active ? '点踩成功' : '取消点踩';
          break;
        case 'share':
          message = '分享功能';
          break;
        default:
          message = `执行了${name}操作`;
      }
      Toast({
        context: this,
        selector: '#t-toast',
        message,
        theme: 'success',
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
