<template>
  <view
    v-if="wrapperVisible"
    :class="classPrefix + ' class ' + tClass"
    :style="_._style([getStyles(top, zIndex), style, customStyle])"
  >
    <view
      v-if="show"
      :class="classPrefix + '__mask'"
      :style="_._style(['height:' + maskHeight + 'px', style, customStyle])"
      @tap="handleMaskClick"
      @touchmove.stop.prevent="closeDropdown"
    />
    <t-popup
      :visible="show"
      :z-index="zIndex + 1"
      :duration="duration"
      :show-overlay="showOverlay"
      custom-style="position: absolute"
      :overlay-props="{ style: 'position: absolute' }"
      :t-class="classPrefix + '__popup-host'"
      :t-class-content="classPrefix + '__content ' + tClassContent"
      @leaved="onLeaved"
      @visible-change="handleMaskClick"
    >
      <view :class="classPrefix + '__body'">
        <scroll-view
          v-if="!multiple && options && options.length > 0"
          :class="classPrefix + '__scroll'"
          scroll-y
          :scroll-into-view="'id_' + dataValue"
        >
          <t-radio-group
            :class="classPrefix + '__radio ' + tClassColumn"
            :t-class="classPrefix + '__radio-group'"
            :style="'grid-template-columns: repeat(' + optionsColumns + ', 1fr)'"
            :value="dataValue"
            @change="handleRadioChange"
          >
            <view
              v-for="(item, index) in options"
              :id="'id_' + item[valueAlias]"
              :key="index"
            >
              <t-radio
                :placement="placement"
                tabindex="0"
                icon="line"
                :class="classPrefix + '__radio-item ' + tClassColumnItem"
                t-class="radio"
                :t-class-label="tClassColumnItemLabel"
                :value="item[valueAlias]"
                :label="item[labelAlias]"
                :disabled="item.disabled"
              />
            </view>
          </t-radio-group>
        </scroll-view>
        <scroll-view
          v-if="multiple && options && options.length > 0"
          :class="classPrefix + '__scroll'"
          scroll-y
          :scroll-into-view="'id_' + firstCheckedValue"
        >
          <t-checkbox-group
            :class="classPrefix + '__checkbox ' + tClassColumn"
            :t-class="classPrefix + '__checkbox-group'"
            :style="'grid-template-columns: repeat(' + optionsColumns + ', 1fr)'"
            :value="dataValue ? dataValue : []"
            @change="handleRadioChange"
          >
            <view
              v-for="(item, index) in options"
              :id="'id_' + item[valueAlias]"
              :key="index"
            >
              <t-checkbox
                tabindex="0"
                :class="classPrefix + '__checkbox-item ' + tClassColumnItem"
                theme="tag"
                :value="item[valueAlias]"
                :label="item[labelAlias]"
                :disabled="item.disabled"
              />
            </view>
          </t-checkbox-group>
        </scroll-view>
        <slot />
      </view>
      <view :class="classPrefix + '__footer ' + tClassFooter">
        <slot name="footer" />
        <block v-if="multiple">
          <t-button
            block
            :class="classPrefix + '__footer-btn ' + classPrefix + '__reset-btn'"
            theme="light"
            content="重置"
            :disabled="dataValue.length == 0"
            @click="handleReset"
          />
          <t-button
            block
            :class="classPrefix + '__footer-btn ' + classPrefix + '__confirm-btn'"
            theme="primary"
            content="确定"
            :disabled="dataValue.length == 0"
            @click="handleConfirm"
          />
        </block>
      </view>
    </t-popup>
  </view>
</template>
<script>
import tButton from '../button/button';
import tRadio from '../radio/radio';
import tRadioGroup from '../radio-group/radio-group';
import tCheckbox from '../checkbox/checkbox';
import tCheckboxGroup from '../checkbox-group/checkbox-group';
import tPopup from '../popup/popup';

import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import menuProps from '../dropdown-menu/props';
import { getRect } from '../common/utils';
import _ from '../common/utils.wxs';
import { getStyles } from './computed';
import { ChildrenMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-dropdown-item`;


export default uniComponent({
  name,
  controlledProps: [{
    key: 'value',
    event: 'change',
  }],
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-content`,
    `${prefix}-class-column`,
    `${prefix}-class-column-item`,
    `${prefix}-class-column-item-label`,
    `${prefix}-class-footer`,
  ],
  mixins: [ChildrenMixin(RELATION_MAP.DropdownItem)],
  components: {
    tButton,
    tRadio,
    tRadioGroup,
    tCheckbox,
    tCheckboxGroup,
    tPopup,
  },
  props: {
    ...props,
  },
  emits: ['close', 'closed', 'change', 'reset', 'confirm', 'opened', 'open'],
  data() {
    return {
      prefix,
      classPrefix: name,
      show: false,
      top: 0,
      maskHeight: 0,
      initValue: null,
      hasChanged: false,
      duration: menuProps.duration.default,
      zIndex: menuProps.zIndex.default,
      overlay: menuProps.showOverlay.default,
      labelAlias: 'label',
      valueAlias: 'value',
      computedLabel: '',
      firstCheckedValue: '',

      dataValue: this.value ?? this.defaultValue,

      wrapperVisible: false,
      _,
    };
  },
  watch: {
    keys: {
      handler(obj) {
        this.labelAlias = obj?.label || 'label';
        this.valueAlias = obj?.value || 'value';
      },
      immediate: true,
    },
    value: {
      handler(value) {
        this.dataValue = value;
      },
      immediate: true,
    },
    dataValue: {
      handler(v) {
        console.log('dataValue.v', v);
        const { options, labelAlias, valueAlias } = this;

        if (this.multiple) {
          if (v && !Array.isArray(v)) throw TypeError('应传入数组类型的 value');
        }

        const target = options.find(item => item[valueAlias] === v);

        if (target) {
          this.computedLabel = target[labelAlias];
        }
      },
      immediate: true,
    },
    label: 'getParentAllItems',
    computedLabel: 'getParentAllItems',
    disabled: 'getParentAllItems',
    show: {
      handler(visible) {
        if (visible) {
          this.getParentBottom(() => {
            this.wrapperVisible = true;
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {

  },
  methods: {
    getStyles,
    innerAfterLinked(target) {
      const { zIndex, duration, showOverlay } = target;

      this.zIndex = zIndex;
      this.duration = duration;
      this.showOverlay = showOverlay;
    },
    getParentAllItems() {
      this[RELATION_MAP.DropdownItem]?.getAllItems();
    },
    closeDropdown() {
      this[RELATION_MAP.DropdownItem].activeIdx = -1;
      this.show = false;
      this.$emit('close');
    },

    getParentBottom(cb) {
      getRect(this[RELATION_MAP.DropdownItem], `#${prefix}-bar`).then((rect) => {
        this.top = rect.bottom;
        this.maskHeight = rect.top;

        setTimeout(() => {
          cb();
        }, 20);
      });
    },

    handleTreeClick(e) {
      const { level, value: itemValue } = e.currentTarget.dataset;
      const { dataValue } = this;

      dataValue[level] = itemValue;
      this._trigger('change', { value: dataValue });
    },

    handleRadioChange(e) {
      const { value } = e.detail;

      this._trigger('change', { value });

      if (!this.multiple) {
        this.closeDropdown();
      } else {
        const firstChecked = this.options.find(item => value.includes(item.value));
        if (firstChecked) {
          this.firstCheckedValue = firstChecked.value;
        }
      }
    },

    handleMaskClick() {
      if (this[RELATION_MAP.DropdownItem]?.closeOnClickOverlay) {
        this.closeDropdown();
      }
    },

    handleReset() {
      this._trigger('change', { value: [] });
      this._trigger('reset');
    },

    handleConfirm() {
      this._trigger('confirm', { value: this.dataValue });
      this.closeDropdown();
      // 在关闭popup后才自动滚动到首个选项
      // this.firstCheckedValue = this.firstCheckedValue;
    },

    onLeaved() {
      this.wrapperVisible = false;
    },
  },
});

// let DropdownMenuItem = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.options = {
//       multipleSlots: true
//     };
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-column`, `${prefix}-class-column-item`, `${prefix}-class-column-item-label`, `${prefix}-class-footer`];
//     this.properties = props;;
//     this.setData({
//       prefix: prefix,
//       classPrefix: name,
//       show: false,
//       top: 0,
//       maskHeight: 0,
//       initValue: null,
//       hasChanged: false,
//       duration: menuProps.duration.value,
//       zIndex: menuProps.zIndex.value,
//       overlay: menuProps.showOverlay.value,
//       labelAlias: "label",
//       valueAlias: "value",
//       computedLabel: "",
//       firstCheckedValue: ""
//     });
//     this.relations = {
//       "../dropdown-menu/dropdown-menu": {
//         type: "parent",
//         linked(e) {
//           const {
//             zIndex: t,
//             duration: a,
//             showOverlay: s
//           } = e.properties;
//           this.setData({
//             zIndex: t,
//             duration: a,
//             showOverlay: s
//           });
//         }
//       }
//     };
//     this.controlledProps = [{
//       key: "value",
//       event: "change"
//     }];
//     this.observers = {
//       keys(e) {
//         this.setData({
//           labelAlias: e.label || "label",
//           valueAlias: e.value || "value"
//         });
//       },
//       value(e) {
//         const {
//           options: t,
//           labelAlias: a,
//           valueAlias: s
//         } = this;
//         if (this.multiple && !Array.isArray(e)) {
//           throw TypeError("应传入数组类型的 value");
//         }
//         const o = t.find(t => t[s] === e);
//         if (o) {
//           this.setData({
//             computedLabel: o[a]
//           });
//         }
//       },
//       "label, computedLabel, disabled"() {
//         var e;
//         null === (e = this.$parent) || void 0 === e || e.getAllItems();
//       },
//       show(e) {
//         if (e) {
//           this.getParentBottom(() => {
//             this.setData({
//               wrapperVisible: true
//             });
//           });
//         }
//       }
//     };
//     this.methods = {
//       closeDropdown() {
//         var e;
//         null === (e = this.$parent) || void 0 === e || e.setData({
//           activeIdx: -1
//         });
//         this.setData({
//           show: false
//         });
//         this.$emit("close");
//       },
//       getParentBottom(e) {
//         getRect(this.$parent, `#${prefix}-bar`).then(t => {
//           this.setData({
//             top: t.bottom,
//             maskHeight: t.top
//           }, e);
//         });
//       },
//       handleTreeClick(e) {
//         const {
//           level: t,
//           value: a
//         } = e.currentTarget.dataset;
//         const {
//           value: s
//         } = this;
//         s[t] = a;
//         this._trigger("change", {
//           value: s
//         });
//       },
//       handleRadioChange(e) {
//         const {
//           value: t
//         } = e.detail;
//         this._trigger("change", {
//           value: t
//         });
//         if (this.multiple) {
//           const e = this.options.find(e => t.includes(e.value));
//           if (e) {
//             this.firstCheckedValue = e.value;
//           }
//         } else {
//           this.closeDropdown();
//         }
//       },
//       handleMaskClick() {
//         var e;
//         if (null === (e = this.$parent) || void 0 === e ? void 0 : e.properties.closeOnClickOverlay) {
//           this.closeDropdown();
//         }
//       },
//       handleReset() {
//         this._trigger("change", {
//           value: []
//         });
//         this._trigger("reset");
//       },
//       handleConfirm() {
//         this._trigger("confirm", {
//           value: this.value
//         });
//         this.closeDropdown();
//         this.setData({
//           firstCheckedValue: this.firstCheckedValue
//         });
//       },
//       onLeaved() {
//         this.setData({
//           wrapperVisible: false
//         });
//       }
//     };
//   }
// };
// DropdownMenuItem = __decorate([wxComponent()], DropdownMenuItem);
// export default DropdownMenuItem;
</script>
<style scoped>
@import './dropdown-item.css';
</style>
