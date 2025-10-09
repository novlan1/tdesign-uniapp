<template>
  <view
    v-if="!lazy || hasActivated"
    :id="id"
    :class="'class ' + tClass + ' ' + classPrefix + ' ' + (active ? classPrefix + '--active' : classPrefix + '--inactive')"
    :style="_._style([style, customStyle, hide ? 'display: none' : ''])"
    aria-role="tabpanel"
  >
    <view v-if="panel">
      {{ panel }}
    </view>
    <slot />
    <slot name="panel" />
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import props from './props';
import { prefix } from '../common/config';
import _ from '../common/utils.wxs';
import { ChildrenMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-tab-panel`;

export default uniComponent({
  name,
  externalClasses: [`${prefix}-class`],
  mixins: [ChildrenMixin(RELATION_MAP.TabPanel)],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      active: false,
      hide: true,
      id: '',
      hasActivated: false,
      _,
    };
  },
  watch: {
    'label, badgeProps, disabled, icon, panel, value, lazy'() {
      this.update();
    },
  },
  methods: {
    setId(id) {
      this.setData({ id });
    },
    getComputedName() {
      if (this.properties.value != null) {
        return `${this.properties.value}`;
      }
      return `${this.index}`;
    },
    update() {
      this.$parent?.updateTabs();
    },

    render(active, parent) {
      this.initialized = this.initialized || active;

      if (active && !this.data.hasActivated) {
        this.setData({ hasActivated: true });
      }

      this.setData({
        active,
        hide: !parent.data.animation && !active,
      });
    },
  },
});

// let TabPanel = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`];
//     this.relations = {
//       "../tabs/tabs": {
//         type: "ancestor"
//       }
//     };
//     this.options = {
//       multipleSlots: true
//     };
//     this.properties = props;;
//     this.setData({
//       prefix: prefix,
//       classPrefix: name,
//       active: false,
//       hide: true,
//       id: "",
//       hasActivated: false
//     });
//     this.observers = {
//       "label, badgeProps, disabled, icon, panel, value, lazy"() {
//         this.update();
//       }
//     };
//   }
//   setId(e) {
//     this.setData({
//       id: e
//     });
//   }
//   getComputedName() {
//     return null != this.value ? `${this.value}` : `${this.index}`;
//   }
//   update() {
//     var e;
//     null === (e = this.$parent) || void 0 === e || e.updateTabs();
//   }
//   render(e, t) {
//     this.initialized = this.initialized || e;
//     if (e && !this.hasActivated) {
//       this.setData({
//         hasActivated: true
//       });
//     }
//     this.setData({
//       active: e,
//       hide: !t.data.animation && !e
//     });
//   }
// };
// TabPanel = __decorate([wxComponent()], TabPanel);
// export default TabPanel;
</script>
<style>
@import './tab-panel.css';
</style>
