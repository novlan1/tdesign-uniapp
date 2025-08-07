<template>
  <view
    :class="parseExternalClass((prefix ? prefix : classPrefix) + ' class ' + componentPrefix + '-class')"
    :style="_._style([iconStyle, style, customStyle])"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel"
    :aria-role="ariaRole"
    @tap="onTap"
  >
    <view
      v-if="isImage"
      :class="classPrefix + '--image'"
    >
      <image
        :src="name"
        mode="aspectFit"
        :class="classPrefix + '__image'"
      />
    </view>
    <div
      v-if="_.isValidIconName(name) && !isImage"
      :class="(prefix ? prefix : classPrefix) + '-' + name + ' ' + classPrefix + '-base'"
    />
  </view>
</template>
<script>
import { __awaiter, __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { styles, addUnit, getRect, toCamel } from "../common/utils";
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';


const {
  prefix: prefix
} = config;
const name = `${prefix}-icon`;
let Icon = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    // this = props;
    this.properties = props;
    this._ = _;
    this.setData({
      componentPrefix: prefix,
      classPrefix: name,
      isImage: false,
      iconStyle: void 0
    });

    this.observers = {
      "name, color, size, style"() {
        this.setIconStyle();
      }
    };
    this.methods = {
      onTap(t) {
        this.$emit("click", {
          detail: t.detail
        });
      },
      setIconStyle() {
        const {
          name: t,
          color: e,
          size: o,
          classPrefix: i
        } = this;
        const s = -1 !== t.indexOf("/");
        const n = addUnit(o);
        const r = e ? {
          color: e
        } : {};
        const c = o ? {
          "font-size": n
        } : {};
        const a = Object.assign(Object.assign({}, r), c);
        this.setData({
          isImage: s
        }, () => __awaiter(this, void 0, void 0, function* () {
          if (s) {
            let t = n;
            t || (yield getRect(this, `.${i}`).then(e => {
              t = addUnit(null == e ? void 0 : e.height);
            }).catch(() => {}));
            a.width = t;
            a.height = t;
          }
          this.setData({
            iconStyle: `${styles(a)}`
          });
        }));
      }
    };
  }
  setData() {};

};
Icon = initTDesign(__decorate([wxComponent()], Icon));
export default Icon;
</script>
<style>
@import './icon.css';
</style>
