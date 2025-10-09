<template>
  <view
    :style="_._style([style, customStyle])"
    :class="classPrefix + ' class ' + tClass"
  >
    <view
      :id="'id-' + classPrefix + '__bar'"
      :class="classPrefix + '__sidebar ' + tClassSidebar"
      @touchmove.stop.prevent="onTouchMove"
      @touchcancel.stop.prevent="onTouchCancel"
      @touchend.stop.prevent="onTouchEnd"
    >
      <view
        v-for="(item, index) in _indexList"
        :key="index"
        :class="_.cls(classPrefix + '__sidebar-item', [['active', activeAnchor === item]]) + ' ' + tClassSidebarItem"
        :data-index="index"
        @click.stop="onClick(item, index)"
      >
        <view
          aria-role="button"
          :aria-label="activeAnchor === item ? '已选中' + item : ''"
        >
          {{ getFirstCharacter(item) }}
        </view>

        <view
          v-if="showTips && activeAnchor === item"
          :class="classPrefix + '__sidebar-tips'"
        >
          {{ activeAnchor }}
        </view>
      </view>
    </view>
    <slot />
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import tCell from '../cell/cell';
import tCellGroup from '../cell-group/cell-group';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { getRect, throttle, systemInfo } from '../common/utils';
import pageScrollMixin from '../mixins/page-scroll';
import _ from '../common/utils.wxs';
import { getFirstCharacter } from './computed.js';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-indexes`;


export default uniComponent({
  name,
  controlledProps: [
    {
      key: 'current',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-sidebar`,
    `${prefix}-class-sidebar-item`,
  ],
  mixins: [
    pageScrollMixin(),
    ParentMixin(RELATION_MAP.IndexesAnchor),
  ],
  components: {
    tIcon,
    tCell,
    tCellGroup,
  },
  props: {
    ...props,
  },
  emits: [
    'change',
    'select',
  ],
  data() {
    return {
      prefix,
      classPrefix: name,
      _height: 0,
      _indexList: [],
      scrollTop: 0,
      activeAnchor: this.current,
      showTips: false,

      _,

      timer: null,
      groupTop: [],
      sidebar: null,
      currentTouchAnchor: null,

      // dataCurrent: this.current,
    };
  },
  watch: {
    indexList: {
      handler(v) {
        this.setIndexList(v);
        this.setHeight(this._height);
      },
      immediate: true,
    },
    height(v) {
      this.setHeight(v);
    },

    current(val) {
      this.activeAnchor = val;
    },
    activeAnchor(e) {
      if (e && this.activeAnchor && e !== this.activeAnchor) {
        this.setAnchorByCurrent(e, 'update');
      }
    },
  },
  mounted() {
    this.timer = null;
    this.groupTop = [];
    this.sidebar = null;
    if (this._height === 0) {
      this.setHeight();
    }
    if (this.indexList === null) {
      this.setIndexList();
    }
  },
  methods: {
    getFirstCharacter,
    setHeight(height) {
      if (!height) {
        const { windowHeight } = systemInfo;
        height = windowHeight;
      }
      this._height = height;

      setTimeout(() => {
        this.getAllRect();
      });
    },

    setIndexList(list) {
      if (!list) {
        const start = 'A'.charCodeAt(0);
        const alphabet = [];

        for (let i = start, end = start + 26; i < end; i += 1) {
          alphabet.push(String.fromCharCode(i));
        }

        this._indexList = alphabet;
      } else {
        this._indexList = list;
      }
    },

    getAllRect() {
      this.getAnchorsRect().then(() => {
        this.groupTop.forEach((item, index) => {
          const next = this.groupTop[index + 1];
          item.totalHeight = (next?.top || Infinity) - item.top;
        });

        const current = this.activeAnchor || this._indexList[0];
        this.setAnchorByCurrent(current, 'init');
      });
      this.getSidebarRect();
    },

    getAnchorsRect() {
      return Promise.all(this.children.map(child => getRect(child, `.${name}-anchor`).then((rect) => {
        this.groupTop.push({
          height: rect.height,
          top: rect.top,
          anchor: child.index,
        });
      })));
    },

    getSidebarRect() {
      getRect(this, `#id-${name}__bar`).then((rect) => {
        const { top, height } = rect;
        const { length } = this._indexList;

        this.sidebar = {
          top,
          height,
          itemHeight: (height - (length - 1) * 2) / length, // margin = 2px
        };
      });
    },

    toggleTips(flag) {
      if (!flag) {
        clearInterval(this.timer);
        this.timer = setTimeout(() => {
          this.showTips = false;
        }, 300);
      } else {
        this.showTips = true;
      }
    },

    setAnchorByCurrent(current, source) {
      const { stickyOffset } = this;

      if (this.activeAnchor !== null && this.activeAnchor === current) return;

      const target = this.groupTop.find(item => item.anchor === current);

      // 与当前小程序逻辑不同
      this.activeAnchor = current;
      if (target) {
        const scrollTop = target.top - stickyOffset;

        // if (scrollTop === 0 && source === 'init') {
        // 与当前小程序逻辑不同
        this.setAnchorOnScroll(scrollTop);
        // } else {
        wx.pageScrollTo({
          scrollTop,
          duration: 0,
        });
        // }

        if (['click', 'touch'].includes(source)) {
          this.toggleTips(true);
          this.$emit('select', { index: current });
        }
      }
    },

    onClick(current) {
      this.setAnchorByCurrent(current, 'click');
    },

    onTouchMove(e) {
      this.onAnchorTouch(e);
    },

    onTouchCancel() {
      this.toggleTips(false);
    },

    onTouchEnd(e) {
      this.toggleTips(false);
      this.onAnchorTouch(e);
    },

    onAnchorTouch: throttle(function (e) {
      const getAnchorIndex = (clientY) => {
        const offsetY = clientY - this.sidebar.top;
        const max = this._indexList.length - 1;

        if (offsetY <= 0) {
          return 0;
        }

        if (offsetY > this.sidebar.height) {
          return max;
        }

        return Math.min(max, Math.floor(offsetY / this.sidebar.itemHeight));
      };
      const index = getAnchorIndex(e.changedTouches[0].clientY);

      this.setAnchorByCurrent(this._indexList[index], 'touch');
    }, 1000 / 30), // 30 frame

    setAnchorOnScroll(scrollTop) {
      if (!this.groupTop) {
        return;
      }

      const { sticky, stickyOffset } = this;

      scrollTop += stickyOffset;

      const curIndex = this.groupTop.findIndex(group => scrollTop >= group.top - group.height && scrollTop <= group.top + group.totalHeight - group.height);

      if (curIndex === -1) return;

      const curGroup = this.groupTop[curIndex];

      this.activeAnchor = curGroup.anchor;
      setTimeout(() => {
        this._trigger('change', { index: curGroup.anchor, current: curGroup.anchor });
      });

      if (sticky) {
        const offset = curGroup.top - scrollTop;
        const betwixt = offset < curGroup.height && offset > 0 && scrollTop > stickyOffset;

        this.children.forEach((child, index) => {
          if (index === curIndex) {
            const sticky = scrollTop > stickyOffset;
            const anchorStyle = `transform: translate3d(0, ${betwixt ? offset : 0}px, 0); top: ${stickyOffset}px`;
            if (anchorStyle !== child.anchorStyle || sticky !== child.sticky) {
              child.sticky = sticky;
              child.active = true;
              child.dataStyle = `height: ${curGroup.height}px`;
              child.anchorStyle = anchorStyle;
            }
          } else if (index + 1 === curIndex) {
            // 两个 anchor 同时出现时的上一个
            const anchorStyle = `transform: translate3d(0, ${
              betwixt ? offset - curGroup.height : 0
            }px, 0); top: ${stickyOffset}px`;
            if (anchorStyle !== child.anchorStyle) {
              child.sticky = true;
              child.active = true;
              child.dataStyle = `height: ${curGroup.height}px`;
              child.anchorStyle = anchorStyle;
            }
          } else {
            child.active = false;
            child.sticky = false;
            child.dataStyle = '';
            child.anchorStyle = '';
          }
        });
      }
    },

    onScroll({ scrollTop }) {
      this.setAnchorOnScroll(scrollTop);
    },
  },
});

// let Indexes = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-sidebar`, `${prefix}-class-sidebar-item`];
//     this.properties = props;
//     this.setData({
//       prefix,
//       classPrefix: name,
//       _height: 0,
//       _indexList: [],
//       scrollTop: 0,
//       activeAnchor: null,
//       showTips: false,
//     });
//     this.relations = {
//       '../indexes-anchor/indexes-anchor': {
//         type: 'child',
//       },
//     };
//     this.behaviors = [pageScrollMixin()];
//     this.timer = null;
//     this.groupTop = [];
//     this.sidebar = null;
//     this.currentTouchAnchor = null;
//     this.observers = {
//       indexList(t) {
//         this.setIndexList(t);
//         this.setHeight(this._height);
//       },
//       height(t) {
//         this.setHeight(t);
//       },
//     };
//     this.lifetimes = {
//       ready() {
//         this.timer = null;
//         this.groupTop = [];
//         this.sidebar = null;
//         if (0 === this._height) {
//           this.setHeight();
//         }
//         if (null === this.indexList) {
//           this.setIndexList();
//         }
//       },
//     };
//     this.methods = {
//       setHeight(t) {
//         if (!t) {
//           const {
//             windowHeight: e,
//           } = systemInfo;
//           t = e;
//         }
//         this.setData({
//           _height: t,
//         }, () => {
//           this.getAllRect();
//         });
//       },
//       setIndexList(t) {
//         if (t) {
//           this.setData({
//             _indexList: t,
//           });
//         } else {
//           const t = 'A'.charCodeAt(0);
//           const e = [];
//           for (let i = t, s = t + 26; i < s; i += 1) {
//             e.push(String.fromCharCode(i));
//           }
//           this.setData({
//             _indexList: e,
//           });
//         }
//       },
//       getAllRect() {
//         this.getAnchorsRect().then(() => {
//           this.groupTop.forEach((t, e) => {
//             const i = this.groupTop[e + 1];
//             t.totalHeight = ((null == i ? void 0 : i.top) || 1 / 0) - t.top;
//           });
//           this.setAnchorOnScroll(0);
//         });
//         this.getSidebarRect();
//       },
//       getAnchorsRect() {
//         return Promise.all(this.$children.map(t => getRect(t, `.${name}-anchor`).then((e) => {
//           this.groupTop.push({
//             height: e.height,
//             top: e.top,
//             anchor: t.data.index,
//           });
//         })));
//       },
//       getSidebarRect() {
//         getRect(this, `#id-${name}__bar`).then((t) => {
//           const {
//             top: e,
//             height: i,
//           } = t;
//           const {
//             length: s,
//           } = this._indexList;
//           this.sidebar = {
//             top: e,
//             height: i,
//             itemHeight: (i - 2 * (s - 1)) / s,
//           };
//         });
//       },
//       toggleTips(t) {
//         t ? this.setData({
//           showTips: true,
//         }) : (clearInterval(this.timer), this.timer = setTimeout(() => {
//           this.setData({
//             showTips: false,
//           });
//         }, 300));
//       },
//       setAnchorByIndex(t) {
//         const {
//           _indexList: e,
//           stickyOffset: i,
//         } = this;
//         const s = e[t];
//         if (null !== this.activeAnchor && this.activeAnchor === s) {
//           return;
//         }
//         const o = this.groupTop.find(t => t.anchor === s);
//         if (o) {
//           this.currentTouchAnchor = s;
//           const t = o.top - i;
//           uni.pageScrollTo({
//             scrollTop: t,
//             duration: 0,
//           });
//           this.toggleTips(true);
//           this.$emit('select', {
//             detail: {
//               index: s,
//             },
//           });
//           this.setData({
//             activeAnchor: s,
//           });
//         }
//       },
//       onClick(t) {
//         const {
//           index: e,
//         } = t.currentTarget.dataset;
//         this.setAnchorByIndex(e);
//       },
//       onTouchMove(t) {
//         this.onAnchorTouch(t);
//       },
//       onTouchCancel() {
//         this.toggleTips(false);
//       },
//       onTouchEnd(t) {
//         this.toggleTips(false);
//         this.onAnchorTouch(t);
//       },
//       onAnchorTouch: throttle(function (t) {
//         const e = ((t) => {
//           const e = t - this.sidebar.top;
//           return e <= 0 ? 0 : e > this.sidebar.height ? this._indexList.length - 1 : Math.floor(e / this.sidebar.itemHeight);
//         })(t.changedTouches[0].clientY);
//         this.setAnchorByIndex(e);
//       }, 33.333333333333336),
//       setAnchorOnScroll(t) {
//         if (!this.groupTop) {
//           return;
//         }
//         const {
//           sticky: e,
//           stickyOffset: i,
//           activeAnchor: s,
//         } = this;
//         t += i;
//         const o = this.groupTop.findIndex(e => t >= e.top - e.height && t <= e.top + e.totalHeight - e.height);
//         if (-1 === o) {
//           return;
//         }
//         const h = this.groupTop[o];
//         null !== this.currentTouchAnchor ? (this.$emit('change', {
//           detail: {
//             index: h.anchor,
//           },
//         }), this.currentTouchAnchor = null) : s !== h.anchor && (this.$emit('change', {
//           detail: {
//             index: h.anchor,
//           },
//         }), this.setData({
//           activeAnchor: h.anchor,
//         }));
//         if (e) {
//           const e = h.top - t;
//           const s = e < h.height && e > 0 && t > i;
//           this.$children.forEach((n, r) => {
//             if (r === o) {
//               const o = t > i;
//               const r = `transform: translate3d(0, ${s ? e : 0}px, 0); top: ${i}px`;
//               r === n.data.anchorStyle && o === n.data.sticky || n.setData({
//                 sticky: o,
//                 active: true,
//                 style: `height: ${h.height}px`,
//                 anchorStyle: r,
//               });
//             } else if (r + 1 === o) {
//               const t = `transform: translate3d(0, ${s ? e - h.height : 0}px, 0); top: ${i}px`;
//               if (t !== n.data.anchorStyle) {
//                 n.setData({
//                   sticky: true,
//                   active: true,
//                   style: `height: ${h.height}px`,
//                   anchorStyle: t,
//                 });
//               }
//             } else {
//               n.setData({
//                 active: false,
//                 sticky: false,
//                 anchorStyle: '',
//               });
//             }
//           });
//         }
//       },
//       onScroll({
//         scrollTop: t,
//       }) {
//         this.setAnchorOnScroll(t);
//       },
//     };
//   }
// };
// Indexes = __decorate([wxComponent()], Indexes);
// export default Indexes;
</script>
<style>
@import './indexes.css';
</style>
