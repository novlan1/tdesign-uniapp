<template>
    <view :style="_._style([style, customStyle])" :class="classPrefix + ' class ' + prefix + '-class'" aria-role="radiogroup">
        <slot />
        <block v-for="(item, index) in radioOptions" :key="index">
            <t-radio
                :class="prefix + '-radio-option'"
                :data-index="index"
                :data-value="item.value"
                :data-allow-uncheck="item.allowUncheck || allowUncheck"
                :block="item.block || true"
                :label="item.label || ''"
                :value="item.value"
                :checked="item.checked || false"
                :content="item.content || ''"
                :allow-uncheck="item.allowUncheck || allowUncheck"
                :content-disabled="item.contentDisabled || false"
                :readonly="item.readonly || false"
                :disabled="item.disabled || false"
                :icon="item.icon || icon"
                :placement="item.placement || placement"
                :max-content-row="item.maxContentRow || 5"
                :max-label-row="item.maxLabelRow || 3"
                :name="item.name || ''"
                :borderless="borderless"
                @change="handleRadioChange($event, { index, value: item.value, allowUncheck: item.allowUncheck || allowUncheck })"
            />
        </block>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tRadio from "../radio/radio";
import { __decorate } from "@/miniprogram_npm/tslib";
import config from "../common/config";
import { SuperComponent, wxComponent } from "../common/src/index";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-radio-group`;
let RadioGroup = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.behaviors = ["wx://form-field"];
    this.externalClasses = [`${prefix}-class`];
    this.setData({
      prefix: prefix,
      classPrefix: name,
      radioOptions: []
    });
    this.relations = {
      "../radio/radio": {
        type: "descendant",
        linked(e) {
          const {
            value: t,
            disabled: i,
            readonly: o
          } = this;
          e.setData({
            checked: t === e.data.value
          });
          e.setDisabled(i);
          e.setReadonly(o);
        }
      }
    };
    this = props;
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.observers = {
      value(e) {
        this.getChildren().forEach(t => {
          t.setData({
            checked: e === t.data.value
          });
        });
      },
      options() {
        this.initWithOptions();
      },
      disabled(e) {
        var t;
        if (null === (t = this.options) || void 0 === t ? void 0 : t.length) {
          this.initWithOptions();
        } else {
          this.getChildren().forEach(t => {
            t.setDisabled(e);
          });
        }
      }
    };
    this.methods = {
      getChildren() {
        let e = this.$children;
        (null == e ? void 0 : e.length) || (e = this.zpSelectAllComponents(`.${prefix}-radio-option`));
        return e;
      },
      updateValue(e) {
        this._trigger("change", {
          value: e
        });
      },
      handleRadioChange(e) {
        const {
          checked: t
        } = e.detail;
        const {
          value: i,
          index: o,
          allowUncheck: a
        } = e.target.dataset;
        this._trigger("change", false === t && a ? {
          value: null,
          index: o
        } : {
          value: i,
          index: o
        });
      },
      initWithOptions() {
        const {
          options: e,
          value: t,
          keys: i,
          disabled: o,
          readonly: a
        } = this;
        if (!(null == e ? void 0 : e.length) || !Array.isArray(e)) {
          return void this.setData({
            radioOptions: []
          });
        }
        const s = [];
        try {
          e.forEach(e => {
            var l;
            var r;
            var n;
            const d = typeof e;
            "number" === d || "string" === d ? s.push({
              label: `${e}`,
              value: e,
              checked: t === e,
              disabled: o,
              readonly: a
            }) : "object" === d && s.push(Object.assign(Object.assign({}, e), {
              label: e[null !== (l = null == i ? void 0 : i.label) && void 0 !== l ? l : "label"],
              value: e[null !== (r = null == i ? void 0 : i.value) && void 0 !== r ? r : "value"],
              checked: t === e[null !== (n = null == i ? void 0 : i.value) && void 0 !== n ? n : "value"],
              disabled: e.disabled || o,
              readonly: e.readonly || a
            }));
          });
          this.setData({
            radioOptions: s
          });
        } catch (e) {
          console.log("CatchClause", e);
          console.log("CatchClause", e);
          console.error("error", e);
        }
      }
    };
  }
};
RadioGroup = __decorate([wxComponent()], RadioGroup);
export default RadioGroup;
</script>
<style>
@import './radio-group.css';
</style>
