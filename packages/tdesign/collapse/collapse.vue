<template>
  <view
    :style="_._style([style, customStyle])"
    :class="[
      'class ',
      tClass,
      _.cls(classPrefix, [['hairline--top-bottom', border], theme])
    ]"
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


const name = `${prefix}-collapse`;


export default uniComponent({
  name,
  externalClasses: [`${prefix}-class`],
  mixins: [ParentMixin(RELATION_MAP.CollapsePanel)],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      _,
      border: false,
    };
  },
  watch: {
    value: {
      handler() {
        this.updateExpanded();
      },
      immediate: true,
    },
    expandMutex: {
      handler() {
        this.updateExpanded();
      },
      immediate: true,
    },

  },
  methods: {
    updateExpanded() {
      this.children?.forEach((e) => {
        e.updateExpanded(this.value);
      });
    },
    switch(e) {
      const {
        expandMutex: t,
        value: o,
      } = this;
      let p = [];
      p = o.indexOf(e) > -1 ? o.filter(t => t !== e) : t ? [e] : o.concat(e);
      this._trigger('change', {
        value: p,
      });
    },
  },
});


// let Collapse = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`];
//     this.relations = {
//       '../collapse-panel/collapse-panel': {
//         type: 'descendant',
//       },
//     };
//     this.name = 'TCollapse';
//     this.controlledProps = [{
//       key: 'value',
//       event: 'change',
//     }];
//     this.properties = props;
//     this._ = _;
//     this.setData({
//       prefix,
//       classPrefix: name,
//     });
//     this.observers = {
//       'value,expandMutex'() {
//         this.updateExpanded();
//       },
//     };
//     this.methods = {

//     };
//   }
// };
// Collapse = initTDesign(__decorate([wxComponent()], Collapse));

// export default Collapse;
</script>
<style>
@import './collapse.css';
</style>
