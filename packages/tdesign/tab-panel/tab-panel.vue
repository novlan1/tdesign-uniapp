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
      this.id = id;
    },
    getComputedName() {
      if (this.value != null) {
        return `${this.value}`;
      }
      return `${this.dataIndex}`;
    },
    update() {
      this.$parent?.updateTabs();
    },

    render(active, parent) {
      this.initialized = this.initialized || active;

      if (active && !this.hasActivated) {
        this.hasActivated = true;
      }

      this.active = active;
      this.hide = !parent.animation && !active;
    },
  },
});
</script>
<style scoped >
@import './tab-panel.css';
</style>
