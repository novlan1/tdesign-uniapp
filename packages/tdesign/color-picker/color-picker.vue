<template>
    <view>
        <t-popup
            v-if="usePopup"
            class="class"
            :visible="visible"
            :using-custom-navbar="popupProps.usingCustomNavbar || false"
            :show-overlay="popupProps.showOverlay || true"
            :z-index="popupProps.zIndex || 11500"
            :overlay-props="popupProps.overlayProps || defaultOverlayProps"
            placement="bottom"
            @visible-change="onVisibleChange"
        >
            <slot name="header" />
            <!-- parse <include src="./template.wxml"/> -->
            <block>
                <view :class="classPrefix + '__panel'" :style="_._style([style, customStyle])">
                    <view :class="classPrefix + '__body ' + classPrefix + '__body--' + type">
                        <view
                            :class="classPrefix + '__saturation'"
                            v-if="isMultiple"
                            @touchstart.stop.prevent="onTouchStart"
                            @touchmove.stop.prevent="onTouchMove"
                            @touchend.stop.prevent="onTouchEnd"
                            data-type="saturation"
                            :style="'background: hsl(' + sliderInfo.value + ', 100%, 50%)'"
                        >
                            <view :class="classPrefix + '__thumb'" :tabIndex="0" :style="_._style(saturationThumbStyle)"></view>
                        </view>
                        <view :class="classPrefix + '__sliders-wrapper'" v-if="isMultiple">
                            <view :class="classPrefix + '__sliders'">
                                <view :class="classPrefix + '__slider-wrapper ' + classPrefix + '__slider-wrapper--hue-type'">
                                    <view
                                        :class="classPrefix + '__slider'"
                                        @touchstart.stop.prevent="onTouchStart"
                                        @touchmove.stop.prevent="onTouchMove"
                                        @touchend.stop.prevent="onTouchEnd"
                                        data-type="hue-slider"
                                    >
                                        <view :class="classPrefix + '__rail'"></view>
                                        <view :class="classPrefix + '__thumb'" :style="_._style(hueSliderStyle)"></view>
                                    </view>
                                </view>
                                <view v-if="enableAlpha" :class="classPrefix + '__slider-wrapper ' + classPrefix + '__slider-wrapper--alpha-type'">
                                    <view
                                        :class="classPrefix + '__slider-padding'"
                                        :style="
                                            'background: linear-gradient(90deg, rgba(0,0,0,.0) 0%, rgba(0,0,0,.0) 93%, ' +
                                            alphaSliderStyle.color +
                                            ' 93%, ' +
                                            alphaSliderStyle.color +
                                            ' 100%)'
                                        "
                                    ></view>
                                    <view
                                        :class="classPrefix + '__slider'"
                                        @touchstart.stop.prevent="onTouchStart"
                                        @touchmove.stop.prevent="onTouchMove"
                                        @touchend.stop.prevent="onTouchEnd"
                                        data-type="alpha-slider"
                                    >
                                        <view
                                            :class="classPrefix + '__rail'"
                                            :style="'background: linear-gradient(to right, rgba(0, 0, 0, 0), ' + alphaSliderStyle.color + ')'"
                                        ></view>
                                        <view :class="classPrefix + '__thumb'" :style="_._style(alphaSliderStyle)"></view>
                                    </view>
                                </view>
                            </view>
                            <view v-if="showPrimaryColorPreview" :class="classPrefix + '__sliders-preview ' + classPrefix + '--bg-alpha'">
                                <view :class="classPrefix + '__sliders-preview-inner'" :style="'background: ' + previewColor" />
                            </view>
                        </view>
                        <view :class="classPrefix + '__format'" v-if="isMultiple">
                            <view :class="classPrefix + '__format-item ' + classPrefix + '__format-item--first'">{{ format }}</view>
                            <view :class="classPrefix + '__format-item ' + classPrefix + '__format-item--second'">
                                <view :class="classPrefix + '__format-inputs'">
                                    <view
                                        :class="
                                            classPrefix +
                                            '__format-input ' +
                                            classPrefix +
                                            '__format-input--' +
                                            (index === formatList.length - 1 && formatList.length === 2 ? 'fixed' : 'base')
                                        "
                                        v-for="(item, index) in formatList"
                                        :key="index"
                                    >
                                        {{ item }}
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view :class="classPrefix + '__swatches-wrap'" v-if="innerSwatchList.length">
                            <view :class="classPrefix + '__swatches'">
                                <view :class="classPrefix + '__swatches-title'" v-if="isMultiple">系统预设色彩</view>
                                <view :class="classPrefix + '__swatches-items'">
                                    <view
                                        :class="classPrefix + '__swatches-item'"
                                        :data-value="swatch"
                                        @tap.stop.prevent="clickSwatch"
                                        v-for="(swatch, index) in innerSwatchList"
                                        :key="index"
                                    >
                                        <view :class="classPrefix + '__swatches-inner'" :style="'background-color: ' + swatch + ';'"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </block>
            <slot name="footer" />
        </t-popup>
        <block v-else>
            <!-- parse <include src="./template.wxml"/> -->
            <block>
                <view :class="classPrefix + '__panel'" :style="_._style([style, customStyle])">
                    <view :class="classPrefix + '__body ' + classPrefix + '__body--' + type">
                        <view
                            :class="classPrefix + '__saturation'"
                            v-if="isMultiple"
                            @touchstart.stop.prevent="onTouchStart"
                            @touchmove.stop.prevent="onTouchMove"
                            @touchend.stop.prevent="onTouchEnd"
                            data-type="saturation"
                            :style="'background: hsl(' + sliderInfo.value + ', 100%, 50%)'"
                        >
                            <view :class="classPrefix + '__thumb'" :tabIndex="0" :style="_._style(saturationThumbStyle)"></view>
                        </view>
                        <view :class="classPrefix + '__sliders-wrapper'" v-if="isMultiple">
                            <view :class="classPrefix + '__sliders'">
                                <view :class="classPrefix + '__slider-wrapper ' + classPrefix + '__slider-wrapper--hue-type'">
                                    <view
                                        :class="classPrefix + '__slider'"
                                        @touchstart.stop.prevent="onTouchStart"
                                        @touchmove.stop.prevent="onTouchMove"
                                        @touchend.stop.prevent="onTouchEnd"
                                        data-type="hue-slider"
                                    >
                                        <view :class="classPrefix + '__rail'"></view>
                                        <view :class="classPrefix + '__thumb'" :style="_._style(hueSliderStyle)"></view>
                                    </view>
                                </view>
                                <view v-if="enableAlpha" :class="classPrefix + '__slider-wrapper ' + classPrefix + '__slider-wrapper--alpha-type'">
                                    <view
                                        :class="classPrefix + '__slider-padding'"
                                        :style="
                                            'background: linear-gradient(90deg, rgba(0,0,0,.0) 0%, rgba(0,0,0,.0) 93%, ' +
                                            alphaSliderStyle.color +
                                            ' 93%, ' +
                                            alphaSliderStyle.color +
                                            ' 100%)'
                                        "
                                    ></view>
                                    <view
                                        :class="classPrefix + '__slider'"
                                        @touchstart.stop.prevent="onTouchStart"
                                        @touchmove.stop.prevent="onTouchMove"
                                        @touchend.stop.prevent="onTouchEnd"
                                        data-type="alpha-slider"
                                    >
                                        <view
                                            :class="classPrefix + '__rail'"
                                            :style="'background: linear-gradient(to right, rgba(0, 0, 0, 0), ' + alphaSliderStyle.color + ')'"
                                        ></view>
                                        <view :class="classPrefix + '__thumb'" :style="_._style(alphaSliderStyle)"></view>
                                    </view>
                                </view>
                            </view>
                            <view v-if="showPrimaryColorPreview" :class="classPrefix + '__sliders-preview ' + classPrefix + '--bg-alpha'">
                                <view :class="classPrefix + '__sliders-preview-inner'" :style="'background: ' + previewColor" />
                            </view>
                        </view>
                        <view :class="classPrefix + '__format'" v-if="isMultiple">
                            <view :class="classPrefix + '__format-item ' + classPrefix + '__format-item--first'">{{ format }}</view>
                            <view :class="classPrefix + '__format-item ' + classPrefix + '__format-item--second'">
                                <view :class="classPrefix + '__format-inputs'">
                                    <view
                                        :class="
                                            classPrefix +
                                            '__format-input ' +
                                            classPrefix +
                                            '__format-input--' +
                                            (index === formatList.length - 1 && formatList.length === 2 ? 'fixed' : 'base')
                                        "
                                        v-for="(item, index) in formatList"
                                        :key="index"
                                    >
                                        {{ item }}
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view :class="classPrefix + '__swatches-wrap'" v-if="innerSwatchList.length">
                            <view :class="classPrefix + '__swatches'">
                                <view :class="classPrefix + '__swatches-title'" v-if="isMultiple">系统预设色彩</view>
                                <view :class="classPrefix + '__swatches-items'">
                                    <view
                                        :class="classPrefix + '__swatches-item'"
                                        :data-value="swatch"
                                        @tap.stop.prevent="clickSwatch"
                                        v-for="(swatch, index) in innerSwatchList"
                                        :key="index"
                                    >
                                        <view :class="classPrefix + '__swatches-inner'" :style="'background-color: ' + swatch + ';'"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </block>
        </block>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tPopup from "../popup/popup";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { SATURATION_PANEL_DEFAULT_HEIGHT, SATURATION_PANEL_DEFAULT_WIDTH, SLIDER_DEFAULT_WIDTH, DEFAULT_COLOR, ALPHA_MAX, HUE_MAX, DEFAULT_SYSTEM_SWATCH_COLORS } from "./constants";
import { getRect, debounce } from "../common/utils";
import { Color, getColorObject } from "./utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-color-picker`;
const getCoordinate = (t, e, a) => {
  var o;
  const {
    pageX: i,
    pageY: r,
    clientY: l
  } = t.changedTouches[0] || {};
  const s = a ? e.top : null === (o = t.currentTarget) || void 0 === o ? void 0 : o.offsetTop;
  return {
    x: Math.min(Math.max(0, i - e.left), e.width),
    y: Math.min(Math.max(0, (a ? l : r) - s), e.height)
  };
};
const getFormatList = (t, e) => {
  const a = {
    HSV: Object.values(e.getHsva()),
    HSVA: Object.values(e.getHsva()),
    HSL: Object.values(e.getHsla()),
    HSLA: Object.values(e.getHsla()),
    HSB: Object.values(e.getHsla()),
    RGB: Object.values(e.getRgba()),
    RGBA: Object.values(e.getRgba()),
    CMYK: [...Object.values(e.getCmyk()), 0],
    CSS: [e.css, 0],
    HEX: [e.hex, 0]
  };
  const o = a[t];
  return o ? [...o.slice(0, o.length - 1), `${Math.round(100 * e.alpha)}%`] : a.RGB;
};
const genSwatchList = t => void 0 === t ? DEFAULT_SYSTEM_SWATCH_COLORS : t && t.length ? t : [];
let ColorPicker = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.observers = {
      format() {
        this.setCoreStyle();
      },
      swatchColors(t) {
        this.setData({
          innerSwatchList: genSwatchList(t)
        });
      },
      type(t) {
        this.setData({
          isMultiple: "multiple" === t
        });
      },
      "usePopup, visible"(t, e) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (t && e) {
          this.timer = setTimeout(() => {
            this.getEleReact();
          }, 350);
        }
      },
      value(t) {
        if (t) {
          this.init();
        }
      }
    };
    this.color = new Color(props.defaultValue.value || props.value.value || DEFAULT_COLOR);
    this.setData({
      prefix: prefix,
      classPrefix: name,
      panelRect: {
        width: SATURATION_PANEL_DEFAULT_WIDTH,
        height: SATURATION_PANEL_DEFAULT_HEIGHT
      },
      sliderRect: {
        width: SLIDER_DEFAULT_WIDTH,
        left: 0
      },
      saturationInfo: {
        saturation: 0,
        value: 0
      },
      saturationThumbStyle: {
        left: 0,
        top: 0
      },
      sliderInfo: {
        value: 0
      },
      hueSliderStyle: {
        left: 0
      },
      alphaSliderStyle: {
        left: 0
      },
      innerValue: props.defaultValue.value || props.value.value,
      showPrimaryColorPreview: false,
      previewColor: props.defaultValue.value || props.value.value,
      formatList: getFormatList(props.format.value, this.color),
      innerSwatchList: genSwatchList(props.swatchColors.value),
      isMultiple: "multiple" === props.type.value,
      defaultOverlayProps: {}
    });
    this.lifetimes = {
      ready() {
        this.init();
      },
      attached() {
        this.debouncedUpdateEleRect = debounce(t => this.updateEleRect(t), 150);
      },
      detached() {
        clearTimeout(this.timer);
      }
    };
    this.methods = {
      init() {
        const {
          value: t,
          defaultValue: e
        } = this;
        const a = t || e;
        if (a) {
          this.setData({
            innerValue: a
          });
        }
        this.color = new Color(a || DEFAULT_COLOR);
        this.updateColor();
        this.getEleReact();
      },
      updateEleRect(t) {
        if (!t) {
          return;
        }
        const {
          scrollTop: e
        } = t.detail;
        const {
          width: a,
          height: o,
          left: i,
          initTop: r
        } = this.panelRect;
        this.setData({
          panelRect: {
            width: a,
            height: o,
            left: i,
            top: r - e,
            initTop: r
          }
        });
      },
      getEleReact() {
        Promise.all([getRect(this, `.${name}__saturation`), getRect(this, `.${name}__slider`)]).then(([t, e]) => {
          this.setData({
            panelRect: {
              width: t.width || SATURATION_PANEL_DEFAULT_WIDTH,
              height: t.height || SATURATION_PANEL_DEFAULT_HEIGHT,
              left: t.left || 0,
              top: t.top || 0,
              initTop: t.top || 0
            },
            sliderRect: {
              left: e.left || 0,
              width: e.width || SLIDER_DEFAULT_WIDTH
            }
          }, () => {
            this.setCoreStyle();
          });
        });
      },
      clickSwatch(t) {
        const e = t.currentTarget.dataset.value;
        this.color.update(e);
        this.emitColorChange("preset");
        this.setCoreStyle();
      },
      setCoreStyle() {
        this.setData({
          sliderInfo: {
            value: this.color.hue
          },
          hueSliderStyle: this.getSliderThumbStyle({
            value: this.color.hue,
            maxValue: HUE_MAX
          }),
          alphaSliderStyle: this.getSliderThumbStyle({
            value: 100 * this.color.alpha,
            maxValue: ALPHA_MAX
          }),
          saturationInfo: {
            saturation: this.color.saturation,
            value: this.color.value
          },
          saturationThumbStyle: this.getSaturationThumbStyle({
            saturation: this.color.saturation,
            value: this.color.value
          }),
          previewColor: this.color.rgba,
          formatList: getFormatList(this.format, this.color)
        });
      },
      emitColorChange(t) {
        this.setData({
          innerValue: this.formatValue()
        });
        this.$emit("change", {
          detail: {
            value: this.formatValue(),
            context: {
              trigger: t,
              color: getColorObject(this.color)
            }
          }
        });
      },
      defaultEmptyColor: () => DEFAULT_COLOR,
      updateColor() {
        const t = this.innerValue || this.defaultEmptyColor();
        this.color.update(t);
      },
      getSaturationAndValueByCoordinate(t) {
        const {
          width: e,
          height: a
        } = this.panelRect;
        const {
          x: o,
          y: i
        } = t;
        let r = o / e;
        let l = 1 - i / a;
        r = Math.min(1, Math.max(0, r));
        l = Math.min(1, Math.max(0, l));
        return {
          saturation: r,
          value: l
        };
      },
      getSaturationThumbStyle({
        saturation: t,
        value: e
      }) {
        const {
          width: a,
          height: o
        } = this.panelRect;
        const i = Math.round((1 - e) * o);
        const r = Math.round(t * a);
        return {
          color: this.color.rgb,
          left: `${r}px`,
          top: `${i}px`
        };
      },
      getSliderThumbStyle({
        value: t,
        maxValue: e
      }) {
        const {
          width: a
        } = this.sliderRect;
        if (!a) {
          return;
        }
        return {
          left: `${Math.round(t / e * 100)}%`,
          color: this.color.rgb
        };
      },
      onChangeSaturation({
        saturation: t,
        value: e
      }) {
        const {
          saturation: a,
          value: o
        } = this.color;
        let i = "palette-saturation-brightness";
        if (e !== o && t !== a) {
          this.color.saturation = t;
          this.color.value = e;
          i = "palette-saturation-brightness";
        } else if (t !== a) {
          this.color.saturation = t;
          i = "palette-saturation";
        } else {
          if (e === o) {
            return;
          }
          this.color.value = e;
          i = "palette-brightness";
        }
        this.$emit("palette-bar-change", {
          detail: {
            color: getColorObject(this.color)
          }
        });
        this.emitColorChange(i);
        this.setCoreStyle();
      },
      formatValue() {
        return this.color.getFormatsColorMap()[this.format] || this.color.css;
      },
      onChangeSlider({
        value: t,
        isAlpha: e
      }) {
        e ? this.color.alpha = t / 100 : this.color.hue = t;
        this.emitColorChange(e ? "palette-alpha-bar" : "palette-hue-bar");
        this.setCoreStyle();
      },
      handleSaturationDrag(t) {
        const {
          usePopup: e,
          fixed: a
        } = this;
        const o = getCoordinate(t, this.panelRect, e || a);
        const {
          saturation: i,
          value: r
        } = this.getSaturationAndValueByCoordinate(o);
        this.onChangeSaturation({
          saturation: i,
          value: r
        });
      },
      handleSliderDrag(t, e = false) {
        const {
          width: a
        } = this.sliderRect;
        const o = getCoordinate(t, this.sliderRect);
        const {
          x: i
        } = o;
        const r = e ? ALPHA_MAX : HUE_MAX;
        let l = Math.round(i / a * r * 100) / 100;
        if (l < 0) {
          l = 0;
        }
        if (l > r) {
          l = r;
        }
        this.onChangeSlider({
          value: l,
          isAlpha: e
        });
      },
      handleDiffDrag(t) {
        switch (t.target.dataset.type || t.currentTarget.dataset.type) {
          case "saturation":
            this.handleSaturationDrag(t);
            break;
          case "hue-slider":
            this.handleSliderDrag(t);
            break;
          case "alpha-slider":
            this.handleSliderDrag(t, true);
        }
      },
      onTouchStart(t) {
        this.handleDiffDrag(t);
      },
      onTouchMove(t) {
        this.handleDiffDrag(t);
      },
      onTouchEnd(t) {
        this.$nextTick(() => {
          this.handleDiffDrag(t);
        });
      },
      close(t) {
        if (this.autoClose) {
          this.setData({
            visible: false
          });
        }
        this.$emit("close", {
          detail: {
            trigger: t
          }
        });
      },
      onVisibleChange() {
        this.close("overlay");
      }
    };
  }
};
ColorPicker = __decorate([wxComponent()], ColorPicker);
export default ColorPicker;
</script>
<style>
@import './color-picker.css';
</style>
