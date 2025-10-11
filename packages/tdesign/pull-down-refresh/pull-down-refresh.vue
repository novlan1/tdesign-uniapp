<template>
  <scroll-view
    :style="_._style([style, customStyle, 'max-height: calc(100vh - ' + distanceTop + 'px)'])"
    :class="classPrefix + ' class ' + prefix + '-class'"
    type="list"
    :scroll-top="scrollTop"
    scroll-y
    :enable-back-to-top="enableBackToTop"
    :enable-passive="enablePassive"
    :lower-threshold="lowerThreshold"
    :upper-threshold="upperThreshold"
    :scroll-into-view="scrollIntoView"
    :show-scrollbar="showScrollbar"
    enhanced
    scroll-with-animation
    :bounces="false"
    :throttle="false"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @scroll="onScroll"
    @dragstart="onDragStart"
    @dragging="onDragging"
    @dragend="onDragEnd"
    @scrolltoupper="onScrollToTop"
    @scrolltolower="onScrollToBottom"
  >
    <slot name="header" />
    <view
      :class="classPrefix + '__track ' + (classPrefix + '__track--' + (loosing ? 'loosing' : ''))"
      :style="barHeight > 0 ? 'transform: translate3d(0, ' + barHeight + 'px, 0);' : ''"
    >
      <view
        :class="classPrefix + '__tips ' + (classPrefix + '__tips--' + (loosing ? 'loosing' : ''))"
        :style="'height: ' + tipsHeight + 'px'"
        aria-live="polite"
      >
        <t-loading
          v-if="refreshStatus === 2"
          :delay="loadingProps.delay || 0"
          :duration="loadingProps.duration || 800"
          :indicator="loadingProps.indicator || true"
          :layout="loadingProps.layout || 'horizontal'"
          :loading="loadingProps.loading || true"
          :pause="loadingProps.pause || false"
          :progress="loadingProps.progress || 0"
          :reverse="loadingProps.reverse || false"
          :size="loadingProps.size || '50rpx'"
          :text="loadingProps.text || dataLoadingTexts[refreshStatus]"
          :theme="loadingProps.theme || 'circular'"
          :t-class-indicator="prefix + '-class-indicator'"
        />
        <view
          v-else-if="refreshStatus >= 0"
          :class="classPrefix + '__text ' + prefix + '-class-text'"
        >
          {{ dataLoadingTexts[refreshStatus] }}
        </view>
      </view>
      <slot />
    </view>
  </scroll-view>
</template>
<script>
import tLoading from '../loading/loading';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { getRect, systemInfo, unitConvert } from '../common/utils';
// import { canUseProxyScrollView } from '../common/version';
import _ from '../common/utils.wxs';
import { getObserver } from '../common/wechat';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-pull-down-refresh`;
const defaultLoadingTexts = ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'];


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-loading`,
    `${prefix}-class-text`,
    `${prefix}-class-indicator`,
  ],
  mixins: [
    ParentMixin(RELATION_MAP.BackTop),
  ],
  components: {
    tLoading,
  },
  props: {
    ...props,
  },
  emits: [
    'scrolltolower',
    'scroll',
    'change',
    'refresh',
    'dragstart',
    'dragging',
    'dragend',
    'timeout',
  ],
  data() {
    return {
      prefix,
      classPrefix: name,
      distanceTop: 0,
      barHeight: 0,
      tipsHeight: 0,
      refreshStatus: -1,
      loosing: false,
      enableToRefresh: true,
      scrollTop: 0,
      _maxBarHeight: 0,
      _loadingBarHeight: 0,

      pixelRatio: 1,
      startPoint: null,
      isPulling: false,
      maxRefreshAnimateTimeFlag: 0,
      closingAnimateTimeFlag: 0,
      refreshStatusTimer: null,

      _,
    };
  },
  watch: {
    value(val) {
      if (!val) {
        clearTimeout(this.maxRefreshAnimateTimeFlag);
        if (this.refreshStatus > 0) {
          this.refreshStatus = 3;
        }
        this.barHeight = 0;
      } else {
        this.doRefresh();
      }
    },
    barHeight(val) {
      this.resetTimer();
      if (val === 0 && this.refreshStatus !== -1) {
        this.refreshStatusTimer = setTimeout(() => {
          this.refreshStatus = -1;
        }, 240);
      }

      this.tipsHeight = Math.min(val, this._loadingBarHeight);
    },

    maxBarHeight(v) {
      this._maxBarHeight = unitConvert(v);
    },

    loadingBarHeight(v) {
      this._loadingBarHeight = unitConvert(v);
    },
  },
  mounted() {
    const { screenWidth } = systemInfo;
    const { loadingTexts, maxBarHeight, loadingBarHeight } = this;
    const isCustomLoadingTexts = Array.isArray(loadingTexts) && loadingTexts.length >= 4;

    this._maxBarHeight = unitConvert(maxBarHeight);
    this._loadingBarHeight = unitConvert(loadingBarHeight);
    this.dataLoadingTexts = isCustomLoadingTexts ? loadingTexts : defaultLoadingTexts;

    this.pixelRatio = 750 / screenWidth;

    this.updateDistanceTop();
  },

  beforeUnMount() {
    clearTimeout(this.maxRefreshAnimateTimeFlag);
    clearTimeout(this.closingAnimateTimeFlag);
    this.resetTimer();
  },
  methods: {
    updateDistanceTop() {
      const update = (top) => {
        this.distanceTop = top;
      };

      getRect(this, `.${name}`).then((rect) => {
        if (rect.top) {
          update(rect.top);
          return;
        }

        getObserver(this, `.${name}`).then((res) => {
          if (res.intersectionRatio > 0) {
            update(res.boundingClientRect.top);
          }
        });
      });
    },

    resetTimer() {
      if (this.refreshStatusTimer) {
        clearTimeout(this.refreshStatusTimer);
        this.refreshStatusTimer = null;
      }
    },

    onScrollToBottom() {
      this.$emit('scrolltolower');
    },

    onScrollToTop() {
      this.enableToRefresh = true;
    },

    onScroll(e) {
      const { scrollTop } = e.detail;

      this.enableToRefresh = scrollTop === 0;
      this.$emit('scroll', { scrollTop });
    },

    onTouchStart(e) {
      if (this.isPulling || !this.enableToRefresh || this.disabled) return;
      const { touches } = e;
      if (touches.length !== 1) return;
      const { pageX, pageY } = touches[0];

      this.loosing = false;
      this.startPoint = { pageX, pageY };
      this.isPulling = true;
    },

    onTouchMove(e) {
      if (!this.startPoint || this.disabled) return;

      const { touches } = e;

      if (touches.length !== 1) return;

      const { pageY } = touches[0];
      const offset = pageY - this.startPoint.pageY;

      if (offset > 0) {
        this.setRefreshBarHeight(offset);
      }
    },

    onTouchEnd(e) {
      if (!this.startPoint || this.disabled) return;
      const { changedTouches } = e;
      if (changedTouches.length !== 1) return;
      const { pageY } = changedTouches[0];

      const barHeight = pageY - this.startPoint.pageY;
      this.startPoint = null; // 清掉起点，之后将忽略touchMove、touchEnd事件
      this.isPulling = false;

      this.loosing = true;

      // 松开时高度超过阈值则触发刷新
      if (barHeight > this._loadingBarHeight) {
        this._trigger('change', { value: true });
        this.$emit('refresh');
      } else {
        this.barHeight = 0;
      }
    },

    onDragStart(e) {
      const { scrollTop, scrollLeft } = e.detail;

      this.$emit('dragstart', { scrollTop, scrollLeft });
    },

    onDragging(e) {
      const { scrollTop, scrollLeft } = e.detail;

      this.$emit('dragging', { scrollTop, scrollLeft });
    },

    onDragEnd(e) {
      const { scrollTop, scrollLeft } = e.detail;

      this.$emit('dragend', { scrollTop, scrollLeft });
    },

    doRefresh() {
      if (this.disabled) return;
      this.barHeight = this._loadingBarHeight;
      this.refreshStatus = 2;
      this.loosing = true;

      this.maxRefreshAnimateTimeFlag = setTimeout(() => {
        this.maxRefreshAnimateTimeFlag = null;

        if (this.refreshStatus === 2) {
          // 超时回调
          this.$emit('timeout');
          this._trigger('change', { value: false });
        }
      }, this.refreshTimeout);
    },

    setRefreshBarHeight(value) {
      const barHeight = Math.min(value, this._maxBarHeight);
      const data = { barHeight };

      if (barHeight >= this._loadingBarHeight) {
        data.refreshStatus = 1;
      } else {
        data.refreshStatus = 0;
      }
      return new Promise((resolve) => {
        Object.keys(data).forEach((key) => {
          this[key] = data[key];
        });
        setTimeout(() => {
          resolve(barHeight);
        }, 20);
        // this.setData(data, () => resolve(barHeight));
      });
    },

    setScrollTop(scrollTop) {
      // this.setData({ scrollTop });
      this.scrollTop = scrollTop;
    },

    scrollToTop() {
      // https://yuanbao.tencent.com/chat/naQivTmsDa/c10ae37f-c66f-4489-ac4e-e72710a3f65a
      // #ifdef H5
      this.scrollTop = this.scrollTop === 0 ? 0.01 : 0;
      // #endif
      // #ifndef H5
      this.setScrollTop(0);
      // #endif
    },
  },
});

// let PullDownRefresh = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.pixelRatio = 1;
//     this.startPoint = null;
//     this.isPulling = false;
//     this.maxRefreshAnimateTimeFlag = 0;
//     this.closingAnimateTimeFlag = 0;
//     this.refreshStatusTimer = null;
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-loading`, `${prefix}-class-text`, `${prefix}-class-indicator`];
//     this.behaviors = canUseProxyScrollView() ? ["wx://proxy-scroll-view"] : [];
//     this.options = {
//       multipleSlots: true,
//       pureDataPattern: /^_/
//     };
//     this.relations = {
//       "../back-top/back-top": {
//         type: "descendant"
//       }
//     };
//     this.properties = props;;
//     this.setData({
//       prefix: prefix,
//       classPrefix: name,
//       distanceTop: 0,
//       barHeight: 0,
//       tipsHeight: 0,
//       refreshStatus: -1,
//       loosing: false,
//       enableToRefresh: true,
//       scrollTop: 0,
//       _maxBarHeight: 0,
//       _loadingBarHeight: 0
//     });
//     this.lifetimes = {
//       attached() {
//         const {
//           screenWidth: t
//         } = systemInfo;
//         const {
//           loadingTexts: e,
//           maxBarHeight: s,
//           loadingBarHeight: i
//         } = this;
//         const r = Array.isArray(e) && e.length >= 4;
//         this.setData({
//           _maxBarHeight: unitConvert(s),
//           _loadingBarHeight: unitConvert(i),
//           loadingTexts: r ? e : defaultLoadingTexts
//         });
//         this.pixelRatio = 750 / t;
//         getRect(this, `.${name}`).then(t => {
//           this.setData({
//             distanceTop: t.top
//           });
//         });
//       },
//       detached() {
//         clearTimeout(this.maxRefreshAnimateTimeFlag);
//         clearTimeout(this.closingAnimateTimeFlag);
//         this.resetTimer();
//       }
//     };
//     this.observers = {
//       value(t) {
//         t ? this.doRefresh() : (clearTimeout(this.maxRefreshAnimateTimeFlag), this.refreshStatus > 0 && this.setData({
//           refreshStatus: 3
//         }), this.setData({
//           barHeight: 0
//         }));
//       },
//       barHeight(t) {
//         this.resetTimer();
//         if (0 === t && -1 !== this.refreshStatus) {
//           this.refreshStatusTimer = setTimeout(() => {
//             this.setData({
//               refreshStatus: -1
//             });
//           }, 240);
//         }
//         this.setData({
//           tipsHeight: Math.min(t, this._loadingBarHeight)
//         });
//       },
//       maxBarHeight(t) {
//         this.setData({
//           _maxBarHeight: unitConvert(t)
//         });
//       },
//       loadingBarHeight(t) {
//         this.setData({
//           _loadingBarHeight: unitConvert(t)
//         });
//       }
//     };
//     this.methods = {
//       resetTimer() {
//         if (this.refreshStatusTimer) {
//           clearTimeout(this.refreshStatusTimer);
//           this.refreshStatusTimer = null;
//         }
//       },
//       onScrollToBottom() {
//         this.$emit("scrolltolower");
//       },
//       onScrollToTop() {
//         this.setData({
//           enableToRefresh: true
//         });
//       },
//       onScroll(t) {
//         const {
//           scrollTop: e
//         } = t.detail;
//         this.setData({
//           enableToRefresh: 0 === e
//         });
//         this.$emit("scroll", {
//           detail: {
//             scrollTop: e
//           }
//         });
//       },
//       onTouchStart(t) {
//         if (this.isPulling || !this.enableToRefresh || this.disabled) {
//           return;
//         }
//         const {
//           touches: e
//         } = t;
//         if (1 !== e.length) {
//           return;
//         }
//         const {
//           pageX: s,
//           pageY: i
//         } = e[0];
//         this.setData({
//           loosing: false
//         });
//         this.startPoint = {
//           pageX: s,
//           pageY: i
//         };
//         this.isPulling = true;
//       },
//       onTouchMove(t) {
//         if (!this.startPoint || this.disabled) {
//           return;
//         }
//         const {
//           touches: e
//         } = t;
//         if (1 !== e.length) {
//           return;
//         }
//         const {
//           pageY: s
//         } = e[0];
//         const i = s - this.startPoint.pageY;
//         if (i > 0) {
//           this.setRefreshBarHeight(i);
//         }
//       },
//       onTouchEnd(t) {
//         if (!this.startPoint || this.disabled) {
//           return;
//         }
//         const {
//           changedTouches: e
//         } = t;
//         if (1 !== e.length) {
//           return;
//         }
//         const {
//           pageY: s
//         } = e[0];
//         const i = s - this.startPoint.pageY;
//         this.startPoint = null;
//         this.isPulling = false;
//         this.setData({
//           loosing: true
//         });
//         i > this._loadingBarHeight ? (this._trigger("change", {
//           value: true
//         }), this.$emit("refresh")) : this.setData({
//           barHeight: 0
//         });
//       },
//       onDragStart(t) {
//         const {
//           scrollTop: e,
//           scrollLeft: s
//         } = t.detail;
//         this.$emit("dragstart", {
//           detail: {
//             scrollTop: e,
//             scrollLeft: s
//           }
//         });
//       },
//       onDragging(t) {
//         const {
//           scrollTop: e,
//           scrollLeft: s
//         } = t.detail;
//         this.$emit("dragging", {
//           detail: {
//             scrollTop: e,
//             scrollLeft: s
//           }
//         });
//       },
//       onDragEnd(t) {
//         const {
//           scrollTop: e,
//           scrollLeft: s
//         } = t.detail;
//         this.$emit("dragend", {
//           detail: {
//             scrollTop: e,
//             scrollLeft: s
//           }
//         });
//       },
//       doRefresh() {
//         this.disabled || (this.setData({
//           barHeight: this._loadingBarHeight,
//           refreshStatus: 2,
//           loosing: true
//         }), this.maxRefreshAnimateTimeFlag = setTimeout(() => {
//           this.maxRefreshAnimateTimeFlag = null;
//           if (2 === this.refreshStatus) {
//             this.$emit("timeout");
//             this._trigger("change", {
//               value: false
//             });
//           }
//         }, this.refreshTimeout));
//       },
//       setRefreshBarHeight(t) {
//         const e = Math.min(t, this._maxBarHeight);
//         const s = {
//           barHeight: e
//         };
//         e >= this._loadingBarHeight ? s.refreshStatus = 1 : s.refreshStatus = 0;
//         return new Promise(t => {
//           this.setData(s, () => t(e));
//         });
//       },
//       setScrollTop(t) {
//         this.setData({
//           scrollTop: t
//         });
//       },
//       scrollToTop() {
//         this.setScrollTop(0);
//       }
//     };
//   }
// };
// PullDownRefresh = __decorate([wxComponent()], PullDownRefresh);
// export default PullDownRefresh;
</script>
<style scoped>
@import './pull-down-refresh.css';
</style>
