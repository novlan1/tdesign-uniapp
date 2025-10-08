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
  controlledProps: [
    {
      key: 'value',
      event: 'change',
    },
  ],
  data() {
    return {
      prefix,
      classPrefix: name,
      _,
      border: false,
      dataValue: this.value,
    };
  },
  watch: {
    value: {
      handler(value) {
        this.dataValue = value;
      },
      immediate: true,
    },
    dataValue: {
      handler() {
        this.updateExpanded();
      },
      immediate: true,
      deep: true,
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
        e.updateExpanded(this.dataValue);
      });
    },
    switch(panelValue) {
      const { expandMutex, dataValue: activeValues } = this;

      let value = [];
      const hit = activeValues?.indexOf(panelValue);

      if (hit > -1) {
        value = activeValues.filter(item => item !== panelValue);
      } else {
        value = expandMutex ? [panelValue] : activeValues.concat(panelValue);
      }

      this._trigger('change', { value });
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
