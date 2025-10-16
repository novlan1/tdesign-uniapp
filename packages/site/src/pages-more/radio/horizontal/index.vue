<template>
  <view>
    <t-radio-group
      default-value="0"
      borderless
      t-class="box"
    >
      <t-radio
        :block="false"
        label="单选标题"
        value="0"
      />
      <t-radio
        :block="false"
        label="单选标题"
        value="1"
      />
      <t-radio
        :block="false"
        label="上限四字"
        value="2"
      />
    </t-radio-group>
  </view>
</template>

<script>
import tRadioGroup from 'tdesign-uniapp/radio-group/radio-group.vue';
import tRadio from 'tdesign-uniapp/radio/radio.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tRadioGroup,
    tRadio,
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    handleChange(e) {
      console.log('handleChange', e);
      this.checked = e.checked;
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
