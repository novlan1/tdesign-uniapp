<template>
  <view
    :class="classPrefix + ' class ' + prefix + '-class'"
    :style="_._style(['z-index:' + zIndex, containerStyle, style, customStyle])"
  >
    <view
      :class="classPrefix + '__content ' + prefix + '-class-content'"
      :style="_._style(['z-index:' + zIndex, contentStyle])"
    >
      <slot />
    </view>
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import props from './props';
import { prefix } from '../common/config';
import pageScrollMixin from '../mixins/page-scroll';
import { getRect } from '../common/utils';
import _ from '../common/utils.wxs';


const name = `${prefix}-sticky`;
const ContainerClass = `.${name}`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-content`,
  ],
  mixins: [pageScrollMixin()],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      containerStyle: '',
      contentStyle: '',
      _,
    };
  },
  watch: {
    offsetTop: 'onScroll',
    disabled: 'onScroll',
    container: 'onScroll',
  },
  mounted() {
    this.onScroll();
  },
  methods: {
    onScroll(event) {
      const { scrollTop } = event || {};
      const { container, offsetTop, disabled } = this;

      if (disabled) {
        this.setDataAfterDiff({
          isFixed: false,
          transform: 0,
        });
        return;
      }

      this.scrollTop = scrollTop || this.scrollTop;

      if (typeof container === 'function') {
        Promise.all([getRect(this, ContainerClass), this.getContainerRect()]).then(([root, container]) => {
          if (!root || !container) return;
          if (offsetTop + root.height > container.height + container.top) {
            this.setDataAfterDiff({
              isFixed: false,
              transform: container.height - root.height,
            });
          } else if (offsetTop >= root.top) {
            this.setDataAfterDiff({
              isFixed: true,
              height: root.height,
              transform: 0,
            });
          } else {
            this.setDataAfterDiff({ isFixed: false, transform: 0 });
          }
        });

        return;
      }

      getRect(this, ContainerClass).then((root) => {
        if (!root) return;
        if (offsetTop >= root.top) {
          this.setDataAfterDiff({ isFixed: true, height: root.height });
          this.transform = 0;
        } else {
          this.setDataAfterDiff({ isFixed: false });
        }
      });
    },

    setDataAfterDiff(data) {
      const { offsetTop } = this;
      const { containerStyle: prevContainerStyle, contentStyle: prevContentStyle } = this;
      const { isFixed, height, transform } = data;
      this.$nextTick(() => {
        let containerStyle = '';
        let contentStyle = '';

        if (isFixed) {
          containerStyle += `height:${height}px;`;
          contentStyle += `position:fixed;top:${offsetTop}px;left:0;right:0;`;
        }
        if (transform) {
          const translate = `translate3d(0, ${transform}px, 0)`;
          contentStyle += `-webkit-transform:${translate};transform:${translate};`;
        }

        if (prevContainerStyle !== containerStyle || prevContentStyle !== contentStyle) {
          this.containerStyle = containerStyle;
          this.contentStyle = contentStyle;
        }

        this.$emit('scroll', {
          scrollTop: this.scrollTop,
          isFixed,
        });
      });
    },

    getContainerRect() {
      const nodesRef = this.container();
      return new Promise(resolve => nodesRef.boundingClientRect(resolve).exec());
    },
  },
});


// let Sticky = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`];
//     this.properties = props;
//     this.behaviors = [pageScrollMixin()];
//     this.observers = {
//       'offsetTop, disabled, container'() {
//         this.onScroll();
//       },
//     };
//     this.setData({
//       prefix,
//       classPrefix: name,
//       containerStyle: '',
//       contentStyle: '',
//     });
//     this.methods = {
//       onScroll(t) {
//         const {
//           scrollTop: e,
//         } = t || {};
//         const {
//           container: i,
//           offsetTop: o,
//           disabled: s,
//         } = this;
//         if (s) {
//           this.setDataAfterDiff({
//             isFixed: false,
//             transform: 0,
//           });
//         } else {
//           this.scrollTop = e || this.scrollTop;
//           if ('function' !== typeof i) {
//             getRect(this, ContainerClass).then((t) => {
//               if (t) {
//                 if (o >= t.top) {
//                   this.setDataAfterDiff({
//                     isFixed: true,
//                     height: t.height,
//                   }), this.transform = 0;
//                 } else {
//                   this.setDataAfterDiff({
//                     isFixed: false,
//                   });
//                 }
//               }
//             });
//           } else {
//             Promise.all([getRect(this, ContainerClass), this.getContainerRect()]).then(([t, e]) => {
//               if (t && e) {
//                 o + t.height > e.height + e.top ? this.setDataAfterDiff({
//                   isFixed: false,
//                   transform: e.height - t.height,
//                 }) : o >= t.top ? this.setDataAfterDiff({
//                   isFixed: true,
//                   height: t.height,
//                   transform: 0,
//                 }) : this.setDataAfterDiff({
//                   isFixed: false,
//                   transform: 0,
//                 });
//               }
//             });
//           }
//         }
//       },
//       setDataAfterDiff(t) {
//         const {
//           offsetTop: e,
//         } = this;
//         const {
//           containerStyle: i,
//           contentStyle: o,
//         } = this;
//         const {
//           isFixed: s,
//           height: r,
//           transform: n,
//         } = t;
//         this.$nextTick(() => {
//           let t = '';
//           let a = '';
//           if (s) {
//             t += `height:${r}px;`;
//             a += `position:fixed;top:${e}px;left:0;right:0;`;
//           }
//           if (n) {
//             const t = `translate3d(0, ${n}px, 0)`;
//             a += `-webkit-transform:${t};transform:${t};`;
//           }
//           i === t && o === a || this.setData({
//             containerStyle: t,
//             contentStyle: a,
//           });
//           this.$emit('scroll', {
//             detail: {
//               scrollTop: this.scrollTop,
//               isFixed: s,
//             },
//           });
//         });
//       },
//       getContainerRect() {
//         const t = this.container();
//         return new Promise(e => t.boundingClientRect(e).exec());
//       },
//     };
//   }
//   ready() {
//     this.onScroll();
//   }
// };
// Sticky = __decorate([wxComponent()], Sticky);
// export default Sticky;
</script>
<style>
@import './sticky.css';
</style>
