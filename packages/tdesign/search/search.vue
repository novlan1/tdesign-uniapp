<template>
    <view>
        <view :style="_._style([style, customStyle])" :class="'class ' + classPrefix + ' ' + prefix + '-class'">
            <view
                :class="
                    classPrefix +
                    '__input-box ' +
                    prefix +
                    '-' +
                    (focus ? 'is-focused' : 'not-focused') +
                    ' ' +
                    classPrefix +
                    '__input-box--' +
                    (center ? 'center' : '') +
                    ' ' +
                    classPrefix +
                    '__input-box--' +
                    shape +
                    ' ' +
                    prefix +
                    '-class-input-container'
                "
            >
                <t-icon v-if="leftIcon" :name="leftIcon" :class="prefix + '-icon ' + prefix + '-class-left'" :aria-hidden="true" />
                <slot v-else name="left-icon" />
                <input
                    :type="type"
                    name="input"
                    :maxlength="maxlength"
                    :disabled="disabled || readonly"
                    :class="prefix + '-input__keyword ' + prefix + '-class-input ' + (disabled ? prefix + '-input--disabled' : '')"
                    :focus="focus"
                    :value="value"
                    :confirm-type="confirmType"
                    :confirm-hold="confirmHold"
                    :cursor="cursor"
                    :adjust-position="adjustPosition"
                    :always-embed="alwaysEmbed"
                    :selection-start="selectionStart"
                    :selection-end="selectionEnd"
                    :hold-keyboard="holdKeyboard"
                    :cursor-spacing="cursorSpacing"
                    :placeholder="placeholder"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="placeholderClass + ' ' + classPrefix + '__placeholder ' + classPrefix + '__placeholder--' + (center ? 'center' : 'normal')"
                    @input="onInput"
                    @focus="onFocus"
                    @blur="onBlur"
                    @confirm="onConfirm"
                />
                <view
                    v-if="value !== '' && clearable && showClearIcon"
                    :class="classPrefix + '__clear hotspot-expanded ' + prefix + '-class-clear'"
                    @tap.stop.prevent="handleClear"
                    aria-role="button"
                    aria-label="清除"
                >
                    <t-icon name="close-circle-filled" size="inherit" color="inherit" />
                </view>
            </view>
            <view v-if="action" :class="classPrefix + '__search-action ' + prefix + '-class-action'" @tap.stop.prevent="onActionClick" aria-role="button">{{ action }}</view>
            <slot v-else name="action" />
        </view>
        <view v-if="isShowResultList && !isSelected" :class="classPrefix + '__result-list'" aria-role="listbox">
            <t-cell
                :data-index="index"
                :class="classPrefix + '__result-item'"
                hover
                @tap.native="onSelectResultItem($event, { index })"
                aria-role="option"
                v-for="(item, index) in resultList"
                :key="index"
            >
                <rich-text slot="title" :nodes="_this.highLight(item, value)"></rich-text>
            </t-cell>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/search/search.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tCell from "../cell/cell";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getCharacterLength } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-search`;
let Search = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-input-container`, `${prefix}-class-input`, `${prefix}-class-action`, `${prefix}-class-left`, `${prefix}-class-clear`];
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.observers = {
      resultList(e) {
        const {
          isSelected: t
        } = this;
        if (e.length) {
          if (t) {
            this.setData({
              isShowResultList: false,
              isSelected: false
            });
          } else {
            this.setData({
              isShowResultList: true
            });
          }
        } else {
          this.setData({
            isShowResultList: false
          });
        }
      },
      "clearTrigger, clearable, disabled, readonly"() {
        this.updateClearIconVisible();
      }
    };
    this.setData({
      classPrefix: name,
      prefix: prefix,
      isShowResultList: false,
      isSelected: false,
      showClearIcon: true
    });
  }
  updateClearIconVisible(e = false) {
    const {
      clearTrigger: t,
      disabled: s,
      readonly: i
    } = this;
    s || i ? this.setData({
      showClearIcon: false
    }) : this.setData({
      showClearIcon: e || "always" === String(t)
    });
  }
  onInput(e) {
    let {
      value: t
    } = e.detail;
    const {
      maxcharacter: s
    } = this;
    if (s && "number" == typeof s && s > 0) {
      const {
        characters: e
      } = getCharacterLength("maxcharacter", t, s);
      t = e;
    }
    this.setData({
      value: t
    });
    this.$emit("change", {
      detail: {
        value: t
      }
    });
  }
  onFocus(e) {
    const {
      value: t
    } = e.detail;
    this.updateClearIconVisible(true);
    this.$emit("focus", {
      detail: {
        value: t
      }
    });
  }
  onBlur(e) {
    const {
      value: t
    } = e.detail;
    this.updateClearIconVisible();
    this.$emit("blur", {
      detail: {
        value: t
      }
    });
  }
  handleClear() {
    this.setData({
      value: ""
    });
    this.$emit("clear", {
      detail: {
        value: ""
      }
    });
    this.$emit("change", {
      detail: {
        value: ""
      }
    });
  }
  onConfirm(e) {
    const {
      value: t
    } = e.detail;
    this.$emit("submit", {
      detail: {
        value: t
      }
    });
  }
  onActionClick() {
    this.$emit("action-click");
  }
  onSelectResultItem(e) {
    const {
      index: t
    } = e.currentTarget.dataset;
    const s = this.resultList[t];
    this.setData({
      value: s,
      isSelected: true
    });
    this.$emit("change", {
      detail: {
        value: s
      }
    });
    this.$emit("selectresult", {
      detail: {
        index: t,
        item: s
      }
    });
  }
};
Search = __decorate([wxComponent()], Search);
export default Search;
</script>
<style>
@import './search.css';
</style>
