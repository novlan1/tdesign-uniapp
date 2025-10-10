<template>
  <view
    :id="tId"
    :class="
      _.cls(classPrefix, [
        ['active', active],
        ['disabled', disabled]
      ]) +
        ' class ' +
        tClass
    "
    :style="_._style([style, customStyle])"
    aria-role="button"
    :aria-label="
      ariaLabel ||
        (badgeProps.dot || badgeProps.count ? (active ? '已选中，' + label + _.getBadgeAriaLabel({ ...badgeProps }) : label + _.getBadgeAriaLabel({ ...badgeProps })) : '')
    "
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <block v-if="active">
      <view :class="classPrefix + '__line'" />
      <view :class="classPrefix + '__prefix'" />
      <view :class="classPrefix + '__suffix'" />
    </block>
    <!-- parse <template v-if="_icon" is="icon" :data="tClass: classPrefix + '__icon', ..._icon"/> -->
    <block
      v-if="_icon"
      name="icon"
    >
      <t-icon
        :custom-style="_icon.style || ''"
        :t-class="classPrefix + '__icon'"
        :prefix="_icon.prefix"
        :name="_icon.name"
        :size="_icon.size"
        :color="_icon.color"
        :aria-hidden="!!_icon.ariaHidden"
        :aria-label="_icon.ariaLabel"
        :aria-role="_icon.ariaRole"
        @click="_icon.click || ''"
      />
    </block>
    <block v-if="badgeProps">
      <!-- parse <template is="badge" :data="...badgeProps, content: label"/> -->
      <t-badge
        :color="badgeProps.color"
        :content="label"
        :count="badgeProps.count"
        :dot="badgeProps.dot"
        :max-count="badgeProps.maxCount"
        :offset="badgeProps.offset"
        :shape="badgeProps.shape"
        :show-zero="badgeProps.showZero"
        :size="badgeProps.size"
        :t-class="badgeProps.tClass"
        :t-class-content="badgeProps.tClassContent"
        :t-class-count="badgeProps.tClassCount"
      />
    </block>
    <block v-else>
      {{ label }}
    </block>
  </view>
</template>
<script>
import tBadge from '../badge/badge';
import tIcon from '../icon/icon';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { ChildrenMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-side-bar-item`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
  ],
  mixins: [ChildrenMixin(RELATION_MAP.SideBarItem)],
  components: {
    tBadge,
    tIcon,
  },
  props: {
    ...props,
    tId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      classPrefix: name,
      prefix,
      active: false,
      isPre: false,
      isNext: false,
      _,
    };
  },
  watch: {
    icon: {
      handler(v) {
        this._icon = typeof v === 'string' ? { name: v } : v;
      },
      immediate: true,
    },
  },
  mounted() {

  },
  methods: {
    innerAfterLinked() {
      const parent = this[RELATION_MAP.SideBarItem];
      this.updateActive(parent.dataValue);
    },
    updateActive(value) {
      const active = value === this.value;
      this.active = active;
    },
    handleClick() {
      if (this.disabled) return;
      const { value, label } = this;

      this[RELATION_MAP.SideBarItem]?.doChange({ value, label });
    },
  },
});


// let SideBarItem = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`];
//     // this = Object.assign(Object.assign({}, props), {
//     //   tId: {
//     //     type: String,
//     //   },
//     // });
//     this.relations = {
//       '../side-bar/side-bar': {
//         type: 'parent',
//         linked(e) {
//           this.parent = e;
//           this.updateActive(e.data.value);
//         },
//       },
//     };
//     this.observers = {
//       icon(e) {
//         this.setData({
//           _icon: 'string' === typeof e ? {
//             name: e,
//           } : e,
//         });
//       },
//     };
//     this.setData({
//       classPrefix: name,
//       prefix,
//       active: false,
//       isPre: false,
//       isNext: false,
//     });
//     this.methods = {
//       updateActive(e) {
//         const t = e === this.value;
//         this.setData({
//           active: t,
//         });
//       },
//       handleClick() {
//         let e;
//         if (this.disabled) {
//           return;
//         }
//         const {
//           value: t,
//           label: i,
//         } = this;
//         null === (e = this.parent) || void 0 === e || e.doChange({
//           value: t,
//           label: i,
//         });
//       },
//     };
//   }
// };
// SideBarItem = __decorate([wxComponent()], SideBarItem);
// export default SideBarItem;
</script>
<style>
@import './side-bar-item.css';

</style>
