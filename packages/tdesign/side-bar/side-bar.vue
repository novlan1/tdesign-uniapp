<template>
  <view
    :class="classPrefix + ' class ' + tClass"
    :style="_._style([style, customStyle])"
  >
    <slot />
    <view :class="classPrefix + '__padding'" />
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-side-bar`;

export default uniComponent({
  name,
  controlledProps: [
    {
      key: 'value',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
  ],
  mixins: [ParentMixin(RELATION_MAP.SideBarItem)],
  props: {
    ...props,
  },
  emits: [
    'click',
    'change',
  ],
  data() {
    return {
      classPrefix: name,
      prefix,
      _,
      dataValue: this.value,
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
      handler(v) {
        this.children?.forEach((item) => {
          item.updateActive(v);
        });
      },
      immediate: true,
    },
  },
  methods: {
    innerAfterUnLinked(child) {
      const index = this.children.findIndex(item => item === child);
      this.children.splice(index, 1);
    },
    doChange({ value, label }) {
      this._trigger('change', { value, label });
    },
  },
});

// let SideBar = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`];
//     this.children = [];
//     this.relations = {
//       [relationsPath]: {
//         type: 'child',
//         linked(e) {
//           this.children.push(e);
//         },
//         unlinked(e) {
//           const i = this.children.findIndex(i => i === e);
//           this.children.splice(i, 1);
//         },
//       },
//     };
//     this.controlledProps = [{
//       key: 'value',
//       event: 'change',
//     }];
//     this.properties = props;
//     this.observers = {
//       value(e) {
//         this.$children.forEach((i) => {
//           i.updateActive(e);
//         });
//       },
//     };
//     this.setData({
//       classPrefix: name,
//       prefix,
//     });
//     this.methods = {
//       doChange({
//         value: e,
//         label: i,
//       }) {
//         this._trigger('change', {
//           value: e,
//           label: i,
//         });
//       },
//     };
//   }
// };
// SideBar = __decorate([wxComponent()], SideBar);
// export default SideBar;
</script>
<style>
@import './side-bar.css';
</style>
