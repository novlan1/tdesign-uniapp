<template>
  <view
    id="t-bar"
    :style="_._style([style, customStyle])"
    :class="classPrefix + ' class ' + prefix + '-class'"
    @touchmove.stop.prevent="parseEventDynamicCode($event, activeIdx === -1 ? '' : 'noop')"
  >
    <view
      v-for="(item, index) in menus"
      :key="index"
      :data-index="index"
      :class="
        _.cls(classPrefix + '__item', [
          ['active', activeIdx == index],
          ['disabled', item.disabled],
          [index, true]
        ]) +
          ' ' +
          prefix +
          '-class-item'
      "
      :aria-disabled="item.disabled"
      aria-role="button"
      :aria-expanded="activeIdx === index"
      aria-haspopup="menu"
      @tap="handleToggle"
    >
      <view :class="classPrefix + '__title ' + prefix + '-class-label'">
        {{ item.label }}
      </view>

      <!-- parse <template is="icon" :data="..._arrowIcon, ariaHidden: true, tClass: classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"/> -->
      <block
        v-if="_arrowIcon"
        name="icon"
      >
        <t-icon
          :custom-style="_arrowIcon.style || ''"
          :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
          :prefix="_arrowIcon.prefix"
          :name="_arrowIcon.name"
          :size="_arrowIcon.size"
          :color="_arrowIcon.color"
          :aria-hidden="true"
          :aria-label="_arrowIcon.ariaLabel"
          :aria-role="_arrowIcon.ariaRole"
          @click="_arrowIcon.click || ''"
        />
      </block>
    </view>
    <slot />
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { calcIcon } from '../common/utils';
import _ from '../common/utils.wxs';
import { ParentMixin, RELATION_MAP } from '../common/relation';
import { parseEventDynamicCode } from '../common/event/dynamic';


const name = `${prefix}-dropdown-menu`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-item`,
    `${prefix}-class-label`,
    `${prefix}-class-icon`,
  ],
  mixins: [ParentMixin(RELATION_MAP.DropdownItem)],
  components: {
    tIcon,
  },
  props: {
    ...props,
  },
  emits: ['close', 'open'],
  data() {
    return {
      prefix,
      classPrefix: name,
      menus: null,
      activeIdx: -1,
      bottom: 0,
      _arrowIcon: {
        name: props.arrowIcon.default,
      },
      _,
    };
  },
  watch: {
    arrowIcon: {
      handler(v) {
        this._arrowIcon = calcIcon(v);
      },
      immediate: true,
    },

    activeIdx(v) {
      this.$emit(v === -1 ? 'close' : 'open');
    },
  },
  mounted() {
    this.getAllItems();
  },
  methods: {
    parseEventDynamicCode,
    toggle(index) {
      const { activeIdx, duration } = this;
      const prevItem = this.children[activeIdx];
      const currItem = this.children[index];

      if (currItem?.disabled) return;

      if (activeIdx !== -1) {
        prevItem.$emit('close');
        prevItem.show = true;

        // prevItem.setData(
        //   {
        //     show: false,
        //   },
        //   () => {
        setTimeout(() => {
          prevItem.$emit('closed');
        }, duration);
        //   },
        // );
      }

      if (index == null || activeIdx === index) {
        this.activeIdx = -1;
      } else {
        currItem.$emit('open');
        this.activeIdx = index;

        currItem.show = true;
        // currItem.setData(
        //   {
        //     show: true,
        //   },
        //   () => {
        setTimeout(() => {
          currItem.$emit('opened');
        }, duration);
        //   },
        // );
      }
    },
    getAllItems() {
      console.log('cccc', this.children);
      const menus = this.children?.map(data => ({
        label: data.label || data.computedLabel,
        disabled: data.disabled,
      }));

      this.menus = menus;
    },
    handleToggle(e) {
      const { index } = e.currentTarget.dataset;

      this.toggle(index);
    },

    noop() {},
  },
});


// let DropdownMenu = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-item`, `${prefix}-class-label`, `${prefix}-class-icon`];
//     this.properties = props;;
//     this.nodes = null;
//     this.setData({
//       prefix: prefix,
//       classPrefix: name,
//       menus: null,
//       activeIdx: -1,
//       bottom: 0,
//       _arrowIcon: {
//         name: props.arrowIcon.value
//       },
//       nodes: null,
//     });
//     this.relations = {
//       "../dropdown-item/dropdown-item": {
//         type: "child"
//       }
//     };
//     this.lifetimes = {
//       ready() {
//         this.getAllItems();
//       }
//     };
//     this.observers = {
//       arrowIcon(e) {
//         this.setData({
//           _arrowIcon: calcIcon(e)
//         });
//       },
//       activeIdx(e) {
//         this.$emit(-1 === e ? "close" : "open");
//       }
//     };
//     this.methods = {
//       toggle(e) {
//         const {
//           activeIdx: t,
//           duration: o
//         } = this;
//         const s = this.$children[t];
//         const r = this.$children[e];
//         (null == r ? void 0 : r.data.disabled) || (-1 !== t && (s.$emit("close"), s.setData({
//           show: false
//         }, () => {
//           setTimeout(() => {
//             s.$emit("closed");
//           }, o);
//         })), null == e || t === e ? this.setData({
//           activeIdx: -1
//         }) : (r.$emit("open"), this.setData({
//           activeIdx: e
//         }), r.setData({
//           show: true
//         }, () => {
//           setTimeout(() => {
//             r.$emit("opened");
//           }, o);
//         })));
//       },
//       getAllItems() {
//         const e = this.$children.map(({
//           data: e
//         }) => ({
//           label: e.label || e.computedLabel,
//           disabled: e.disabled
//         }));
//         this.setData({
//           menus: e
//         });
//       },
//       handleToggle(e) {
//         const {
//           index: t
//         } = e.currentTarget.dataset;
//         this.toggle(t);
//       },
//       noop() {}
//     };
//   }
// };
// DropdownMenu = __decorate([wxComponent()], DropdownMenu);
// export default DropdownMenu;
</script>
<style>
@import './dropdown-menu.css';

</style>
