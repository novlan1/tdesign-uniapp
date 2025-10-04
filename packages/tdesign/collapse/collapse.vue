<template>
  <view
    :style="_._style([style, customStyle])"
    :class="'class ' + prefix + '-class ' + _.cls(classPrefix, [['hairline--top-bottom', border], theme])"
  >
    <slot />
  </view>
</template>
<script>
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-collapse`;
let Collapse = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.relations = {
      '../collapse-panel/collapse-panel': {
        type: 'descendant',
      },
    };
    this.name = 'TCollapse';
    this.controlledProps = [{
      key: 'value',
      event: 'change',
    }];
    this.properties = props;
    this._ = _;
    this.setData({
      prefix,
      classPrefix: name,
    });
    this.observers = {
      'value,expandMutex'() {
        this.updateExpanded();
      },
    };
    this.methods = {
      updateExpanded() {
        this.children.forEach((e) => {
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
    };
  }
};
Collapse = initTDesign(__decorate([wxComponent()], Collapse));

export default Collapse;
</script>
<style>
@import './collapse.css';
</style>
