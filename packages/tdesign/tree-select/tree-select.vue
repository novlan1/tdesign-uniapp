<template>
    <view :class="classPrefix + ' class'" :style="_._style(['height:' + _.addUnit(height), style, customStyle])">
        <t-scroll-view
            :class="_.cls(classPrefix + '__column', [_this.getTreeClass(leafLevel - level, treeOptions.length)]) + ' ' + prefix + '-class'"
            :scrollIntoView="scrollIntoView && scrollIntoView[level] ? '.scroll-into-view >>> #scroll-to-' + scrollIntoView[level] : ''"
            v-for="(item, level) in treeOptions"
            :key="level"
        >
            <t-side-bar v-if="level == 0" :value="innerValue[level]" @change="onRootChange" :t-class="classPrefix + '-column ' + prefix + '-class-left-column'">
                <t-side-bar-item
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                    :tId="'scroll-to-' + item.value"
                    class="scroll-into-view"
                    :t-class="prefix + '-class-left-item'"
                    v-for="(item, index) in treeOptions[level]"
                    :key="index"
                ></t-side-bar-item>
            </t-side-bar>

            <block v-else-if="level != leafLevel">
                <view
                    @tap="handleTreeClick"
                    :data-level="level"
                    :data-value="item.value"
                    :class="
                        _.cls(classPrefix + '__item', [
                            ['active', item.value === innerValue[level]],
                            ['disabled', item.disabled]
                        ]) +
                        ' ' +
                        prefix +
                        '-class-middle-item scroll-into-view'
                    "
                    v-for="(item, index) in treeOptions[level]"
                    :key="index"
                >
                    <view :id="'scroll-to-' + item.value">{{ item.label }}</view>
                </view>
            </block>

            <t-radio-group
                v-else-if="!multiple"
                :class="classPrefix + '__radio ' + prefix + '-class-right-column'"
                :data-level="level"
                data-type="single"
                :value="innerValue[level]"
                @change="handleChange($event, { level, type: 'single' })"
            >
                <t-radio
                    :tId="'scroll-to-' + item.value"
                    :class="'scroll-into-view ' + classPrefix + '__radio-item ' + prefix + '-class-right-item'"
                    :t-class-label="prefix + '-class-right-item-label'"
                    icon="line"
                    :value="item.value"
                    :disabled="item.disabled"
                    :maxLabelRow="1"
                    borderless
                    placement="right"
                    v-for="(item, index) in treeOptions[level]"
                    :key="index"
                >
                    {{ item.label }}
                </t-radio>
            </t-radio-group>

            <t-checkbox-group
                v-else
                :class="classPrefix + '__checkbox ' + prefix + '-class-right-column'"
                :value="innerValue[level] || []"
                :data-level="level"
                data-type="multiple"
                @change="handleChange($event, { level, type: 'multiple' })"
            >
                <t-checkbox
                    :tId="'scroll-to-' + item.value"
                    :class="'scroll-into-view ' + prefix + '-class-right-item'"
                    :t-class-label="prefix + '-class-right-item-label'"
                    placement="right"
                    icon="line"
                    :maxLabelRow="1"
                    :value="item.value"
                    :disabled="item.disabled"
                    borderless
                    v-for="(item, index) in treeOptions[level]"
                    :key="index"
                >
                    {{ item.label }}
                </t-checkbox>
            </t-checkbox-group>
        </t-scroll-view>
        <slot name="content" />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/tree-select/index.wxs"></script>
<script>
import tRadio from "../radio/radio";
import tRadioGroup from "../radio-group/radio-group";
import tCheckbox from "../checkbox/checkbox";
import tCheckboxGroup from "../checkbox-group/checkbox-group";
import tSideBar from "../side-bar/side-bar";
import tSideBarItem from "../side-bar-item/side-bar-item";
import tScrollView from "../scroll-view/scroll-view";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import { isDef } from "../common/validator";
import config from "../common/config";
import { getTreeDepth } from "../common/utils";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-tree-select`;
let TreeSelect = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-left-column`, `${prefix}-class-left-item`, `${prefix}-class-middle-item`, `${prefix}-class-right-column`, `${prefix}-class-right-item`, `${prefix}-class-right-item-label`];
    this.options = {
      multipleSlots: true
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      scrollIntoView: null
    });
    this = props;
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.observers = {
      "value, customValue, options, keys, multiple"() {
        this.buildTreeOptions();
      }
    };
    this.lifetimes = {
      ready() {
        this.getScrollIntoView("init");
      }
    };
    this.methods = {
      buildTreeOptions() {
        var e;
        var l;
        const {
          options: t,
          value: i,
          customValue: o,
          multiple: n,
          keys: s
        } = this;
        if (!t.length) {
          return;
        }
        const r = [];
        let a = -1;
        let c = {
          children: t
        };
        for (; null == c ? void 0 : c.children;) {
          a += 1;
          const t = c.children.map(e => ({
            label: e[(null == s ? void 0 : s.label) || "label"],
            value: e[(null == s ? void 0 : s.value) || "value"],
            disabled: e[(null == s ? void 0 : s.disabled) || "disabled"],
            children: e[(null == s ? void 0 : s.children) || "children"]
          }));
          r.push(t);
          const n = null !== (e = null == o ? void 0 : o[a]) && void 0 !== e ? e : null == i ? void 0 : i[a];
          c = n && null !== (l = t.find(e => e.value === n)) && void 0 !== l ? l : t[0];
        }
        const u = getTreeDepth(t, null == s ? void 0 : s.children);
        for (; r.length < u;) {
          r.push([]);
          a += 1;
        }
        const d = Math.max(0, a);
        const p = o || r.map((e, l) => {
          var t;
          var o;
          var s;
          const a = l === r.length - 1 && n ? [null === (t = e[0]) || void 0 === t ? void 0 : t.value] : null === (o = e[0]) || void 0 === o ? void 0 : o.value;
          return null !== (s = null == i ? void 0 : i[l]) && void 0 !== s ? s : a;
        });
        this.setData({
          innerValue: p,
          leafLevel: d,
          treeOptions: r
        });
      },
      getScrollIntoView(e) {
        const {
          value: l,
          customValue: t,
          scrollIntoView: i
        } = this;
        if ("init" === e) {
          const e = t || l;
          const i = Array.isArray(e) ? e.map(e => Array.isArray(e) ? e[0] : e) : [e];
          this.setData({
            scrollIntoView: i
          });
        } else {
          if (null === i) {
            return;
          }
          this.setData({
            scrollIntoView: null
          });
        }
      },
      onRootChange(e) {
        const {
          innerValue: l
        } = this;
        const {
          value: t
        } = e.detail;
        this.getScrollIntoView("none");
        l[0] = t;
        this._trigger("change", {
          value: l,
          level: 0
        });
      },
      handleTreeClick(e) {
        const {
          level: l,
          value: t
        } = e.currentTarget.dataset;
        const {
          innerValue: i
        } = this;
        i[l] = t;
        this.getScrollIntoView("none");
        this._trigger("change", {
          value: i,
          level: 1
        });
      },
      handleChange(e) {
        const {
          innerValue: l
        } = this;
        const {
          level: t,
          type: i
        } = e.target.dataset;
        const {
          value: o
        } = "multiple" === i ? e.detail.context : e.detail;
        if ("multiple" === i) {
          isDef(l[t]) || (l[t] = []);
          const e = l[t].indexOf(o);
          -1 === e ? l[t].push(o) : l[t].splice(e, 1);
        } else {
          l[t] = o;
        }
        this.getScrollIntoView("none");
        this._trigger("change", {
          value: l,
          level: t
        });
      }
    };
  }
};
TreeSelect = __decorate([wxComponent()], TreeSelect);
export default TreeSelect;
</script>
<style>
@import './tree-select.css';
</style>
