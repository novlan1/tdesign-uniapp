<template>
  <view>
    <t-checkbox-group
      t-class="box"
      borderless
      :value="current"
      @change="onChange"
    >
      <t-checkbox
        :block="false"
        value="checkbox1"
        label="多选标题"
      />
      <t-checkbox
        :block="false"
        value="checkbox2"
        label="多选标题"
      />
      <t-checkbox
        :block="false"
        value="checkbox3"
        label="上限四字"
      />
    </t-checkbox-group>
  </view>
</template>

<script>
import tCheckboxGroup from 'tdesign-uniapp/checkbox-group/checkbox-group.vue';
import tCheckbox from 'tdesign-uniapp/checkbox/checkbox.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tCheckboxGroup,
    tCheckbox,
  },
  data() {
    return {
      current: ['checkbox1', 'checkbox2'],
    };
  },
  created() {},
  /**
     * 组件的方法列表
     */
  methods: {
    onChange(event) {
      console.log('checkbox', event.value);
      this.current =  event.value;
    },
  },
};
</script>
<style>
.box {
    padding: 32rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: var(--td-bg-color-container, #fff);
}
</style>
