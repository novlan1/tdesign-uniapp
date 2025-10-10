<template>
  <view
    :style="_._style([style, customStyle])"
    :class="_.cls(classPrefix, [['border', bordered], ['fixed', fixed], ['safe', safeAreaInsetBottom], shape]) + ' class ' + tClass"
    aria-role="tablist"
  >
    <slot />
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { ParentMixin, RELATION_MAP } from '../common/relation';
import _ from '../common/utils.wxs';

const classPrefix = `${prefix}-tab-bar`;


export default uniComponent({
  name: classPrefix,
  controlledProps: [{
    key: 'value',
    event: 'change',
  }],
  externalClasses: [`${prefix}-class`],
  mixins: [ParentMixin(RELATION_MAP.TabBarItem)],
  props: {
    ...props,
  },
  emits: [
    'change',
  ],
  data() {
    return {
      prefix,
      classPrefix,
      _,

      dataValue: this.value ?? this.defaultValue,
    };
  },
  watch: {
    value: {
      handler(e) {
        this.dataValue = e;
      },
      immediate: true,
    },
    dataValue: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
  },
  mounted() {
    this.showChildren();
  },
  methods: {
    showChildren() {
      const { dataValue } = this;

      this.children.forEach((child) => {
        this.crowded = this.children.length > 3;

        if (child.value === dataValue) {
          child.showSpread();
        }
      });
    },

    updateChildren() {
      const { dataValue } = this;

      this.children?.forEach((child) => {
        child.checkActive(dataValue);
      });
    },

    updateValue(value) {
      this._trigger('change', { value });
    },

    changeOtherSpread(value) {
      this.children.forEach((child) => {
        if (child.value !== value) {
          child.closeSpread();
        }
      });
    },

    initName() {
      return (this.backupValue += 1);
    },
  },
});


// let Tabbar = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.relations = {
//       '../tab-bar-item/tab-bar-item': {
//         type: 'descendant'
//       },
//     };
//     this.externalClasses = [`${prefix}-class`];
//     this.backupValue = -1;
//     this.setData({
//       prefix,
//       classPrefix
//     });
//     this.properties = props;
//     this.controlledProps = [{
//       key: 'value',
//       event: 'change'
//     }];
//     this.observers = {
//       value() {
//         this.updateChildren();
//       },
//     };
//     this.lifetimes = {
//       ready() {
//         this.showChildren();
//       },
//     };
//     this.methods = {
//       showChildren() {
//         const {
//           value: e,
//         } = this;
//         this.$children.forEach((r) => {
//           r.setData({
//             crowded: this.$children.length > 3,
//           });
//           if (r.properties.value === e) {
//             r.showSpread();
//           }
//         });
//       },
//       updateChildren() {
//         const {
//           value: e,
//         } = this;
//         this.$children.forEach((r) => {
//           r.checkActive(e);
//         });
//       },
//       updateValue(e) {
//         this._trigger('change', {
//           value: e,
//         });
//       },
//       changeOtherSpread(e) {
//         this.$children.forEach((r) => {
//           if (r.properties.value !== e) {
//             r.closeSpread();
//           }
//         });
//       },
//       initName() {
//         return this.backupValue += 1;
//       },
//     };
//   }
// };
// Tabbar = __decorate([wxComponent()], Tabbar);
// export default Tabbar;
</script>
<style>
@import './tab-bar.css';
</style>
