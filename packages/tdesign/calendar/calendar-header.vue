<template>
  <view>
    <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
    <block
      v-if="false"
      name="calendar-header"
    >
      <view
        :id="'year_' + item.year + '_month_' + item.month"
        :class="(class)+' '+(classPrefix)+' '+(switchMode !== 'none' ? classPrefix + '__with-action' : '')"
      >
        <view
          v-if="switchMode !== 'none'"
          :class="classPrefix + '-header' + '-header' + '__action'"
        >
          <view
            v-if="switchMode === 'year-month'"
            :class="_.cls(classPrefix + '-header' + '-header' + '__icon', [['disabled', preYearBtnDisable]])"
            :data-disabled="preYearBtnDisable"
            data-type="pre-year"
            @tap="handleSwitchModeChange"
          >
            <t-icon name="chevron-left-double" />
          </view>
          <view
            :class="_.cls(classPrefix + '-header' + '-header' + '__icon', [['disabled', prevMonthBtnDisable]])"
            :data-disabled="prevMonthBtnDisable"
            data-type="pre-month"
            @tap="handleSwitchModeChange"
          >
            <t-icon name="chevron-left" />
          </view>
        </view>
        <view :class="classPrefix + '-header' + '-header' + '__title'">
          {{ _this.getMonthTitle(currentMonth[0].year, realLocalText.months[currentMonth[0].month], realLocalText.monthTitle) }}
        </view>
        <view
          v-if="switchMode !== 'none'"
          :class="classPrefix + '-header' + '-header' + '__action'"
        >
          <view
            :class="_.cls(classPrefix + '-header' + '-header' + '__icon', [['disabled', nextMonthBtnDisable]])"
            :data-disabled="nextMonthBtnDisable"
            data-type="next-month"
            @tap="handleSwitchModeChange"
          >
            <t-icon name="chevron-right" />
          </view>
          <view
            v-if="switchMode === 'year-month'"
            :class="_.cls(classPrefix + '-header' + '-header' + '__icon', [['disabled', nextYearBtnDisable]])"
            :data-disabled="nextYearBtnDisable"
            data-type="next-year"
            @tap="handleSwitchModeChange"
          >
            <t-icon name="chevron-right-double" />
          </view>
        </view>
      </view>
    </block>
  </view>
</template>
<!-- template. ignore -->
<!-- <script module="_" lang="wxs" src="@/common/utils.wxs"></script> -->

<style scoped>
@import './calendar-header.css';
</style>
