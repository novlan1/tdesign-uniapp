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
      :class="[classPrefix + '-audio-input', status, showMask ? 'show' : '']"
    >
      <view :class="[classPrefix + '-audio-input__mask']" />
      <view :class="[classPrefix + '-audio-input__main']">
        <!-- 动画图标 -->
        <view :class="[classPrefix + '-audio-input-ani']">
          <view class="ani-cir diff-start">
            <view class="ani-cir-1" />
            <view class="ani-cir-2" />
            <view class="ani-cir-3" />
            <view class="ani-cir-4" />
          </view>
          <view class="ani-wrap">
            <view class="ani-inner" />
            <view class="ani-mask" />
            <view
              class="ani-main"
              :class="status === 'recording' ? 'ani-start' : 'ani-end'"
            />
          </view>
        </view>

        <!-- 内容区域 -->
        <view :class="[classPrefix + '-audio-input__con', status === 'cancel' ? 'disabled' : '']">
          <view
            v-if="status !== 'recording' && !translateSuccess && touchStatus !== 'top'"
            :class="[classPrefix + '-audio-input__con__inner']"
          >
            {{
              status === 'unknow' ? '不好意思，未能识别您的语音' : '我在听，请说话'
            }}
          </view>
          <textarea
            v-else
            :class="[classPrefix + '-audio-input__con__ta', bottomHeight === 0 ? 'txt-limit-9' : 'txt-limit-5']"
            maxlength="-1"
            auto-height
            :value="translateResult"
            @focus="focusTextarea"
            @blur="blurTextarea"
          />
        </view>

        <!-- 底部区域 -->
        <view :class="[classPrefix + '-audio-input__ft']">
          <view
            v-if="status === 'cancel'"
            :class="[classPrefix + '-audio-input__ft__tips']"
          >
            松开手指 即可取消
          </view>
          <view
            v-else-if="status === 'unknow'"
            :class="[classPrefix + '-audio-input__ft__tips']"
          >
            点击下方重新开始说话
          </view>
          <view
            v-else-if="status === 'normal'"
            :class="[classPrefix + '-audio-input__ft__tips']"
          >
            松手完成 上滑取消
          </view>

          <view
            v-if="showRecordCountDown"
            :class="[classPrefix + '-audio-input__ft__tips__inner']"
          >
            {{ recordCountDown }}秒后停止语音输入
          </view>

          <!-- 加载动画 -->
          <i class="audio-loading-icon">
            <i class="audio-loading-dot dot-1" />
            <i class="audio-loading-dot dot-1" />
            <i class="audio-loading-dot dot-2" />
            <i class="audio-loading-dot dot-2" />
            <i class="audio-loading-dot dot-3" />
            <i class="audio-loading-dot dot-2" />
            <i class="audio-loading-dot dot-3" />
            <i class="audio-loading-dot dot-2" />
            <i class="audio-loading-dot dot-1" />
            <i class="audio-loading-dot dot-1" />
            <i class="audio-loading-dot dot-1" />
          </i>

          <!-- 操作按钮 -->
          <view
            class="speak-close-btn"
            @click="handleCancelSend"
          >
            <i class="close-icon" />
          </view>
          <view
            class="speak-btn"
            @touchstart="startRecord"
            @touchend="stopRecord"
            @touchmove="touchmove"
            @touchcancel="touchcancel"
          >
            <i class="speak-icon" />
            <view class="tips-txt">
              按住说话
            </view>
          </view>

          <!-- 发送控制 -->
          <view
            class="keyboard-cover"
            :class="[classPrefix + '-audio-input__ft__ct']"
            :style="{
              'margin-bottom': bottomHeight + 'px',
            }"
          >
            <view
              :class="[classPrefix + '-audio-input__ft__btn']"
              class="btn-close"
              @click="handleCancelSend"
            >
              <i class="close-icon" />
            </view>
            <view
              :class="[classPrefix + '-audio-input__ft__btn']"
              class="btn-send"
              @click="handleSendVoiceMsg"
            >
              发送
            </view>
          </view>
          <view :class="[classPrefix + '-audio-input__ft__bg']" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { prefix } from 'tdesign-uniapp/common/config';
import { uniComponent } from 'tdesign-uniapp/common/src/index';

const name = `${prefix}-chat-record`;

let startRecordTimer = null; // 语音录制定时器-模拟长按
let recordTimer = null;

// eslint-disable-next-line no-undef
const plugin = requirePlugin('WechatSI');
const manager = plugin.getRecordRecognitionManager();

export default uniComponent({
  name: 'ChatRecord',
  components: {},
  props: {},
  data() {
    return {
      classPrefix: name,
      showMask: false, // 是否展示语音输入操作面板
      touchStatus: 'bottom', // 语音输入 - 当前手指状态 top：取消， bottom：正常
      startTime: 0, // 开始录音时间
      recordCountDown: -1, // 语音输入倒计时
      translateResult: '', // 语音转文字结果
      voiceInfo: {
        voicePath: '',
        duration: 0,
      }, // 语音消息信息（voicePath：语音文件本地路径；mediaTime：语音消息时长）
      recordStatus: '', // 录音状态 start 开始录音， stop 结束录音
      recordAuthSetting: false, // 是否已授权语音输入
      recordAuthStatus: true, // 是否展示拒绝授权文案
      isStarted: false, // 是否点击了 // 解决点击结束太快，授权信息还没拿到的情况
      bottomHeight: 0, // 底部高度
      autoSendHeight: true, // 是否自动抬升发送按钮高度
      windowHeight: 0, // 窗口高度，用于手指滑动判断
    };
  },
  computed: {
    translateSuccess() {
      return this.translateResult !== '-1' && this.translateResult;
    },
    showRecordCountDown() {
      return this.recordCountDown >= 0;
    },
    status() {
      // 只要检查到用户上滑，但是还没松开手指的时候就转换为cancel状态
      if (this.touchStatus === 'top') return 'cancel';
      // 正在录音中的状态
      if (this.recordStatus === 'recording') return 'recording';
      if (this.recordStatus === 'thinking') return 'thinking';
      if (this.recordStatus === 'stop' && !this.translateSuccess) return 'unknow';
      if (this.recordStatus === 'stop' && this.translateSuccess) return 'complete';
      if (this.recordStatus === 'error') return 'error';
      return 'normal';
    },
  },
  mounted() {
    // 初始化录音管理器
    this.initRecorderManager();
    // 获取窗口高度
    this.getWindowHeight();
  },
  beforeDestroy() {
    if (recordTimer) {
      clearInterval(recordTimer);
      recordTimer = null;
    }
    if (startRecordTimer) {
      clearTimeout(startRecordTimer);
      startRecordTimer = null;
    }
    if (manager) {
      manager.stop();
    }
  },
  methods: {
    /**
     * @description 初始化同声传译插件
     */
    initRecorderManager() {
      manager.onStop = (res) => {
        console.log('onStop record file path', res);
        console.log('result', res.result);
        const { tempFilePath, duration } = res;
        this.voiceInfo.voicePath = tempFilePath;
        this.voiceInfo.duration = Math.floor(duration / 1000) || 1;

        if (this.touchStatus === 'top') {
          // 结束时，手指在取消发送区域
          console.log('取消发送');
          this.resetRecordState();
          return;
        }

        this.recordStatus = 'stop';
        this.touchStatus = '';
      };

      manager.onStart = (res) => {
        console.log('onStart成功开始录音识别', res);
        this.recordStatus = 'thinking';
      };

      manager.onRecognize = (res) => {
        console.log('onRecognize识别中:', res.result);
        if (res.result && !res.end) {
          this.recordStatus = 'recording';
          this.translateResult = res.result;
        }
      };

      manager.onError = (res) => {
        console.error('录音错误', res.msg);
        this.recordStatus = 'error';
        this.touchStatus = '';
        this.translateResult = '-1';
        uni.showToast({
          icon: 'none',
          title: '录音失败，请重试',
        });
      };
    },
    /**
     * @description 重置录音状态
     */
    resetRecordState() {
      this.showMask = false;
      this.translateResult = '';
      this.recordStatus = '';
      this.touchStatus = '';
      this.recordCountDown = -1;
      this.startTime = 0;
    },
    /**
     * @description 获取窗口高度
     */
    getWindowHeight() {
      uni.getSystemInfo({
        success: (res) => {
          this.windowHeight = res.windowHeight;
        },
      });
    },
    openVoiceSetting() {
      uni.showModal({
        title: '提示',
        content: '即将跳转到设置页',
        success: (res) => {
          if (res.confirm) {
            uni.openSetting({
              success: (res) => {
                this.recordAuthSetting = !!res.authSetting['scope.record'];
                this.recordAuthStatus = !!res.authSetting['scope.record'];
                this.$nextTick(() => {
                  this.$forceUpdate();
                });
              },
            });
          }
        },
      });
    },
    getVoiceAuthSetting() {
      return new Promise((resolve, reject) => {
        uni.getSetting({
          success: (res) => {
            const authSettings = Object.keys(res.authSetting);
            // 是否已经授权了
            this.recordAuthSetting = authSettings.includes('scope.record');
            // 当前授权状态
            this.recordAuthStatus = !!res.authSetting['scope.record'];
            resolve(this.recordAuthSetting);
          },
          fail: () => {
            reject(false);
          },
        });
      });
    },
    applyAuth() {
      return new Promise((resolve, reject) => {
        uni.authorize({
          scope: 'scope.record',
          success: () => {
            this.recordAuthSetting = true;
            this.recordAuthStatus = true;
            resolve(true);
          },
          fail: () => {
            this.recordAuthSetting = false;
            this.recordAuthStatus = false;
            reject(false);
          },
        });
      });
    },
    /**
     * @description 修改语音转文字结果
     * @params value 输入框文本值
     */
    onTranslateResultChange(value) {
      this.translateResult = value;
    },
    /**
     * @description 直接发送语音消息
     */
    handleSendVoiceMsg() {
      if (this.translateResult && this.translateResult !== '-1') {
        this.sendVoiceMsg(this.translateResult);
      }
      this.resetRecordState();
    },
    /**
     * @description 取消发送语音
     */
    handleCancelSend() {
      this.resetRecordState();
    },
    /**
     * @description 开始录音
     */
    async startRecord(e) {
      console.log('开始录音触发', e);

      // 防止重复触发
      if (this.isStarted) {
        console.log('已经在录音中，忽略');
        return;
      }

      this.isStarted = true;

      // 检查授权
      try {
        await this.getVoiceAuthSetting();
        if (!this.recordAuthSetting) {
          await this.applyAuth();
          this.isStarted = false;
          return;
        }
      } catch (error) {
        console.error('授权检查失败', error);
        this.isStarted = false;
        return;
      }

      // 阻止默认行为
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      this.touchStatus = 'bottom';
      // 记录开始录音时间
      this.startTime = new Date().getTime();

      // 500ms后开始录音，模拟长按效果，避免误操作
      startRecordTimer = setTimeout(() => {
        if (!this.isStarted) {
          console.log('录音已取消');
          return;
        }

        console.log('开始录音');
        this.showMask = true;

        // 确保录音管理器已初始化
        if (!manager) {
          this.initRecorderManager();
        }

        manager.start({ duration: 30000, lang: 'zh_CN' });

        // 最大支持60s连续录音，50s时开始倒计时
        recordTimer = setInterval(() => {
          const recordTime = new Date().getTime() - this.startTime;
          if (recordTime > 50000) {
            if (this.recordCountDown === -1) {
              this.recordCountDown = 10;
            } else {
              this.recordCountDown -= 1;
            }
          }
          if (recordTime > 60000) {
            console.log('录音超时，自动停止');
            this.stopRecord();
          }
        }, 1000);
      }, 500);
    },
    /**
     * @description 结束录音
     */
    stopRecord() {
      console.log('结束录音触发', {
        isStarted: this.isStarted,
        startTime: this.startTime,
        touchStatus: this.touchStatus,
      });

      // 标记录音结束
      this.isStarted = false;

      // 清除定时器
      if (recordTimer) {
        clearInterval(recordTimer);
        recordTimer = null;
      }
      if (startRecordTimer) {
        clearTimeout(startRecordTimer);
        startRecordTimer = null;
      }

      this.recordCountDown = -1;

      // 松开的时候，判断有没有授权
      if (!this.recordAuthStatus) {
        console.log('未授权，取消录音');
        this.showMask = false;
        this.startTime = 0;
        return;
      }

      // 根据startTime判断是否已经自动触发停止录音接口，避免二次调用
      if (this.startTime === 0) {
        console.log('startTime为0，已停止过');
        return;
      }

      const recordTime = new Date().getTime() - this.startTime;
      console.log('录音时长', recordTime);

      // 根据当前时间 减去 startTime判断录音时间是否大于500ms，避免录音时间过短
      if (recordTime > 500) {
        // 语音消息时长
        console.log('停止录音');
        this.voiceInfo.duration = Math.floor(recordTime / 1000) || 1;
        this.startTime = 0;

        if (manager) {
          manager.stop();
        }
      } else {
        console.log('录音时间太短');
        this.showMask = false;
        this.startTime = 0;
        uni.showToast({
          icon: 'none',
          title: '说话时间太短',
        });
      }
    },
    /**
     * @description 录音过程中手指移动事件
     */
    touchmove(e) {
      // 只有在录音中才处理滑动
      if (!this.isStarted || !this.showMask) {
        return;
      }

      // 根据clientY坐标值判断目前手指所处区域，触发不同的交互（发送、取消发送）
      const bottomHeight = 150;
      const { changedTouches } = e;
      if (!changedTouches || !changedTouches[0]) {
        return;
      }

      const { clientY } = changedTouches[0];
      const oldStatus = this.touchStatus;

      // 使用缓存的窗口高度
      if (clientY > this.windowHeight - bottomHeight) {
        this.touchStatus = 'bottom';
      } else {
        this.touchStatus = 'top';
      }

      // 状态变化时打印日志
      if (oldStatus !== this.touchStatus) {
        console.log('手指位置变化', {
          clientY,
          windowHeight: this.windowHeight,
          touchStatus: this.touchStatus,
        });
      }
    },
    /**
     * @description 录音过程中被系统事件打断，结束录音
     */
    touchcancel() {
      console.log('录音被打断');

      if (manager) {
        manager.stop();
      }

      if (recordTimer) {
        clearInterval(recordTimer);
        recordTimer = null;
      }
      if (startRecordTimer) {
        clearTimeout(startRecordTimer);
        startRecordTimer = null;
      }

      this.resetRecordState();
      this.isStarted = false;
    },
    /**
     * @description 发送语音消息，可以重写此方法
     * @param {String} voiceMsg 语音消息 String
     */
    sendVoiceMsg(voiceMsg) {
      this.$emit('recognize', voiceMsg);
    },

    focusTextarea(e) {
      if (this.autoSendHeight) {
        this.bottomHeight = e.detail.height;
      }
    },
    blurTextarea() {
      this.bottomHeight = 0;
    },
  },
});
</script>

<style scoped>
@import './chat-record.css';
</style>
