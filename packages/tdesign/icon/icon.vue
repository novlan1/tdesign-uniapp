<template>
  <view
    :class="[tClass, extraClass, prefix || 't-icon']"
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
// import { __awaiter, __decorate } from '../miniprogram_npm/tslib';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { styles, addUnit, getRect } from '../common/utils';
import _ from '../common/utils.wxs';
// import { initTDesign } from '../common/runtime';


const name = `${prefix}-icon`;
export default uniComponent({
  name,
  externalClasses: [`${prefix}-class`],
  props: {
    ...props,
  },
  data() {
    return {
      componentPrefix: prefix,
      classPrefix: name,
      isImage: false,
      iconStyle: undefined,
      _,
    };
  },
  watch: {
    name: {
      handler() {
        this.setIconStyle();
      },
      immediate: true,
    },
    color: {
      handler() {
        this.setIconStyle();
      },
      immediate: true,
    },
    size: {
      handler() {
        this.setIconStyle();
      },
      immediate: true,
    },
    style: {
      handler() {
        this.setIconStyle();
      },
      immediate: true,
    },
  },
  methods: {
    onTap(t) {
      this.$emit('click', {
        detail: t.detail,
      });
    },
    setIconStyle() {
      const {
        name,
        color,
        size,
        classPrefix,
      } = this;
      const isImage = name.indexOf('/') !== -1;
      const sizeValue = addUnit(size);
      const colorStyle = color ? {
        color,
      } : {};
      const fontStyle = size ? {
        'font-size': sizeValue,
      } : {};
      const iconStyle = { ...colorStyle, ...fontStyle };
      this.isImage = isImage;

      if (isImage) {
        let iconSize = sizeValue;
        if (!iconSize) {
          getRect(this, `.${classPrefix}`)
            .then((res) => {
              iconSize = addUnit(res?.height);
            })
            .catch(() => {});
        }

        iconStyle.width = iconSize;
        iconStyle.height = iconSize;
      }
      this.iconStyle = `${styles(iconStyle)}`;

      // this.setData({
      //   isImage,
      // }, () => __awaiter(this, void 0, void 0, function* () {
      //   if (isImage) {
      //     let t = n;
      //     t || (yield getRect(this, `.${classPrefix}`).then((e) => {
      //       t = addUnit(null == e ? void 0 : e.height);
      //     })
      //       .catch(() => {}));
      //     a.width = t;
      //     a.height = t;
      //   }
      //   this.setData({
      //     iconStyle: `${styles(a)}`,
      //   });
      // }));
    },
  },
});
// let Icon = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`];
//     // this = props;
//     this.properties = props;
//     this._ = _;
//     this.setData({
//       componentPrefix: prefix,
//       classPrefix: name,
//       isImage: false,
//       iconStyle: void 0,
//     });
//     this.name = 'TIcon';
//     this.observers = {
//       'name, color, size, style'() {
//         this.setIconStyle();
//       },
//     };
//     this.methods = {
//       onTap(t) {
//         this.$emit('click', {
//           detail: t.detail,
//         });
//       },
//       setIconStyle() {
//         const {
//           name: t,
//           color: e,
//           size: o,
//           classPrefix: i,
//         } = this;
//         const s = -1 !== t.indexOf('/');
//         const n = addUnit(o);
//         const r = e ? {
//           color: e,
//         } : {};
//         const c = o ? {
//           'font-size': n,
//         } : {};
//         const a = Object.assign(Object.assign({}, r), c);
//         this.setData({
//           isImage: s,
//         }, () => __awaiter(this, void 0, void 0, function* () {
//           if (s) {
//             let t = n;
//             t || (yield getRect(this, `.${i}`).then((e) => {
//               t = addUnit(null == e ? void 0 : e.height);
//             })
//               .catch(() => {}));
//             a.width = t;
//             a.height = t;
//           }
//           this.setData({
//             iconStyle: `${styles(a)}`,
//           });
//         }));
//       },
//     };
//   }
//   setData() {}
// };
// Icon = initTDesign(__decorate([wxComponent()], Icon));
// export default Icon;
</script>
<style>
@import './icon.css';
</style>
