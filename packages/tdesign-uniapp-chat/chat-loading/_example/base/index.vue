<template>
  <view class="chat-example">
    <!-- <view class="chat-example-block">
    <t-chat-loading animation="skeleton" />
  </view> -->
    <view class="chat-example-block">
      <t-chat-loading animation="gradient" />
    </view>
    <view class="chat-example-block">
      <t-chat-loading animation="moving" />
    </view>
    <view class="chat-example-block">
      <t-chat-loading animation="dots" />
    </view>
  </view>
</template>

<script>
import tChatLoading from 'tdesign-uniapp-chat/chat-loading/chat-loading.vue';


export default {
  components: {
    tChatLoading,
  },

  data() {
    return {
      // currentAnimation: 'skeleton',
      // loadingText: '',
      // animations: [
      //   {
      //     key: 'moving',
      //     text: '正在理解中...',
      //   },
      //   {
      //     key: 'gradient',
      //     text: '深度思考中...',
      //   },
      //   {
      //     key: 'circle',
      //     text: '加载中...',
      //   },
      //   {
      //     key: 'skeleton',
      //     text: '',
      //   },
      // ],
    };
  },

  // onLoad() {
  //   // 模拟动画切换
  //   this.startAnimationCycle();
  // },

  // startAnimationCycle() {
  //   let index = 0;
  //   this.animationTimer = setInterval(() => {
  //     const animation = this.animations[index];
  //     this.currentAnimation = animation.key;
  //     this.loadingText = animation.text;

  //     index = (index + 1) % this.animations.length;
  //   }, 2000); // 每2秒切换一次动画
  // },

  // onUnload() {
  //   // 清理定时器
  //   if (this.animationTimer) {
  //     clearInterval(this.animationTimer);
  //   }
  // },

  // // 手动切换动画类型
  // switchAnimation(e) {
  //   const { animation } = e.currentTarget.dataset;
  //   const animationData = this.animations.find(item => item.key === animation);
  //   if (animationData) {
  //     this.currentAnimation = animationData.key;
  //     this.loadingText = animationData.text;
  //   }
  // },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
