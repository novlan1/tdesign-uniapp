<template>
  <view
    :style="_._style([style, customStyle])"
    :class="[
      'class ' + classPrefix + ' ' + classPrefix + '--' + placement,
      tClass
    ]"
  >
    <view
      :class="classPrefix + '__title'"
      aria-role="button"
      :aria-expanded="expanded"
      :aria-disabled="ultimateDisabled"
      @tap="onClick"
    >
      <t-cell
        :title="header"
        :note="headerRightContent"
        bordered
        :left-icon="headerLeftIcon"
        :right-icon="ultimateExpandIcon ? (expanded ? 'chevron-up' : 'chevron-down') : ''"
        :t-class="_.cls(classPrefix + '__header', [placement, ['expanded', expanded]]) + ' ' + tClassHeader"
        :t-class-title="'class-title ' + (ultimateDisabled ? 'class-title--disabled' : '')"
        :t-class-note="'class-note ' + (ultimateDisabled ? 'class-note--disabled' : '')"
        :t-class-right-icon="'class-right-icon ' + classPrefix + '__arrow--' + placement + ' ' + (ultimateDisabled ? 'class-right-icon--disabled' : '')"
        t-class-hover="class-header-hover"
      >
        <template
          #left-icon
        >
          <slot
            name="header-left-icon"
          />
        </template>
        <template
          #title
        >
          <slot
            name="header"
          />
        </template>
        <template
          #note
        >
          <slot
            name="header-right-content"
          />
        </template>
        <template
          #right-icon
        >
          <slot
            name="expand-icon"
          />
        </template>
      </t-cell>
    </view>
    <view
      :class="classPrefix + '__wrapper'"
      :animation="animation"
      :aria-hidden="expanded ? '' : true"
    >
      <view :class="_.cls(classPrefix + '__content', [['disabled', ultimateDisabled], ['expanded', expanded], placement]) + ' ' + tClassContent">
        {{ content }}
        <slot />
        <slot name="content" />
      </view>
    </view>
  </view>
</template>
<script>
import tCell from '../cell/cell';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { getRect } from '../common/utils';
import _ from '../common/utils.wxs';
import { ChildrenMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-collapse-panel`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-content`,
    `${prefix}-class-header`,
  ],
  mixins: [ChildrenMixin(RELATION_MAP.CollapsePanel)],
  components: {
    tCell,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      expanded: false,
      classPrefix: name,
      classBasePrefix: prefix,
      ultimateExpandIcon: false,
      ultimateDisabled: false,
      _,
      animation: null,
    };
  },
  watch: {
    disabled: {
      handler(e) {
        this.ultimateDisabled = !!e;
      },
      immediate: true,
    },
  },
  methods: {
    updateExpanded(activeValues = []) {
      if (!this[RELATION_MAP.CollapsePanel]) {
        return;
      }

      const { value } = this;
      const { defaultExpandAll } = this[RELATION_MAP.CollapsePanel];
      const expanded = defaultExpandAll ? !this.expanded : activeValues.includes(value);

      if (expanded === this.expanded) return;

      this.expanded = expanded;
      this.updateStyle(expanded);
    },

    updateStyle(expanded) {
      return getRect(this, `.${name}__content`)
        .then(rect => rect.height)
        .then((height) => {
          const animation = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease-in-out',
          });

          if (expanded) {
            animation.height(height).top(0)
              .step({ duration: 300 })
              .height('auto')
              .step();
          } else {
            animation.height(height).top(1)
              .step({ duration: 1 })
              .height(0)
              .step({ duration: 300 });
          }

          this.animation =  animation.export();
        });
    },

    onClick() {
      const { ultimateDisabled } = this;
      const { value } = this;

      if (ultimateDisabled) return;

      if (this[RELATION_MAP.CollapsePanel].defaultExpandAll) {
        this.updateExpanded();
      } else {
        this[RELATION_MAP.CollapsePanel].switch(value);
      }
    },

    innerAfterLinked() {
      const { value, expandIcon, disabled } =  this[RELATION_MAP.CollapsePanel];

      this.ultimateExpandIcon = this.expandIcon == null ? expandIcon : this.expandIcon;
      this.ultimateDisabled = this.disabled == null ? disabled : this.disabled;

      this.updateExpanded(value);
    },
  },
});


// let CollapsePanel = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-header`];
//     this.options = {
//       multipleSlots: true,
//     };
//     this.components = {
//       tCell,
//     };
//     this.relationCallbacks = {
//       mounted() {
//         const {
//           value: t,
//           expandIcon: a,
//           disabled: s,
//         } = this[this.relationParentName];
//         this.setData({
//           ultimateExpandIcon: null == this.expandIcon ? a : this.expandIcon,
//           ultimateDisabled: null == this.disabled ? s : this.disabled,
//         });
//         this.updateExpanded(t);
//       },
//     };
//     this.relations = {
//       '../collapse/collapse': {
//         type: 'ancestor',
//         // linked(e) {
//         //   const {
//         //     value: t,
//         //     expandIcon: a,
//         //     disabled: s
//         //   } = e.properties;
//         //   this.setData({
//         //     ultimateExpandIcon: null == this.expandIcon ? a : this.expandIcon,
//         //     ultimateDisabled: null == this.disabled ? s : this.disabled
//         //   });
//         //   this.updateExpanded(t);
//         // }
//       },
//     };
//     this.name = 'TCollapsePanel';
//     this.properties = props;
//     this._ = _;
//     this.setData({
//       prefix,
//       expanded: false,
//       classPrefix: name,
//       classBasePrefix: prefix,
//       ultimateExpandIcon: false,
//       ultimateDisabled: false,
//     });
//     this.observers = {
//       disabled(e) {
//         this.setData({
//           ultimateDisabled: !!e,
//         });
//       },
//     };
//     this.methods = {

//     };
//   }
// };
// CollapsePanel = initTDesign(__decorate([wxComponent()], CollapsePanel));


// export default CollapsePanel;
</script>
<style>
@import './collapse-panel.css';
</style>
