<template>
  <view>
    <view class="demo-desc">
      垂直带序号步骤条
    </view>

    <view class="block">
      <t-steps
        layout="vertical"
        :current="first"
        @change="onFirstChange"
      >
        <t-step-item
          v-for="(item, index) in 4"
          :key="index"
          :title="_.getText(first, index)"
          content="可自定义此处内容"
        />
      </t-steps>
    </view>

    <view class="demo-desc">
      垂直带图标步骤条
    </view>

    <view class="block">
      <t-steps
        layout="vertical"
        :current="second"
        @change="onSecondChange"
      >
        <t-step-item
          v-for="(item, index) in 4"
          :key="index"
          :title="_.getText(second, index)"
          content="可自定义此处内容"
          icon="cart"
        />
      </t-steps>
    </view>

    <view class="demo-desc">
      垂直简略步骤条
    </view>

    <view class="block">
      <t-steps
        layout="vertical"
        theme="dot"
        :current="third"
        @change="onThirdChange"
      >
        <t-step-item
          v-for="(item, index) in 4"
          :key="index"
          :title="_.getText(third, index)"
          content="可自定义此处内容"
        />
      </t-steps>
    </view>

    <view class="demo-desc">
      垂直带自定义内容步骤条
    </view>

    <view class="block">
      <t-steps
        layout="vertical"
        :current="third"
        @change="onThirdChange"
      >
        <t-step-item
          v-for="(item, index) in 3"
          :key="index"
          :title="_.getText(third, index)"
          content="可自定义此处内容"
        >
          <view
            v-if="index == 1"
            slot="extra"
          >
            <image
              src="https://tdesign.gtimg.com/mobile/demos/steps1.png"
              alt="图标"
              style="width: 100%"
              mode="widthFix"
            />
          </view>
        </t-step-item>
      </t-steps>
    </view>
  </view>
</template>

<script>
import tSteps from 'tdesign-uniapp/steps/steps';
import tStepItem from 'tdesign-uniapp/step-item/step-item';
export default {
  components: {
    tSteps,
    tStepItem,
  },
  data() {
    return {
      first: 1,
      second: 1,
      third: 1,
    };
  },
  created() {},
  methods: {
    getText(value, curr) {
      if (value > curr) return '已完成步骤';
      if (value == curr) return '当前步骤';
      return '未完成步骤';
    },
    onFirstChange(e) {
      this.setData({
        first: e.detail.current,
      });
    },
    onSecondChange(e) {
      this.setData({
        second: e.detail.current,
      });
    },
    onThirdChange(e) {
      this.setData({
        third: e.detail.current,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
