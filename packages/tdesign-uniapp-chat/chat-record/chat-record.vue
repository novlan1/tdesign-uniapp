<template>
  <view :class="[classPrefix]">
    <view
      v-if="recordAuthStatus"
      :class="[classPrefix + '-hook']"
      @touchstart="startRecord"
      @touchend="stopRecord"
      @touchmove="touchmove"
      @touchcancel="touchcancel"
    >
      <slot
        v-if="$slots.speechInput"
        name="speechInput"
      />
      <view v-else>
        按住 说话
      </view>
    </view>
    <view
      v-else
      :class="[classPrefix + '-hook']"
      @click="openVoiceSetting"
    >
      <slot
        v-if="$slots.speechNoAuth"
        name="speechNoAuth"
      />
      <view v-else>
        请授权麦克风权限
      </view>
    </view>
    <view
      class="cover-ng-bar"
      :class="[classPrefix + '-audio-input', showMask ? 'show' : '']"
    >
      <!-- 遮罩层 -->
      <view :class="[classPrefix + '-audio-input__mask']" @click="handleCancelSend" />

      <view :class="[classPrefix + '-audio-input__main']">
        <!-- 动画图标/气泡区域 -->
        <view 
          v-if="processStatus === 'recording' || processStatus === 'confirm'" 
          :class="[classPrefix + '-audio-input-ani', 'fade-in']"
        >
          <!-- 气泡内容 -->
          <view class="bubble-container" :class="[bubbleStatusClass]">
             <!-- 1. 录音中：音量条 (只在正常状态显示) -->
             <view v-if="processStatus === 'recording' && interactStatus === 'normal'" class="audio-wave">
                <view class="wave-item" v-for="i in 13" :key="i"></view>
             </view>
             <!-- 2. 取消状态：红色气泡，省略号 -->
             <view v-else-if="interactStatus === 'release_cancel'" class="cancel-icon" />
             <!-- 3. 转文字状态或确认状态：可编辑输入框 -->
             <view v-else-if="interactStatus === 'release_convert' || processStatus === 'confirm'" class="convert-content">
                <textarea 
                  v-model="translateResult"
                  class="editable-textarea"
                  :maxlength="-1"
                />
                <!-- 省略号仅在未释放时显示 -->
                <view v-if="interactStatus === 'release_convert'" class="convert-dots" />
             </view>
          </view>
        </view>

        <!-- 底部区域 -->
        <view 
          v-if="processStatus === 'recording' || processStatus === 'confirm'" 
          :class="[classPrefix + '-audio-input__ft', processStatus, interactStatus, 'fade-in']"
        >
          
          <!-- 状态提示文案 -->
          <view class="tips-text">
            <template v-if="processStatus === 'recording'">
              <text v-if="interactStatus !== 'normal'">Audio</text>
              <text v-else>Release to send</text>
            </template>
            <template v-else-if="processStatus === 'processing'">
              Processing...
            </template>
            <!-- confirm 状态不显示提示文案 -->
          </view>

          <!-- 状态4：松手后的确认按钮区域 (Send / Cancel) -->
          <view v-if="processStatus === 'confirm'" class="confirm-actions">
            <view 
              class="action-btn btn-cancel" 
              :class="{ active: activeBtnCancel }"
              @click="handleCancelSend"
              @touchstart="activeBtnCancel = true"
              @touchend="activeBtnCancel = false"
              @touchcancel="activeBtnCancel = false"
            >
              <view class="icon-wrapper">
                <t-icon name="rollback" size="48rpx" color="#FFFFFF" />
              </view>
              <text class="btn-text">Cancel</text>
            </view>
            <view 
              class="action-btn btn-send" 
              :class="{ active: activeBtnSend }"
              @click="handleSendVoiceMsg"
              @touchstart="activeBtnSend = true"
              @touchend="activeBtnSend = false"
              @touchcancel="activeBtnSend = false"
            >
              <text>Send</text>
            </view>
          </view>

          <!-- 底部大圆背景和异形按钮 (仅在录音/处理阶段显示) -->
          <template v-else>
            <!-- 大圆背景 -->
            <view :class="[classPrefix + '-audio-input__ft__bg']" />
            
            <!-- 左侧按钮 -->
            <view 
              class="shape-btn left-btn" 
              :class="{ active: interactStatus === 'release_cancel' }"
            >
              <view
                v-if="interactStatus === 'release_cancel'"
                class="btn-hint"
                :key="'cancel-' + (interactStatus === 'release_cancel')"
              >
                <text class="word word-1">Release</text>
                <text class="word word-2">to cancel</text>
              </view>
            
              <view class="btn-label">
                <text class="word">Cancel</text>
              </view>
            </view>

            <!-- 右侧按钮 -->
            <view 
              class="shape-btn right-btn" 
              :class="{ active: interactStatus === 'release_convert' }"
            >
              <view
                v-if="interactStatus === 'release_convert'"
                class="btn-hint"
                :key="'convert-' + (interactStatus === 'release_convert')"
              >
                <text class="word word-1">Release</text>
                <text class="word word-2">to edit</text>
                <text class="word word-3">text</text>
              </view>
            
              <view class="btn-label">
                <text class="word word-1">Convert</text>
                <text class="word word-2">to Text</text>
              </view>
            </view>

          </template>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { prefix } from 'tdesign-uniapp/common/config';
import { uniComponent } from 'tdesign-uniapp/common/src/index';
import tIcon from 'tdesign-uniapp/icon/icon.vue';

const name = `${prefix}-chat-record`;

// 录音管理器实例
let manager = null;

// 注释掉录音 API，避免调试卡死
// if (typeof wx !== 'undefined' && wx.getRecorderManager) {
//   manager = wx.getRecorderManager();
// }

// 交互阈值配置
const MOVE_THRESHOLD = 40; // px，手势识别阈值

export default uniComponent({
  name: 'ChatRecord',
  
  components: {
    tIcon,
  },
  
  props: {
    // 是否自动发送（用于扩展）
    autoSend: {
      type: Boolean,
      default: false,
    },
  },
  
  data() {
    return {
      classPrefix: name,
      
      // UI 状态
      showMask: false,
      activeBtnCancel: false,
      activeBtnSend: false,
      
      // 流程状态
      processStatus: 'idle', // idle | recording | processing | confirm
      interactStatus: 'normal', // normal | release_cancel | release_convert
      
      // 录音数据
      voiceInfo: {
        voicePath: '',
        duration: 0,
      },
      
      // 转文字结果
      translateResult: '',
      
      // 手势追踪
      startTouch: { x: 0, y: 0 },
      
      // 权限状态
      recordAuthStatus: true,
    };
  },
  
  computed: {
    // 气泡样式类名
    bubbleStatusClass() {
      if (this.interactStatus === 'release_cancel') return 'bubble-red';
      if (this.interactStatus === 'release_convert' || 
          this.processStatus === 'processing' || 
          this.processStatus === 'confirm') {
        return 'bubble-wide';
      }
      return 'bubble-blue';
    },
  },
  
  mounted() {
    this.initRecordManager();
  },
  
  methods: {
    // ==================== 初始化 ====================
    
    /**
     * 初始化录音管理器
     */
    initRecordManager() {
      if (!manager) return;
      
      manager.onStart = () => {
        this.processStatus = 'recording';
      };
      
      manager.onStop = (res) => {
        const { tempFilePath, duration } = res;
        this.voiceInfo.voicePath = tempFilePath;
        this.voiceInfo.duration = Math.floor(duration / 1000) || 1;
        
        // TODO: 调用语音识别 API
        this.handleRecordFinish();
      };
      
      manager.onError = (err) => {
        console.error('[ChatRecord] 录音错误:', err);
        this.resetState();
        this.$emit('error', err);
      };
    },
    
    // ==================== 权限管理 ====================
    
    /**
     * 检查录音权限
     */
    async getVoiceAuthSetting() {
      return Promise.resolve(true);
    },
    
    /**
     * 申请录音权限
     */
    async applyAuth() {
      return Promise.resolve(true);
    },
    
    /**
     * 打开系统设置页面
     */
    openVoiceSetting() {
      // TODO: 引导用户打开设置
    },
    
    // ==================== 录音控制 ====================
    
    /**
     * 开始录音
     */
    async startRecord(e) {
      // 记录起始触摸点
      if (e && e.changedTouches && e.changedTouches[0]) {
        const { clientX, clientY } = e.changedTouches[0];
        this.startTouch = { x: clientX, y: clientY };
      }
      
      // 重置状态
      this.showMask = true;
      this.processStatus = 'recording';
      this.interactStatus = 'normal';
      this.translateResult = '';
      
      // 触发开始事件
      this.$emit('start');
      
      // 开始录音（注释掉，使用模拟）
      console.log('[ChatRecord] 模拟录音开始');
      // if (manager) {
      //   manager.start({ duration: 60000 });
      // }
    },
    
    /**
     * 手势移动处理
     */
    touchmove(e) {
      if (this.processStatus !== 'recording') return;
      
      const { clientX, clientY } = e.changedTouches[0];
      const deltaX = clientX - this.startTouch.x;
      const deltaY = clientY - this.startTouch.y;
      
      // 判断手势方向
      if (deltaY < -MOVE_THRESHOLD) {
        // 向上滑动
        if (deltaX < -MOVE_THRESHOLD) {
          this.interactStatus = 'release_cancel'; // 左上：取消
        } else if (deltaX > MOVE_THRESHOLD) {
          this.interactStatus = 'release_convert'; // 右上：转文字
        } else {
          this.interactStatus = 'normal'; // 正上：无操作
        }
      } else {
        this.interactStatus = 'normal';
      }
    },
    
    /**
     * 停止录音
     */
    stopRecord() {
      if (this.processStatus !== 'recording') return;
      
      if (this.interactStatus === 'release_cancel') {
        // 取消录音
        this.cancelRecord();
      } else if (this.interactStatus === 'release_convert') {
        // 转文字
        this.convertToText();
      } else {
        // 直接发送语音
        this.sendVoice();
      }
    },
    
    /**
     * 触摸取消
     */
    touchcancel() {
      this.cancelRecord();
    },
    
    // ==================== 业务逻辑 ====================
    
    /**
     * 取消录音
     */
    cancelRecord() {
      console.log('[ChatRecord] 取消录音');
      // if (manager) manager.stop();
      this.$emit('cancel');
      this.resetState();
    },
    
    /**
     * 转换为文字
     */
    convertToText() {
      console.log('[ChatRecord] 转换为文字');
      this.processStatus = 'confirm';
      this.interactStatus = 'normal';
      
      // TODO: 调用语音识别 API
      // this.translateResult = '识别结果';
    },
    
    /**
     * 直接发送语音
     */
    sendVoice() {
      console.log('[ChatRecord] 发送语音');
      this.$emit('send', {
        voicePath: this.voiceInfo.voicePath,
        duration: this.voiceInfo.duration,
      });
      this.resetState();
    },
    
    /**
     * 录音完成处理
     */
    handleRecordFinish() {
      // 模拟识别延迟
      setTimeout(() => {
        this.processStatus = 'confirm';
      }, 500);
    },
    
    /**
     * 发送转文字结果
     */
    handleSendVoiceMsg() {
      this.$emit('recognize', this.translateResult);
      this.resetState();
    },
    
    /**
     * 取消发送
     */
    handleCancelSend() {
      this.$emit('cancel');
      this.resetState();
    },
    
    // ==================== 状态管理 ====================
    
    /**
     * 重置所有状态
     */
    resetState() {
      this.showMask = false;
      this.processStatus = 'idle';
      this.interactStatus = 'normal';
      this.translateResult = '';
      this.voiceInfo = { voicePath: '', duration: 0 };
      this.activeBtnCancel = false;
      this.activeBtnSend = false;
    },
  },
});
</script>

<style scoped>
@import './chat-record.css';
</style>
