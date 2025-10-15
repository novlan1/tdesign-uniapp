<template>
  <view>
    <t-checkbox-group
      :value="value"
      @change="onChange"
    >
      <view
        v-for="(item, index) in 3"
        :key="index"
        :class="'card ' + (contain(value, index) ? 'card--active' : '')"
      >
        <t-icon
          v-if="contain(value, index)"
          name="check"
          t-class="card__icon"
          :aria-hidden="true"
        />

        <t-checkbox
          :value="index"
          label="多选"
          content="描述信息描述信息描述信息描述信息描述信息"
          icon="none"
          borderless
        />
      </view>
    </t-checkbox-group>

    <view
      class="demo-desc"
      style="margin: 48rpx 32rpx 32rpx"
    >
      横向卡片多选框
    </view>

    <t-checkbox-group
      t-class="horizontal-box"
      :value="value1"
      @change="onChange1"
    >
      <view
        v-for="(item, index) in 3"
        :key="index"
        :class="'card ' + (contain(value1, index) ? 'card--active' : '')"
      >
        <t-icon
          v-if="contain(value1, index)"
          name="check"
          t-class="card__icon"
          :aria-hidden="true"
        />

        <t-checkbox
          :value="index"
          label="多选"
          icon="none"
          borderless
        />
      </view>
    </t-checkbox-group>
  </view>
</template>
<script>
import tCheckboxGroup from 'tdesign-uniapp/checkbox-group/checkbox-group.vue';
import tCheckbox from 'tdesign-uniapp/checkbox/checkbox.vue';
import tIcon from 'tdesign-uniapp/icon/icon.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tCheckboxGroup,
    tCheckbox,
    tIcon,
  },
  data() {
    return {
      value: [0, 1],
      value1: [0, 1],
    };
  },
  created() {},
  methods: {
    contain(arr, key) {
      return arr.indexOf(key) > -1;
    },
    onChange(e) {
      this.value = e.value;
    },
    onChange1(e) {
      this.value1 = e.value;
    },
  },
};
</script>
<style>
.card {
    position: relative;
    margin: 32rpx;
    border-radius: 12rpx;
    overflow: hidden;
    box-sizing: border-box;
    border: 3rpx solid var(--td-bg-color-container, #fff);
}

.card--active {
    border-color: var(--td-brand-color, #0052d9);
}

.card--active::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border-width: 28px 28px 28px 0;
    border-style: solid;
    border-color: #0052d9 transparent transparent transparent;
    border: 14px solid var(--td-brand-color, #0052d9);
    border-bottom-color: transparent;
    border-right-color: transparent;
}

.card__icon {
    color: var(--td-bg-color-container, #fff);
    position: absolute;
    left: 1.5px;
    top: 1.5px;
    z-index: 1;
}

/* 横向布局 */
.horizontal-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 32rpx;
}

.horizontal-box .card {
    flex: 0 0 calc(33.33% - 12rpx);
    margin: 0 0 24rpx 0;
}

.horizontal-box .card::after {
    border-width: 48rpx 48rpx 48rpx 0;
}

.horizontal-box .card__icon {
    font-size: 24rpx;
}
</style>
