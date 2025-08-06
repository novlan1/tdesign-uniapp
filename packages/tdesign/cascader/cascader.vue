<template>
    <view>
        <t-popup class="class" :visible="visible" placement="bottom" @visible-change="onVisibleChange">
            <view :style="_._style([style, customStyle])" :class="name">
                <view :class="name + '__title'">
                    <slot name="title" />
                    {{ title }}
                </view>
                <view :class="name + '__close-btn'" @tap="onClose">
                    <slot name="close-btn" />
                    <t-icon v-if="closeBtn" size="48rpx" name="close" />
                </view>
                <slot name="header" />
                <view :class="name + '__content'">
                    <block v-if="steps && steps.length">
                        <view v-if="theme == 'step'" :class="name + '__steps'">
                            <view :class="name + '__step'" @tap="onStepClick" :data-index="index" v-for="(item, index) in steps" :key="index">
                                <view
                                    :class="
                                        name +
                                        '__step-dot ' +
                                        name +
                                        '__step-dot--' +
                                        (item !== placeholder ? 'active' : '') +
                                        ' ' +
                                        name +
                                        '__step-dot--' +
                                        (index === steps.length - 1 ? 'last' : '')
                                    "
                                ></view>

                                <view :class="name + '__step-label ' + name + '__step-label--' + (index === stepIndex ? 'active' : '')">{{ item }}</view>

                                <t-icon name="chevron-right" size="44rpx" :t-class="name + '__step-arrow'" />
                            </view>
                        </view>
                        <block v-if="theme == 'tab'">
                            <t-tabs id="tabs" :value="stepIndex" @change="onTabChange($event, { tagId: 'tabs' })" :space-evenly="false">
                                <t-tab-panel :value="index" :label="item" v-for="(item, index) in steps" :key="index"></t-tab-panel>
                            </t-tabs>
                        </block>
                    </block>
                    <view v-if="subTitles && subTitles[stepIndex]" :class="name + '__options-title'">{{ subTitles[stepIndex] }}</view>
                    <view :class="name + '__options-container'" :style="'width: ' + (items.length + 1) + '00vw; transform: translateX(-' + stepIndex + '00vw)'">
                        <scroll-view
                            :class="name + '__options'"
                            scroll-y
                            :scroll-top="scrollTopList[index]"
                            type="list"
                            :style="'height: ' + _optionsHeight + 'px'"
                            v-for="(options, index) in items"
                            :key="index"
                        >
                            <view :class="'cascader-radio-group-' + index">
                                <t-radio-group
                                    :value="selectedValue[index]"
                                    :keys="keys"
                                    :options="options"
                                    @change="handleSelect($event, { level: index })"
                                    :data-level="index"
                                    placement="right"
                                    icon="line"
                                    borderless
                                ></t-radio-group>
                            </view>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </t-popup>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tPopup from "../popup/popup";
import tTabs from "../tabs/tabs";
import tTabPanel from "../tab-panel/tab-panel";
import tRadioGroup from "../radio-group/radio-group";
import { __awaiter, __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getRect } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-cascader`;
function parseOptions(e, t) {
  var s;
  var i;
  const l = null !== (s = null == t ? void 0 : t.label) && void 0 !== s ? s : "label";
  const n = null !== (i = null == t ? void 0 : t.value) && void 0 !== i ? i : "value";
  return e.map(e => ({
    [l]: e[l],
    [n]: e[n]
  }));
}
const defaultState = {
  contentHeight: 0,
  stepHeight: 0,
  tabsHeight: 0,
  subTitlesHeight: 0,
  stepsInitHeight: 0
};
let Cascader = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.options = {
      multipleSlots: true,
      pureDataPattern: /^options$/
    };
    this = props;
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.state = Object.assign({}, defaultState);
    this.setData({
      prefix: prefix,
      name: name,
      stepIndex: 0,
      selectedIndexes: [],
      selectedValue: [],
      scrollTopList: [],
      steps: [],
      _optionsHeight: 0
    });
    this.observers = {
      visible(e) {
        if (e) {
          const e = this.zpSelectComponent("#tabs");
          null == e || e.setTrack();
          null == e || e.getTabHeight().then(e => {
            this.state.tabsHeight = e.height;
          });
          this.initOptionsHeight(this.steps.length);
          this.updateScrollTop();
          this.initWithValue();
        } else {
          this.state = Object.assign({}, defaultState);
        }
      },
      value() {
        this.initWithValue();
      },
      options() {
        const {
          selectedValue: e,
          steps: t,
          items: s
        } = this.genItems();
        this.setData({
          steps: t,
          items: s,
          selectedValue: e,
          stepIndex: s.length - 1
        });
      },
      selectedIndexes() {
        const {
          visible: e,
          theme: t
        } = this;
        const {
          selectedValue: s,
          steps: i,
          items: l
        } = this.genItems();
        const n = {
          steps: i,
          selectedValue: s,
          stepIndex: l.length - 1
        };
        if (JSON.stringify(l) !== JSON.stringify(this.items)) {
          Object.assign(n, {
            items: l
          });
        }
        this.setData(n);
        if (e && "step" === t) {
          this.updateOptionsHeight(i.length);
        }
      },
      stepIndex() {
        return __awaiter(this, void 0, void 0, function* () {
          const {
            visible: e
          } = this;
          if (e) {
            this.updateScrollTop();
          }
        });
      }
    };
    this.methods = {
      updateOptionsHeight(e) {
        const {
          contentHeight: t,
          stepsInitHeight: s,
          stepHeight: i,
          subTitlesHeight: l
        } = this.state;
        this.setData({
          _optionsHeight: t - s - l - (e - 1) * i
        });
      },
      initOptionsHeight(e) {
        return __awaiter(this, void 0, void 0, function* () {
          const {
            theme: t,
            subTitles: s
          } = this;
          const {
            height: i
          } = yield getRect(this, `.${name}__content`);
          this.state.contentHeight = i;
          if ("step" === t) {
            yield Promise.all([getRect(this, `.${name}__steps`), getRect(this, `.${name}__step`)]).then(([t, s]) => {
              this.state.stepsInitHeight = t.height - (e - 1) * s.height;
              this.state.stepHeight = s.height;
            });
          }
          if (s.length > 0) {
            const {
              height: e
            } = yield getRect(this, `.${name}__options-title`);
            this.state.subTitlesHeight = e;
          }
          const l = this.state.contentHeight - this.state.subTitlesHeight;
          this.setData({
            _optionsHeight: "step" === t ? l - this.state.stepsInitHeight - (e - 1) * this.state.stepHeight : l - this.state.tabsHeight
          });
        });
      },
      initWithValue() {
        if (null != this.value && "" !== this.value) {
          const e = this.getIndexesByValue(this.options, this.value);
          if (e) {
            this.setData({
              selectedIndexes: e
            });
          }
        } else {
          this.setData({
            selectedIndexes: []
          });
        }
      },
      getIndexesByValue(e, t) {
        var s;
        var i;
        var l;
        const {
          keys: n
        } = this;
        for (let a = 0, h = e.length; a < h; a += 1) {
          const h = e[a];
          if (h[null !== (s = null == n ? void 0 : n.value) && void 0 !== s ? s : "value"] === t) {
            return [a];
          }
          if (h[null !== (i = null == n ? void 0 : n.children) && void 0 !== i ? i : "children"]) {
            const e = this.getIndexesByValue(h[null !== (l = null == n ? void 0 : n.children) && void 0 !== l ? l : "children"], t);
            if (e) {
              return [a, ...e];
            }
          }
        }
      },
      updateScrollTop() {
        const {
          visible: e,
          items: t,
          selectedIndexes: s,
          stepIndex: i
        } = this;
        if (e) {
          getRect(this, ".cascader-radio-group-0").then(e => {
            var l;
            const n = e.height / (null === (l = t[0]) || void 0 === l ? void 0 : l.length);
            this.setData({
              [`scrollTopList[${i}]`]: n * s[i]
            });
          });
        }
      },
      hide(e) {
        this.setData({
          visible: false
        });
        this.$emit("close", {
          detail: {
            trigger: e
          }
        });
      },
      onVisibleChange() {
        this.hide("overlay");
      },
      onClose() {
        if (this.checkStrictly) {
          this.triggerChange();
        }
        this.hide("close-btn");
      },
      onStepClick(e) {
        const {
          index: t
        } = e.currentTarget.dataset;
        this.setData({
          stepIndex: t
        });
      },
      onTabChange(e) {
        const {
          value: t
        } = e.detail;
        this.setData({
          stepIndex: t
        });
      },
      genItems() {
        var e;
        var t;
        var s;
        var i;
        var l;
        const {
          options: n,
          selectedIndexes: a,
          keys: h,
          placeholder: o
        } = this;
        const d = [];
        const r = [];
        const c = [parseOptions(n, h)];
        if (n.length > 0) {
          let o = n;
          for (let n = 0, u = a.length; n < u; n += 1) {
            const u = o[a[n]];
            o = u[null !== (e = null == h ? void 0 : h.children) && void 0 !== e ? e : "children"];
            d.push(u[null !== (t = null == h ? void 0 : h.value) && void 0 !== t ? t : "value"]);
            r.push(u[null !== (s = null == h ? void 0 : h.label) && void 0 !== s ? s : "label"]);
            if (u[null !== (i = null == h ? void 0 : h.children) && void 0 !== i ? i : "children"]) {
              c.push(parseOptions(u[null !== (l = null == h ? void 0 : h.children) && void 0 !== l ? l : "children"], h));
            }
          }
        }
        if (r.length < c.length) {
          r.push(o);
        }
        return {
          selectedValue: d,
          steps: r,
          items: c
        };
      },
      handleSelect(e) {
        var t;
        var s;
        var i;
        var l;
        var n;
        const {
          level: a
        } = e.target.dataset;
        const {
          value: h
        } = e.detail;
        const {
          checkStrictly: o
        } = this;
        const {
          selectedIndexes: d,
          items: r,
          keys: c,
          options: u,
          selectedValue: p
        } = this;
        const g = r[a].findIndex(e => {
          var t;
          return e[null !== (t = null == c ? void 0 : c.value) && void 0 !== t ? t : "value"] === h;
        });
        let v = d.slice(0, a).reduce((e, t, s) => {
          var i;
          return 0 === s ? e[t] : e[null !== (i = null == c ? void 0 : c.children) && void 0 !== i ? i : "children"][t];
        }, u);
        v = 0 === a ? v[g] : v[null !== (t = null == c ? void 0 : c.children) && void 0 !== t ? t : "children"][g];
        if (v.disabled) {
          return;
        }
        this.$emit("pick", {
          detail: {
            value: v[null !== (s = null == c ? void 0 : c.value) && void 0 !== s ? s : "value"],
            label: v[null !== (i = null == c ? void 0 : c.label) && void 0 !== i ? i : "label"],
            index: g,
            level: a
          }
        });
        d[a] = g;
        if (o && p.includes(String(h))) {
          d.length = a;
          return void this.setData({
            selectedIndexes: d
          });
        }
        d.length = a + 1;
        const {
          items: m
        } = this.genItems();
        (null === (n = null == v ? void 0 : v[null !== (l = null == c ? void 0 : c.children) && void 0 !== l ? l : "children"]) || void 0 === n ? void 0 : n.length) >= 0 ? this.setData({
          selectedIndexes: d,
          [`items[${a + 1}]`]: m[a + 1]
        }) : (this.setData({
          selectedIndexes: d
        }, this.triggerChange), this.hide("finish"));
      },
      triggerChange() {
        var e;
        const {
          items: t,
          selectedValue: s,
          selectedIndexes: i
        } = this;
        this._trigger("change", {
          value: null !== (e = s[s.length - 1]) && void 0 !== e ? e : "",
          selectedOptions: t.map((e, t) => e[i[t]]).filter(Boolean)
        });
      }
    };
  }
};
Cascader = __decorate([wxComponent()], Cascader);
export default Cascader;
</script>
<style>
@import './cascader.css';
</style>
