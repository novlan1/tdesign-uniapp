<template>
  <view>
    <t-popup
      class="class"
      :visible="dataVisible"
      placement="bottom"
      @visible-change="onVisibleChange"
    >
      <view
        :style="_._style([style, customStyle])"
        :class="name"
      >
        <view :class="name + '__title'">
          <slot name="title" />
          {{ title }}
        </view>
        <view
          :class="name + '__close-btn'"
          @tap="onClose"
        >
          <slot name="close-btn" />
          <t-icon
            v-if="closeBtn"
            size="48rpx"
            name="close"
          />
        </view>
        <slot name="header" />
        <view :class="name + '__content'">
          <block v-if="steps && steps.length">
            <view
              v-if="theme == 'step'"
              :class="name + '__steps'"
            >
              <view
                v-for="(item, index) in steps"
                :key="index"
                :class="name + '__step'"
                :data-index="index"
                @tap="() => onStepClick(index)"
              >
                <view
                  :class="
                    name +
                      '__step-dot ' +
                      name +
                      '__step-dot--' +
                      (item !== placeholder ? 'active' : '') +
                      ' ' +
                      name +
                      '__step-dot--' +
                      (index === steps.length - 1 ? 'last' : '')
                  "
                />

                <view :class="name + '__step-label ' + name + '__step-label--' + (index === stepIndex ? 'active' : '')">
                  {{ item }}
                </view>

                <t-icon
                  name="chevron-right"
                  size="44rpx"
                  :t-class="name + '__step-arrow'"
                />
              </view>
            </view>
            <block v-if="theme == 'tab'">
              <t-tabs
                id="tabs"
                ref="tabs"
                :value="stepIndex"
                :space-evenly="false"
                @change="({value}) => onTabChange(value)"
              >
                <t-tab-panel
                  v-for="(item, index) in steps"
                  :key="index"
                  :value="index"
                  :label="item"
                />
              </t-tabs>
            </block>
          </block>
          <view
            v-if="subTitles && subTitles[stepIndex]"
            :class="name + '__options-title'"
          >
            {{ subTitles[stepIndex] }}
          </view>
          <view
            :class="name + '__options-container'"
            :style="'width: ' + (items.length + 1) + '00vw; transform: translateX(-' + stepIndex + '00vw)'"
          >
            <scroll-view
              v-for="(options, index) in items"
              :key="index"
              :class="name + '__options'"
              scroll-y
              :scroll-top="scrollTopList[index]"
              type="list"
              :style="'height: ' + _optionsHeight + 'px'"
            >
              <view :class="'cascader-radio-group-' + index">
                <t-radio-group
                  :value="selectedValue[index]"
                  :keys="keys"
                  :options="options"
                  :data-level="index"
                  placement="right"
                  icon="line"
                  borderless
                  @change="({ value }) => handleSelect($event, { level: index, value })"
                />
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </t-popup>
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import tPopup from '../popup/popup';
import tTabs from '../tabs/tabs';
import tTabPanel from '../tab-panel/tab-panel';
import tRadioGroup from '../radio-group/radio-group';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { getRect } from '../common/utils';

import _ from '../common/utils.wxs';


const name = `${prefix}-cascader`;

function parseOptions(options, keys) {
  const label = keys?.label ?? 'label';
  const value = keys?.value ?? 'value';

  return options.map(item => ({
    [label]: item[label],
    [value]: item[value],
  }));
}

const defaultState = {
  contentHeight: 0,
  stepHeight: 0,
  tabsHeight: 0,
  subTitlesHeight: 0,
  stepsInitHeight: 0,
};

export default uniComponent({
  name,
  controlledProps: [
    {
      key: 'value',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
  ],
  components: {
    tIcon,
    tPopup,
    tTabs,
    tTabPanel,
    tRadioGroup,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      name,
      stepIndex: 0,
      selectedIndexes: [],
      selectedValue: [],
      scrollTopList: [],
      steps: [],
      _optionsHeight: 0,
      _,

      dataVisible: this.visible,
      dataValue: this.value ?? this.defaultValue,
      items: [],
    };
  },
  watch: {
    visible: {
      handler(v) {
        this.dataVisible = v;
      },
      immediate: true,
    },
    dataVisible: {
      handler(v) {
        if (v) {
          const $tabs = this.$refs.tabs;
          $tabs?.setTrack();
          $tabs?.getTabHeight().then((res) => {
            this.state.tabsHeight = res.height;
          });
          this.$nextTick(() => {
            this.initOptionsHeight(this.steps.length);
            this.updateScrollTop();
            this.initWithValue();
          });
        } else {
          this.state = { ...defaultState };
        }
      },
      immediate: true,
    },

    value: {
      handler(v) {
        this.dataValue = v;
      },
      immediate: true,
    },

    dataValue: {
      handler() {
        this.initWithValue();
      },
      immediate: true,
    },

    options: {
      handler() {
        const { selectedValue, steps, items } = this.genItems();

        this.steps = steps;
        this.items = items;
        this.selectedValue = selectedValue;
        this.stepIndex = items.length - 1;
      },
      immediate: true,
      deep: true,
    },
    selectedIndexes: {
      handler() {
        const { visible, theme } = this;
        const { selectedValue, steps, items } = this.genItems();

        this.steps = steps;
        this.selectedValue = selectedValue;
        this.stepIndex = items.length - 1;

        if (JSON.stringify(items) !== JSON.stringify(this.items)) {
          this.items = items;
        }


        if (visible && theme === 'step') {
          this.updateOptionsHeight(steps.length);
        }
      },
      immediate: true,
      deep: true,
    },

    stepIndex: {
      handler() {
        const { dataVisible: visible } = this;

        if (visible) {
          this.updateScrollTop();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.state = {
      ...defaultState,
    };
  },
  mounted() {

  },
  methods: {
    updateOptionsHeight(steps) {
      const { contentHeight, stepsInitHeight, stepHeight, subTitlesHeight } = this.state;
      this._optionsHeight = contentHeight - stepsInitHeight - subTitlesHeight - (steps - 1) * stepHeight;
    },

    async initOptionsHeight(steps) {
      const { theme, subTitles } = this;

      const { height } = await getRect(this, `.${name}__content`);
      this.state.contentHeight = height;

      if (theme === 'step') {
        await Promise.all([
          getRect(this, `.${name}__steps`),
          getRect(this, `.${name}__step`),
        ])
          .then(([stepsRect, stepRect]) => {
            this.state.stepsInitHeight = stepsRect.height - (steps - 1) * stepRect.height;
            this.state.stepHeight = stepRect.height;
          })
          .catch(() => {
          });
      }

      if (subTitles.length > 0) {
        const { height } = await getRect(this, `.${name}__options-title`);
        this.state.subTitlesHeight = height;
      }

      const optionsInitHeight = this.state.contentHeight - this.state.subTitlesHeight;
      this._optionsHeight = theme === 'step'
        ? optionsInitHeight - this.state.stepsInitHeight - (steps - 1) * this.state.stepHeight
        : optionsInitHeight - this.state.tabsHeight;
    },

    initWithValue() {
      if (this.dataValue != null && this.dataValue !== '') {
        const selectedIndexes = this.getIndexesByValue(this.options, this.dataValue);

        if (selectedIndexes) {
          this.selectedIndexes = selectedIndexes;
        }
      } else {
        this.selectedIndexes = [];
      }
    },
    getIndexesByValue(options, value) {
      const { keys } = this;

      for (let i = 0, size = options.length; i < size; i += 1) {
        const opt = options[i];
        if (opt[keys?.value ?? 'value'] === value) {
          return [i];
        }
        if (opt[keys?.children ?? 'children']) {
          const res = this.getIndexesByValue(opt[keys?.children ?? 'children'], value);
          if (res) {
            return [i, ...res];
          }
        }
      }
    },
    updateScrollTop() {
      const { dataVisible: visible, items, selectedIndexes, stepIndex } = this;

      if (visible) {
        getRect(this, '.cascader-radio-group-0').then((rect) => {
          const eachRadioHeight = rect.height / items[0]?.length;

          this[`scrollTopList[${stepIndex}]`] = eachRadioHeight * selectedIndexes[stepIndex];
        })
          .catch(() => {
          });
      }
    },
    hide(trigger) {
      this.dataVisible = false;
      this.$emit('close', { trigger });
    },
    onVisibleChange() {
      this.hide('overlay');
    },
    onClose() {
      if (this.checkStrictly) {
        this.triggerChange();
      }
      this.hide('close-btn');
    },
    onStepClick(index) {
      this.stepIndex = index;
    },
    onTabChange(value) {
      this.stepIndex = value;
    },
    genItems() {
      const { options, selectedIndexes, keys, placeholder } = this;
      const selectedValue = [];
      const steps = [];
      const items = [parseOptions(options, keys)];

      if (options.length > 0) {
        let current = options;
        for (let i = 0, size = selectedIndexes.length; i < size; i += 1) {
          const index = selectedIndexes[i];
          const next = current[index];
          current = next[keys?.children ?? 'children'];

          selectedValue.push(next[keys?.value ?? 'value']);
          steps.push(next[keys?.label ?? 'label']);

          if (next[keys?.children ?? 'children']) {
            items.push(parseOptions(next[keys?.children ?? 'children'], keys));
          }
        }
      }

      if (steps.length < items.length) {
        steps.push(placeholder);
      }

      return {
        selectedValue,
        steps,
        items,
      };
    },
    handleSelect(_, { level, value }) {
      const { checkStrictly } = this;
      const { selectedIndexes, items, keys, options, selectedValue } = this;

      const index = items[level].findIndex(item => item[keys?.value ?? 'value'] === value);

      let item = selectedIndexes.slice(0, level).reduce((acc, item, index) => {
        if (index === 0) {
          return acc[item];
        }
        return acc[keys?.children ?? 'children'][item];
      }, options);


      if (level === 0) {
        item = item[index];
      } else {
        item = item[keys?.children ?? 'children'][index];
      }

      if (item.disabled) {
        return;
      }
      this.$emit('pick', {
        value: item[keys?.value ?? 'value'],
        label: item[keys?.label ?? 'label'],
        index,
        level,
      });
      selectedIndexes[level] = index;
      if (checkStrictly && selectedValue.includes(String(value))) {
        selectedIndexes.length = level;
        this.selectedIndexes = selectedIndexes;
        return;
      }
      selectedIndexes.length = level + 1;

      const { items: newItems } = this.genItems();
      if (item?.[keys?.children ?? 'children']?.length >= 0) {
        this.selectedIndexes = selectedIndexes;
        this[`items[${level + 1}]`] = newItems[level + 1];
      } else {
        // setCascaderValue(item.value);
        this.selectedIndexes = selectedIndexes;
        setTimeout(this.triggerChange);

        this.hide('finish');
      }
    },
    triggerChange() {
      const { items, selectedValue, selectedIndexes } = this;
      this._trigger('change', {
        value: selectedValue[selectedValue.length - 1] ?? '',
        selectedOptions: items.map((item, index) => item[selectedIndexes[index]]).filter(Boolean),
      });
    },
  },
});
</script>
<style scoped lang="less">
@import './cascader.less';
</style>
