<template>
  <view
    :style="_._style([style, customStyle])"
    :class="_.cls(classPrefix, [layout, ['readonly', readonly], sequence]) + ' class ' + tClass"
  >
    <slot />
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-steps`;


export default uniComponent({
  name,
  controlledProps: [
    {
      key: 'current',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
  ],
  mixins: [ParentMixin(RELATION_MAP.StepItem)],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      _,

      dataCurrent: this.current,
    };
  },
  watch: {
    current: {
      handler(v) {
        this.dataCurrent = v;
      },
      immediate: true,
    },
    dataCurrent: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    theme: 'updateChildren',
    sequence: 'updateChildren',
  },
  mounted() {

  },
  methods: {
    innerAfterLinked(child) {
      this.updateChildren();

      const { readonly } = this;

      child.readonly = readonly;
    },
    innerAfterUnlinked() {
      this.updateLastChid();
    },
    updateChildren() {
      const items = this.children;
      const {
        dataCurrent, currentStatus, theme, layout, sequence,
      } = this;

      items?.forEach((item, index) => {
        item.updateStatus({
          index,
          items,

          current: dataCurrent,
          currentStatus,
          theme,
          layout,
          sequence,
        });
      });
    },
    updateLastChid() {
      const items = this.children;

      items.forEach((child, index) => child.isLastChild = index === items.length - 1);
    },
    handleClick(index) {
      if (!this.readonly) {
        const preIndex = this.dataCurrent;
        this._trigger('change', {
          previous: preIndex,
          current: index,
        });
      }
    },
  },
});

// let Steps = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.relations = {
//       '../step-item/step-item': {
//         type: 'child',
//         linked(e) {
//           this.updateChildren();
//           const {
//             readonly: t,
//           } = this;
//           e.setData({
//             readonly: t,
//           });
//         },
//         unlinked() {
//           this.updateLastChid();
//         },
//       },
//     };
//     this.externalClasses = [`${prefix}-class`];
//     this.properties = props;
//     this.controlledProps = [{
//       key: 'current',
//       event: 'change',
//     }];
//     this.setData({
//       prefix,
//       classPrefix: name,
//     });
//     this.observers = {
//       'current, theme, sequence'() {
//         this.updateChildren();
//       },
//     };
//     this.methods = {
//       updateChildren() {
//         const e = this.$children;
//         e.forEach((t, s) => {
//           t.updateStatus(Object.assign({
//             index: s,
//             items: e,
//           }, this));
//         });
//       },
//       updateLastChid() {
//         const e = this.$children;
//         e.forEach((t, s) => t.setData({
//           isLastChild: s === e.length - 1,
//         }));
//       },
//       handleClick(e) {
//         if (!this.readonly) {
//           const t = this.current;
//           this._trigger('change', {
//             previous: t,
//             current: e,
//           });
//         }
//       },
//     };
//   }
// };
// Steps = __decorate([wxComponent()], Steps);
// export default Steps;
</script>
<style>
@import './steps.css';
</style>
