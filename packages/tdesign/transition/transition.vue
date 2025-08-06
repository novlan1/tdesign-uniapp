<template>
    <view
        :class="'class ' + prefix + '-class ' + classPrefix + ' ' + transitionClass"
        :style="_._style([visible ? '' : 'display: none', style, customStyle])"
        @transitionend="onTransitionEnd"
    >
        <slot />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from '@/miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import transition from '../mixins/transition';
import config from '../common/config';
const { prefix: prefix } = config;
const name = `${prefix}-transition`;
let Transition = class extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.behaviors = [transition()];
        this.setData({
            classPrefix: name
        });
    }
};
Transition = __decorate([wxComponent()], Transition);
export default Transition;
</script>
<style>
@import './transition.css';
</style>
