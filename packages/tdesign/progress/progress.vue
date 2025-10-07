<template>
  <view
    :style="_._style([style, customStyle])"
    :class="classPrefix + ' class'"
  >
    <view
      v-if="theme === PRO_THEME.LINE"
      :class="classPrefix + '--thin ' + classPrefix + '--status--' + (status || computedStatus) + ' ' + prefix + '-class'"
    >
      <view
        aria-role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="computedProgress"
        :aria-label="ariaLabel || (isIOS ? getIOSAriaLabel(status) : getAndroidAriaLabel(status))"
        aria-live="polite"
        :class="classPrefix + '__bar'"
        :style="'height: ' + heightBar + 'px;border-radius: ' + heightBar + 'px;background-color: ' + bgColorBar"
      >
        <view
          :class="classPrefix + '__inner ' + prefix + '-class-bar'"
          :style="'background: ' + colorBar + '; width: ' + (computedProgress + '%')"
        />
      </view>
      <view
        v-if="label"
        :class="classPrefix + '__info ' + prefix + '-class-label'"
        :aria-hidden="true"
      >
        <!-- parse <template v-if="_.includes(STATUS, status)" is="icon" :data="tClass: classPrefix + '__icon', size:'44rpx', name: LINE_STATUS_ICON[status]"></template> -->
        <block
          v-if="_.includes(STATUS, status)"
          name="icon"
        >
          <t-icon
            :t-class="classPrefix + '__icon ' + classPrefix + '__icon--'"
            :name="LINE_STATUS_ICON[status]"
            :size="22 || ''"
          />
        </block>
        <text v-else>
          {{ _.isString(label) ? label : computedProgress + '%' }}
        </text>
      </view>
      <slot name="label" />
    </view>
    <view
      v-if="theme === PRO_THEME.PLUMP"
      aria-role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="computedProgress"
      :aria-label="ariaLabel || (isIOS ? getIOSAriaLabel(status) : getAndroidAriaLabel(status))"
      aria-live="polite"
      :class="
        classPrefix +
          '__bar ' +
          classPrefix +
          '--plump ' +
          (computedProgress > 10 ? classPrefix + '--over-ten' : classPrefix + '--under-ten') +
          ' ' +
          classPrefix +
          '--status--' +
          (status || computedStatus) +
          ' ' +
          prefix +
          '-class'
      "
      :style="'height: ' + heightBar + 'px;border-radius: ' + heightBar + 'px;background-color: ' + bgColorBar"
    >
      <view
        :class="classPrefix + '__inner ' + prefix + '-class-bar'"
        :style="'background: ' + colorBar + '; width: ' + computedProgress + '%'"
      >
        <view
          v-if="label && computedProgress > 10"
          :class="classPrefix + '__info ' + prefix + '-class-label'"
        >
          <text>{{ _.isString(label) ? label : computedProgress + '%' }}</text>
        </view>
        <slot
          v-if="computedProgress > 10"
          name="label"
        />
      </view>
      <view
        v-if="label && computedProgress <= 10"
        :class="classPrefix + '__info ' + prefix + '-class-label'"
        :aria-hidden="true"
      >
        <text>{{ _.isString(label) ? label : computedProgress + '%' }}</text>
      </view>
      <slot
        v-if="computedProgress <= 10"
        name="label"
      />
    </view>
    <view
      v-if="theme === PRO_THEME.CIRCLE"
      :class="classPrefix + '--status--' + (status || computedStatus) + ' ' + prefix + '-class'"
    >
      <view
        aria-role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="computedProgress"
        :aria-label="ariaLabel || (isIOS ? getIOSAriaLabel(status) : getAndroidAriaLabel(status))"
        aria-live="polite"
        :class="_.cls(classPrefix + '__canvas--circle', [[size, true]])"
        :style="
          getCircleStyle(size, heightBar) +
            '; background-image: conic-gradient(from var(--td-progress-circle-from), ' +
            (colorCircle || STATUS_COLOR[status] || 'var(--td-progress-inner-bg-color)') +
            ' ' +
            computedProgress +
            '%, ' +
            (bgColorBar || 'var(--td-progress-track-bg-color)') +
            ' 0%);'
        "
      >
        <view :class="classPrefix + '__canvas--inner ' + prefix + '-class-bar'">
          <view
            v-if="label"
            :class="classPrefix + '__info ' + prefix + '-class-label'"
            :aria-hidden="true"
          >
            <!-- parse <template v-if="_.includes(STATUS, status)" is="icon" :data="tClass: classPrefix + '__icon', size:'96rpx', name: CIRCLE_STATUS_ICON[status]"></template> -->
            <block
              v-if="_.includes(STATUS, status)"
              name="icon"
            >
              <t-icon
                :t-class="classPrefix + '__icon ' + classPrefix + '__icon--'"
                :name="CIRCLE_STATUS_ICON[status]"
                size="96rpx"
              />
            </block>
            <text v-else>
              {{ _.isString(label) ? label : computedProgress + '%' }}
            </text>
          </view>
          <slot name="label" />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import { uniComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { getBackgroundColor } from './utils';
import { unitConvert, isIOS as isIOSValidator } from '../common/utils';
import _ from '../common/utils.wxs';

import {
  STATUS,
  STATUS_TEXT,
  PRO_THEME,

  STATUS_COLOR,
  LINE_STATUS_ICON,
  CIRCLE_STATUS_ICON,

  getCircleStyle,
  getIOSAriaLabel,
  getAndroidAriaLabel,
} from './progress.wxs';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-progress`;

export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-bar`,
    `${prefix}-class-label`,
  ],
  components: {
    tIcon,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      colorBar: '',
      heightBar: '',
      computedStatus: '',
      computedProgress: 0,
      isIOS: isIOSValidator(),
      STATUS,
      STATUS_TEXT,
      PRO_THEME,

      STATUS_COLOR,
      LINE_STATUS_ICON,
      CIRCLE_STATUS_ICON,

      getCircleStyle,
      getIOSAriaLabel,
      getAndroidAriaLabel,
      _,
    };
  },
  watch: {
    percentage: {
      handler(percentage) {
        percentage = Math.max(0, Math.min(percentage, 100));

        this.computedStatus = percentage === 100 ? 'success' : '';
        this.computedProgress = percentage;
      },
      immediate: true,
    },

    color: {
      handler(color) {
        this.colorBar = getBackgroundColor(color);
        this.colorCircle = typeof color === 'object' ? '' : color; // 环形不支持渐变，单独处理
      },
      immediate: true,
    },

    strokeWidth: {
      handler(strokeWidth) {
        if (!strokeWidth) {
          return '';
        }
        this.heightBar = unitConvert(strokeWidth);
      },
      immediate: true,
    },

    trackColor: {
      handler(trackColor) {
        this.bgColorBar = trackColor;
      },
      immediate: true,
    },
  },
  methods: {

  },
});


// let Progress = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-bar`, `${prefix}-class-label`];
//     this.options = {
//       multipleSlots: true,
//     };
//     this.properties = props;
//     this._ = _;
//     this.components = {
//       tIcon,
//     };
//     this.setData({
//       prefix,
//       classPrefix: name,
//       colorBar: '',
//       heightBar: '',
//       computedStatus: '',
//       computedProgress: 0,
//       isIOS: false,
//       STATUS,
//       STATUS_TEXT,
//       PRO_THEME,

//       STATUS_COLOR,
//       LINE_STATUS_ICON,
//       CIRCLE_STATUS_ICON,

//       getCircleStyle,
//       getIOSAriaLabel,
//       getAndroidAriaLabel,
//     });
//     this.observers = {
//       percentage(o) {
//         o = Math.max(0, Math.min(o, 100));
//         this.setData({
//           computedStatus: 100 === o ? 'success' : '',
//           computedProgress: o,
//         });
//       },
//       color(o) {
//         this.setData({
//           colorBar: getBackgroundColor(o),
//           colorCircle: 'object' === typeof o ? '' : o,
//         });
//       },
//       strokeWidth(o) {
//         if (!o) {
//           return '';
//         }
//         this.setData({
//           heightBar: unitConvert(o),
//         });
//       },
//       trackColor(o) {
//         this.setData({
//           bgColorBar: o,
//         });
//       },
//     };
//   }
//   attached() {
//     const o = isIOSValidator();
//     this.setData({
//       isIOS: o,
//     });
//   }
// };
// Progress = initTDesign(__decorate([wxComponent()], Progress));
// export default Progress;
</script>
<style>
@import './progress.css';

</style>
