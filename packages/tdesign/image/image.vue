<template>
  <view
    :style="_._style([style, customStyle])"
    :class="'class ' + prefix + '-class ' + classPrefix"
  >
    <view
      v-if="isLoading"
      :style="_._style([innerStyle])"
      :class="classPrefix + '__mask ' + classPrefix + '--loading ' + classPrefix + '--shape-' + shape"
      :aria-hidden="ariaHidden"
    >
      <t-loading
        v-if="loading === 'default'"
        theme="dots"
        size="44rpx"
        loading
        inherit-color
        t-class="t-class-load"
        :t-class-text="classPrefix + '--loading-text'"
      />
      <view
        v-else-if="loading !== '' && loading !== 'slot'"
        :class="classPrefix + '__common ' + prefix + '-class-load'"
      >
        {{ loading }}
      </view>
      <slot
        v-else
        name="loading"
      />
    </view>
    <view
      v-else-if="isFailed"
      :style="_._style([innerStyle])"
      :class="classPrefix + '__mask ' + classPrefix + '--failed ' + classPrefix + '--shape-' + shape + ' ' + prefix + '-class-error'"
      :aria-hidden="ariaHidden"
    >
      <view
        v-if="error === 'default'"
        style="font-size: 44rpx"
        :class="prefix + '-class-load'"
      >
        <t-icon
          name="close"
          aria-role="img"
          aria-label="加载失败"
        />
      </view>
      <view
        v-else-if="error && error !== 'slot'"
        :class="classPrefix + '__common ' + prefix + '-class-load'"
      >
        {{ error }}
      </view>
      <slot
        v-else
        name="error"
      />
    </view>
    <image
      v-if="!isFailed"
      :id="tId || 'image'"
      :style="_._style([innerStyle])"
      :class="classPrefix + '__img ' + classPrefix + '--shape-' + shape + ' ' + (isLoading ? classPrefix + '--lazy' : '') + ' ' + prefix + '-class-image'"
      :src="src"
      :mode="mode"
      :webp="webp"
      :lazy-load="lazy"
      :show-menu-by-longpress="showMenuByLongpress"
      :aria-hidden="ariaHidden || isLoading || isFailed"
      :aria-label="ariaLabel"
      @load="onLoaded"
      @error="onLoadError"
    />
  </view>
</template>
<script module="_" lang="wxs" src="../common/utils.wxs"></script>
<script>
// import tLoading from "../loading/loading";
import tIcon from "../icon/icon";
import { __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import ImageProps from "./props";
import config from "../common/config";
import { addUnit, getRect, appBaseInfo } from "../common/utils";
import { compareVersion } from "../common/version";
const {
  prefix: prefix
} = config;
const name = `${prefix}-image`;
let Image = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-load`, `${prefix}-class-image`, `${prefix}-class-error`];
    this.options = {
      multipleSlots: true
    };
    // this = ImageProps;
    this.setData({
      prefix: prefix,
      isLoading: true,
      isFailed: false,
      innerStyle: "",
      classPrefix: name
    });
    this.preSrc = void 0;
    this.observers = {
      src() {
        if (this.preSrc !== this.src) {
          this.update();
        }
      },
      "width, height"(e, i) {
        this.calcSize(e, i);
      }
    };
    this.methods = {
      onLoaded(e) {
        const i = appBaseInfo.SDKVersion;
        const {
          mode: t,
          tId: s
        } = this;
        const r = compareVersion(i, "2.10.3") < 0;
        if ("heightFix" === t && r) {
          const {
            height: i,
            width: t
          } = e.detail;
          getRect(this, `#${s || "image"}`).then(e => {
            const {
              height: s
            } = e;
            const r = (s / i * t).toFixed(2);
            this.setData({
              innerStyle: `height: ${addUnit(s)}; width: ${r}px;`
            });
          });
        }
        this.setData({
          isLoading: false,
          isFailed: false
        });
        this.$emit("load", {
          detail: e.detail
        });
      },
      onLoadError(e) {
        this.setData({
          isLoading: false,
          isFailed: true
        });
        this.$emit("error", {
          detail: e.detail
        });
      },
      calcSize(e, i) {
        let t = "";
        if (e) {
          t += `width: ${addUnit(e)};`;
        }
        if (i) {
          t += `height: ${addUnit(i)};`;
        }
        this.setData({
          innerStyle: t
        });
      },
      update() {
        const {
          src: e
        } = this;
        this.preSrc = e;
        if (e) {
          this.setData({
            isLoading: true,
            isFailed: false
          });
        } else {
          this.onLoadError({
            errMsg: "图片链接为空"
          });
        }
      }
    };
  }
  setData(){}
};
Image = __decorate([wxComponent()], Image);
export default Image;
</script>
<style>
@import './image.css';
</style>
