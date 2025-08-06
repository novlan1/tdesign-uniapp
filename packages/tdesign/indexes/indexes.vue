<template>
    <view :style="_._style([style, customStyle])" :class="classPrefix + ' class ' + prefix + '-class'">
        <view
            :class="classPrefix + '__sidebar ' + prefix + '-class-sidebar'"
            :id="'id-' + classPrefix + '__bar'"
            @touchmove.stop.prevent="onTouchMove"
            @touchcancel.stop.prevent="onTouchCancel"
            @touchend.stop.prevent="onTouchEnd"
        >
            <view
                :class="_.cls(classPrefix + '__sidebar-item', [['active', activeAnchor === item]]) + ' ' + prefix + '-class-sidebar-item'"
                @tap="onClick"
                :data-index="index"
                v-for="(item, index) in _indexList"
                :key="index"
            >
                <view aria-role="button" :aria-label="activeAnchor === item ? '已选中' + item : ''">{{ _this.getFirstCharacter(item) }}</view>

                <view :class="classPrefix + '__sidebar-tips'" v-if="showTips && activeAnchor === item">{{ activeAnchor }}</view>
            </view>
        </view>
        <slot />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/indexes/indexes.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tCell from "../cell/cell";
import tCellGroup from "../cell-group/cell-group";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getRect, throttle, systemInfo } from "../common/utils";
import pageScrollMixin from "../mixins/page-scroll";
const {
  prefix: prefix
} = config;
const name = `${prefix}-indexes`;
let Indexes = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-sidebar`, `${prefix}-class-sidebar-item`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      _height: 0,
      _indexList: [],
      scrollTop: 0,
      activeAnchor: null,
      showTips: false
    });
    this.relations = {
      "../indexes-anchor/indexes-anchor": {
        type: "child"
      }
    };
    this.behaviors = [pageScrollMixin()];
    this.timer = null;
    this.groupTop = [];
    this.sidebar = null;
    this.currentTouchAnchor = null;
    this.observers = {
      indexList(t) {
        this.setIndexList(t);
        this.setHeight(this._height);
      },
      height(t) {
        this.setHeight(t);
      }
    };
    this.lifetimes = {
      ready() {
        this.timer = null;
        this.groupTop = [];
        this.sidebar = null;
        if (0 === this._height) {
          this.setHeight();
        }
        if (null === this.indexList) {
          this.setIndexList();
        }
      }
    };
    this.methods = {
      setHeight(t) {
        if (!t) {
          const {
            windowHeight: e
          } = systemInfo;
          t = e;
        }
        this.setData({
          _height: t
        }, () => {
          this.getAllRect();
        });
      },
      setIndexList(t) {
        if (t) {
          this.setData({
            _indexList: t
          });
        } else {
          const t = "A".charCodeAt(0);
          const e = [];
          for (let i = t, s = t + 26; i < s; i += 1) {
            e.push(String.fromCharCode(i));
          }
          this.setData({
            _indexList: e
          });
        }
      },
      getAllRect() {
        this.getAnchorsRect().then(() => {
          this.groupTop.forEach((t, e) => {
            const i = this.groupTop[e + 1];
            t.totalHeight = ((null == i ? void 0 : i.top) || 1 / 0) - t.top;
          });
          this.setAnchorOnScroll(0);
        });
        this.getSidebarRect();
      },
      getAnchorsRect() {
        return Promise.all(this.$children.map(t => getRect(t, `.${name}-anchor`).then(e => {
          this.groupTop.push({
            height: e.height,
            top: e.top,
            anchor: t.data.index
          });
        })));
      },
      getSidebarRect() {
        getRect(this, `#id-${name}__bar`).then(t => {
          const {
            top: e,
            height: i
          } = t;
          const {
            length: s
          } = this._indexList;
          this.sidebar = {
            top: e,
            height: i,
            itemHeight: (i - 2 * (s - 1)) / s
          };
        });
      },
      toggleTips(t) {
        t ? this.setData({
          showTips: true
        }) : (clearInterval(this.timer), this.timer = setTimeout(() => {
          this.setData({
            showTips: false
          });
        }, 300));
      },
      setAnchorByIndex(t) {
        const {
          _indexList: e,
          stickyOffset: i
        } = this;
        const s = e[t];
        if (null !== this.activeAnchor && this.activeAnchor === s) {
          return;
        }
        const o = this.groupTop.find(t => t.anchor === s);
        if (o) {
          this.currentTouchAnchor = s;
          const t = o.top - i;
          uni.pageScrollTo({
            scrollTop: t,
            duration: 0
          });
          this.toggleTips(true);
          this.$emit("select", {
            detail: {
              index: s
            }
          });
          this.setData({
            activeAnchor: s
          });
        }
      },
      onClick(t) {
        const {
          index: e
        } = t.currentTarget.dataset;
        this.setAnchorByIndex(e);
      },
      onTouchMove(t) {
        this.onAnchorTouch(t);
      },
      onTouchCancel() {
        this.toggleTips(false);
      },
      onTouchEnd(t) {
        this.toggleTips(false);
        this.onAnchorTouch(t);
      },
      onAnchorTouch: throttle(function (t) {
        const e = (t => {
          const e = t - this.sidebar.top;
          return e <= 0 ? 0 : e > this.sidebar.height ? this._indexList.length - 1 : Math.floor(e / this.sidebar.itemHeight);
        })(t.changedTouches[0].clientY);
        this.setAnchorByIndex(e);
      }, 33.333333333333336),
      setAnchorOnScroll(t) {
        if (!this.groupTop) {
          return;
        }
        const {
          sticky: e,
          stickyOffset: i,
          activeAnchor: s
        } = this;
        t += i;
        const o = this.groupTop.findIndex(e => t >= e.top - e.height && t <= e.top + e.totalHeight - e.height);
        if (-1 === o) {
          return;
        }
        const h = this.groupTop[o];
        null !== this.currentTouchAnchor ? (this.$emit("change", {
          detail: {
            index: h.anchor
          }
        }), this.currentTouchAnchor = null) : s !== h.anchor && (this.$emit("change", {
          detail: {
            index: h.anchor
          }
        }), this.setData({
          activeAnchor: h.anchor
        }));
        if (e) {
          const e = h.top - t;
          const s = e < h.height && e > 0 && t > i;
          this.$children.forEach((n, r) => {
            if (r === o) {
              const o = t > i;
              const r = `transform: translate3d(0, ${s ? e : 0}px, 0); top: ${i}px`;
              r === n.data.anchorStyle && o === n.data.sticky || n.setData({
                sticky: o,
                active: true,
                style: `height: ${h.height}px`,
                anchorStyle: r
              });
            } else if (r + 1 === o) {
              const t = `transform: translate3d(0, ${s ? e - h.height : 0}px, 0); top: ${i}px`;
              if (t !== n.data.anchorStyle) {
                n.setData({
                  sticky: true,
                  active: true,
                  style: `height: ${h.height}px`,
                  anchorStyle: t
                });
              }
            } else {
              n.setData({
                active: false,
                sticky: false,
                anchorStyle: ""
              });
            }
          });
        }
      },
      onScroll({
        scrollTop: t
      }) {
        this.setAnchorOnScroll(t);
      }
    };
  }
};
Indexes = __decorate([wxComponent()], Indexes);
export default Indexes;
</script>
<style>
@import './indexes.css';
</style>
